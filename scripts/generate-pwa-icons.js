import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const srcImage = 'src/assets/titleMKC.png'
const publicDir = 'public'

// Créer le dossier public s'il n'existe pas
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const icons = [
  { size: 192, name: 'pwa-192x192.png', maskable: false },
  { size: 512, name: 'pwa-512x512.png', maskable: false },
  { size: 192, name: 'pwa-maskable-192x192.png', maskable: true },
  { size: 512, name: 'pwa-maskable-512x512.png', maskable: true },
]

async function generateIcons() {
  try {
    console.log('Generating PWA icons...')

    for (const icon of icons) {
      const outputPath = path.join(publicDir, icon.name)

      if (icon.maskable) {
        // Pour les icônes maskable, créer une version avec padding
        const maskSize = Math.round(icon.size * 0.8)
        await sharp(srcImage)
          .resize(maskSize, maskSize, {
            fit: 'contain',
            background: { r: 12, g: 10, b: 7, alpha: 0 },
          })
          .extend({
            top: Math.round((icon.size - maskSize) / 2),
            bottom: Math.round((icon.size - maskSize) / 2),
            left: Math.round((icon.size - maskSize) / 2),
            right: Math.round((icon.size - maskSize) / 2),
            background: { r: 12, g: 10, b: 7, alpha: 0 },
          })
          .png()
          .toFile(outputPath)
      } else {
        // Pour les icônes normales
        await sharp(srcImage)
          .resize(icon.size, icon.size, {
            fit: 'contain',
            background: { r: 12, g: 10, b: 7, alpha: 1 },
          })
          .png()
          .toFile(outputPath)
      }

      console.log(`✓ Generated ${icon.name}`)
    }

    console.log('PWA icons generated successfully!')
  } catch (err) {
    console.error('Error generating PWA icons:', err)
    process.exit(1)
  }
}

generateIcons()
