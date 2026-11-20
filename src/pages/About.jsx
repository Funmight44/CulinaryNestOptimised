import { useGsapReveal } from '../hooks/useGsapReveal.js'

function About() {
  const pageRef = useGsapReveal('.about-image, .about-copy > *', { stagger: 0.08 })
  return (
    <section className="about-page" ref={pageRef}>
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1800&q=85"
          alt="Fresh ingredients ready for cooking"
        />
        <div className="about-image-caption">Made with care.<br />Shared with love.</div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">A TABLE FOR EVERYONE</p>
        <h1>Good food makes<br /><em>room for everyone.</em></h1>
        <p>
          CulinaryNest is here for the everyday cooks, the curious tasters, and everyone
          who believes a meal can turn an ordinary day into something worth remembering.
        </p>
        <p>
          We bring recipes together so finding your next favorite feels easy. Browse,
          cook, save the ones you love, and make them your own.
        </p>
        <div className="about-values">
          <span>Curiosity in every bite</span>
          <span>Simple, thoughtful cooking</span>
          <span>More reasons to gather</span>
        </div>
      </div>
    </section>
  )
}

export default About
