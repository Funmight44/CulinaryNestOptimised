import { useNavigate } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading.jsx'
import { useGsapReveal } from '../../hooks/useGsapReveal.js'

const CATEGORIES = [
  { name: 'Breakfast', query: 'oatmeal', icon: '☀' },
  { name: 'Lunch', query: 'salad', icon: '🥗' },
  { name: 'Dinner', query: 'pasta', icon: '🍝' },
  { name: 'Desserts', query: 'dessert', icon: '🍮' },
  { name: 'Cakes', query: 'cake', icon: '🍰' },
  { name: 'Healthy meals', query: 'vegetarian', icon: '🥑' },
]

function CategorySection() {
  const navigate = useNavigate()
  const sectionRef = useGsapReveal('.category-card', { stagger: 0.07 })

  return (
    <section className="category-section" ref={sectionRef}>
      <SectionHeading
        eyebrow="FOLLOW YOUR CRAVING"
        title={<>What sounds <em>good?</em></>}
        description="Pick a mood. We’ll find something lovely."
      />
      <div className="category-grid">
        {CATEGORIES.map((category, index) => (
          <button
            className={`category-card category-${index}`}
            key={category.name}
            onClick={() => navigate(`/recipes?search=${encodeURIComponent(category.query)}`)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-arrow">↗</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
