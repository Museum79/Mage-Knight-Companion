//src/components/effects/Embers.jsx
import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function Embers() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      className="absolute inset-0 pointer-events-none z-10"
      options={{
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },

          color: { value: ['#cc1100', '#ee2200', '#ff4400', '#ff6600', '#ff8800'] },

          shape: { type: 'square' },

          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 10, sync: false },
          },

          opacity: {
            value: { min: 0.2, max: 0.9 },
            animation: { enable: true, speed: 2, sync: false },
          },

          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 2, sync: false },
          },

          move: {
            enable: true,
            speed: { min: 2, max: 6 },
            direction: 'top',
            random: true,
            straight: false,
            outModes: { default: 'out' },
            vibrate: true,
            warp: false,
            angle: {
              value: 40,
              offset: 30,
            },
          },

          life: {
            duration: { sync: false, value: { min: 1, max: 4 } },
            count: 0,
          },
        },

        interactivity: {
          events: { onHover: { enable: false }, onClick: { enable: false } },
        },

        emitters: {
          position: { x: 50, y: 90 },
          size: { width: 60, height: 5 },
          rate: { quantity: 3, delay: 0.1 },
        },

        detectRetina: true,
      }}
    />
  )
}