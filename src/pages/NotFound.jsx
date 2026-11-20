import { Link } from 'react-router-dom'
import { useGsapReveal } from '../hooks/useGsapReveal.js'

function NotFound() {
  const pageRef = useGsapReveal('.not-found > *', { stagger: 0.08 })
  return (
    <section className="not-found" ref={pageRef}>
      <span>404</span>
      <h1>This page wandered off.</h1>
      <p>Let’s get you back to something delicious.</p>
      <Link className="button" to="/">Back to home ↗</Link>
    </section>
  )
}

export default NotFound
