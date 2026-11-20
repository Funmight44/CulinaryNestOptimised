import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup.js'
import { motion, revealFrom } from '../animations/animationConfig.js'

export function useGsapReveal(selector, { stagger = 0, start = 'top 88%' } = {}) {
  const scope = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const targets = gsap.utils.toArray(selector, scope.current)
    if (!targets.length) return

    gsap.from(targets, {
      ...revealFrom,
      duration: motion.duration,
      ease: motion.ease,
      stagger,
      scrollTrigger: { trigger: targets[0].parentElement, start, once: true },
      clearProps: 'opacity,visibility,transform',
    })
  }, { scope })

  return scope
}
