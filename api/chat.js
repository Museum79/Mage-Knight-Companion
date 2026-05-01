import { FULL_RULES_TEXT } from '../src/data/rules.js'

const SYSTEM_PROMPT = `Tu es un expert des règles du jeu de société Mage Knight Board Game.
Tu réponds uniquement en te basant sur les règles fournies ci-dessous.
Si la réponse n'est pas dans les règles, dis-le clairement plutôt que d'inventer.
Réponds de manière concise et précise. Utilise des exemples si c'est utile.
Tu réponds dans la langue de la question posée.

RÈGLES DU JEU :
${FULL_RULES_TEXT}`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question } = req.body

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Question manquante ou invalide' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API non configurée' })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: question.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!answer) {
      throw new Error('Réponse vide de Gemini')
    }

    return res.status(200).json({ answer })
  } catch (err) {
    console.error('Chat API error:', err)
    return res.status(500).json({ error: err.message || 'Erreur interne du serveur' })
  }
}
