import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { FULL_RULES_TEXT } from './src/data/rules.js'

const SYSTEM_PROMPT = `Tu es un expert des règles du jeu de société Mage Knight Board Game.
Tu réponds uniquement en te basant sur les règles fournies ci-dessous.
Si la réponse n'est pas dans les règles, dis-le clairement plutôt que d'inventer.
Réponds de manière concise et précise. Utilise des exemples si c'est utile.
Tu réponds dans la langue de la question posée.

RÈGLES DU JEU :
${FULL_RULES_TEXT}`

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'Mage Knight Companion',
          short_name: 'MK Companion',
          description: 'Assistant de règles et outil de combat pour Mage Knight Board Game',
          theme_color: '#0c0a07',
          background_color: '#0c0a07',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\//,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'gemini-api',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 3600,
                },
              },
            },
          ],
        },
      }),
      {
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { question } = JSON.parse(body)

                if (!question || typeof question !== 'string' || !question.trim()) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Question manquante ou invalide' }))
                  return
                }

                const apiKey = env.GEMINI_API_KEY
                if (!apiKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'GEMINI_API_KEY manquante dans .env' }))
                  return
                }

                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                      contents: [{ role: 'user', parts: [{ text: question.trim() }] }],
                      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
                    }),
                  }
                )

                if (!geminiRes.ok) {
                  const errData = await geminiRes.json().catch(() => ({}))
                  throw new Error(errData.error?.message || `Gemini API error: ${geminiRes.status}`)
                }

                const data = await geminiRes.json()
                const answer = data.candidates?.[0]?.content?.parts?.[0]?.text

                if (!answer) throw new Error('Réponse vide de Gemini')

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ answer }))
              } catch (err) {
                console.error('[api/chat]', err.message)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message || 'Erreur interne' }))
              }
            })
          })
        },
      },
    ],
  }
})
