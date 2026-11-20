const BENEFITS = [
  ['01', 'Discover new meals', 'Find fresh ideas for every kind of day.'],
  ['02', 'Cook with confidence', 'Clear recipes that make sense in your kitchen.'],
  ['03', 'Keep what you love', 'Save favorites and come back whenever.'],
]

function WhyChooseUs() {
  const sectionRef = useGsapReveal('.why-image, .why-copy > *, .benefit', { stagger: 0.08 })
  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-image">
        <img
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
          alt="A bright, welcoming home kitchen"
          width="1000"
          height="750"
          loading="lazy"
          decoding="async"
        />
        <span className="image-note">A kitchen is<br />always a good place<br />to begin.</span>
      </div>
      <div className="why-copy">
        <p className="eyebrow">A GOOD THING, MADE SIMPLE</p>
        <h2>Everyday cooking,<br /><em>made a little more lovely.</em></h2>
        <p className="why-lead">
          The best meals aren’t complicated. They’re the ones that bring us together,
          made with ingredients we love and a little room to make them our own.
        </p>
        <div className="benefits">
          {BENEFITS.map(([number, title, text]) => (
            <div className="benefit" key={number}>
              <span>{number}</span>
              <div>
                <b>{title}</b>
                <small>{text}</small>
              </div>
              <i>↗</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
import { useGsapReveal } from '../../hooks/useGsapReveal.js'
