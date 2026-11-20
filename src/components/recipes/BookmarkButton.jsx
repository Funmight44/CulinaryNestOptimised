import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../animations/gsapSetup.js'

function BookmarkButton({ saved, onClick }) {
  const buttonRef = useRef(null)
  function handleClick() {
    if (saved && buttonRef.current.closest('.recipe-card') && !prefersReducedMotion()) {
      gsap.to(buttonRef.current.closest('.recipe-card'), {
        autoAlpha: 0,
        y: -8,
        duration: 0.22,
        ease: 'power1.in',
        onComplete: onClick,
      })
      return
    }

    if (!prefersReducedMotion()) gsap.fromTo(buttonRef.current, { scale: 0.84 }, { scale: 1, duration: 0.28, ease: 'back.out(2)' })
    onClick()
  }

  return (
    <button
      ref={buttonRef}
      className={`bookmark-button ${saved ? 'saved' : ''}`}
      onClick={handleClick}
      aria-label={saved ? 'Remove bookmark' : 'Save recipe'}
      type="button"
    >
      {saved ? '♥' : '♡'}
    </button>
  )
}

export default BookmarkButton
