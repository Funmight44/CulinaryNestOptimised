
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup.js'
import { searchRecipes } from '../services/recipeApi.js'
import { useBookmarks } from '../hooks/useBookmarks.js'
import SearchBar from '../components/common/SearchBar.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Skeleton from '../components/common/Skeleton.jsx'
import RecipeGrid from '../components/recipes/RecipeGrid.jsx'
import CategorySection from '../components/home/CategorySection.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import { useGsapReveal } from '../hooks/useGsapReveal.js'

function Home() {
  const heroRef = useRef(null)
  const popularRef = useGsapReveal('.section-intro', { stagger: 0.08 })
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { bookmarks, toggleBookmark } = useBookmarks()
  const navigate = useNavigate()

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const hero = gsap.timeline({ defaults: { ease: 'power2.out' } })
    hero.from('.hero-eyebrow', { y: 12, autoAlpha: 0, duration: 0.5 })
      .from('.hero h1', { y: 22, autoAlpha: 0, duration: 0.65 }, '-=0.25')
      .from('.hero-description', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.3')
      .from('.hero .search-form', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.24')
      .from('.hero-cta', { y: 10, autoAlpha: 0, duration: 0.4 }, '-=0.22')
      .from('.hero-visual > img', { scale: 1.045, autoAlpha: 0, duration: 0.9 }, 0.1)
      .from('.hero-note, .photo-label, .hero-stamp', { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.08 }, '-=0.45')
  }, { scope: heroRef })

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPopularRecipes() {
      try {
        setLoading(true)
        setError('')

        const results = await searchRecipes('pizza', {
          signal: controller.signal,
        })

        setPopular(results)
      } catch (requestError) {
        if (controller.signal.aborted) return

        setError(
          requestError.message || 'Unable to load popular recipes.'
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPopularRecipes()

    return () => {
      controller.abort()
    }
  }, [])

  function handleSearch(query) {
    navigate(`/recipes?search=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span /> GOOD FOOD, GATHERED
          </p>

          <h1>
            Discover recipes
            <br />
            that make every
            <br />
            <em>meal special.</em>
          </h1>

          <p className="hero-description">
            A little inspiration, a pinch of something new, and meals worth
            slowing down for.
          </p>

          <SearchBar onSearch={handleSearch} compact />

          <Link className="hero-cta" to="/recipes">
            Explore all recipes <span>↗</span>
          </Link>

          <div className="hero-note">
            <span>✳</span>
            <div>
              <b>Made for real life</b>
              <small>Simple ideas, unforgettable meals</small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
            alt="Freshly prepared colorful meal on a table"
            width="1200"
            height="900"
            fetchPriority="high"
            decoding="async"
          />

          <div className="photo-label">
            <span>01 / 06</span>
            <b>
              Good things are
              <br />
              always in season.
            </b>
          </div>

          <span className="hero-stamp">
            SAVOR
            <br />
            SLOWLY
          </span>
        </div>

        <span className="hero-sparkle">✳</span>
      </section>

      <section className="section popular-section" ref={popularRef}>
        <SectionHeading
          eyebrow="A FEW GOOD THINGS"
          title={
            <>
              Popular <em>right now.</em>
            </>
          }
          description="Recipes our community keeps coming back to."
          action={
            <button
              className="text-link"
              onClick={() => navigate('/recipes')}
            >
              View all recipes <span>↗</span>
            </button>
          }
        />

        {error ? (
          <p className="error-message">{error}</p>
        ) : loading ? (
          <Skeleton />
        ) : (
          <RecipeGrid
            recipes={popular.slice(0, 4)}
            bookmarks={bookmarks}
            onBookmark={toggleBookmark}
          />
        )}
      </section>

      <CategorySection />
      <WhyChooseUs />
      <Newsletter />
    </>
  )
}

export default Home
