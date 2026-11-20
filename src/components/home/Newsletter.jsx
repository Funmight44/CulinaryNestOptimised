import { useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal.js'

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)
  const sectionRef = useGsapReveal('.newsletter-mark, .newsletter > *', { stagger: 0.06 })

  return (
    <section className="newsletter" ref={sectionRef}>
      <div className="newsletter-mark">✳</div>
      <p className="eyebrow">A NOTE FROM OUR KITCHEN</p>
      <h2>A little something <em>good.</em></h2>
      <p>Seasonal recipes, kitchen notes, and fresh inspiration. No noise, just the good stuff.</p>
      <form
        className="newsletter-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSubscribed(true)
        }}
      >
        <input
          type="email"
          required
          aria-label="Your email address"
          placeholder="Your email address"
        />
        <button type="submit">
          {subscribed ? 'You’re on the list ✓' : 'Count me in ↗'}
        </button>
      </form>
    </section>
  )
}

export default Newsletter
