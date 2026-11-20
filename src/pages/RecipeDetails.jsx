
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup.js'
import { getRecipe } from '../services/recipeApi.js'
import { useBookmarks } from '../hooks/useBookmarks.js'
import BookmarkButton from '../components/recipes/BookmarkButton.jsx'
import Loader from '../components/common/Loader.jsx'

// Format ingredient quantities when servings change
function formatQuantity(quantity, multiplier) {
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    return quantity || ''
  }

  const value = Math.round(quantity * multiplier * 100) / 100

  return Number.isInteger(value)
    ? value
    : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

function RecipeDetails() {
  const { id } = useParams()
  const detailRef = useRef(null)

  // Component states
  const [recipe, setRecipe] = useState(null)
  const [servings, setServings] = useState(2)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { isBookmarked, toggleBookmark } = useBookmarks()

  useGSAP(() => {
    if (loading || !recipe || prefersReducedMotion()) return
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
    timeline.from('.detail-hero > img', { autoAlpha: 0, scale: 1.04, duration: 0.8 })
      .from('.detail-heading .eyebrow', { y: 12, autoAlpha: 0, duration: 0.42 }, '-=0.48')
      .from('.detail-heading h1', { y: 18, autoAlpha: 0, duration: 0.55 }, '-=0.24')
      .from('.detail-stats, .detail-bookmark', { y: 10, autoAlpha: 0, duration: 0.42, stagger: 0.1 }, '-=0.22')

    gsap.from('.ingredients li', {
      y: 12,
      autoAlpha: 0,
      duration: 0.42,
      stagger: 0.045,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.ingredients ul', start: 'top 88%', once: true },
    })
    gsap.from('.detail-aside', {
      y: 18,
      autoAlpha: 0,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.detail-content', start: 'top 86%', once: true },
    })
  }, { scope: detailRef, dependencies: [loading, recipe], revertOnUpdate: true })

  // Fetch recipe details when the recipe ID changes
  useEffect(() => {
    const controller = new AbortController()

    async function fetchRecipe() {
      try {
        setLoading(true)
        setError('')
        setRecipe(null)

        const result = await getRecipe(id, {
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setRecipe(result)
          setServings(result.servings || 2)
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Something went wrong. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchRecipe()

    // Cancel the request when the component unmounts or ID changes
    return () => {
      controller.abort()
    }
  }, [id])

  // Loading state
  if (loading) {
    return (
      <section className="page-shell">
        <Loader label="Bringing this recipe to the table..." />
      </section>
    )
  }

  // Error and empty state
  if (error || !recipe) {
    return (
      <section className="page-shell">
        <div className="message-box">
          <h2>We hit a little snag.</h2>

          <p>
            {error || 'This recipe could not be found.'}
          </p>

          <Link className="button" to="/recipes">
            Back to recipes
          </Link>
        </div>
      </section>
    )
  }

  // Calculate ingredient quantity multiplier
  const multiplier = servings / (recipe.servings || 1)

  return (
      <article className="detail-page" ref={detailRef}>

      {/* Breadcrumb navigation */}
      <div className="detail-crumb">
        <Link to="/recipes">← Back to recipes</Link>
        <span> / {recipe.publisher}</span>
      </div>

      {/* Recipe hero section */}
      <div className="detail-hero">
        <img
          src={recipe.image_url?.replace(/\/(\d+)x\d+\//, '/1200x1200/') || recipe.image_url}
          alt={recipe.title}
          width="1200"
          height="800"
          fetchPriority="high"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />

        <div className="detail-heading">
          <p className="eyebrow">
            FROM {recipe.publisher?.toUpperCase()}
          </p>

          <h1>{recipe.title}</h1>

          <div className="detail-stats">
            <span>
              ◷ {recipe.cooking_time || '—'} min
            </span>

            <span>
              ✳ {servings} servings
            </span>
          </div>

          {/* Bookmark button */}
          <div className="detail-bookmark">
            <span>Save this recipe</span>

            <BookmarkButton
              saved={isBookmarked(recipe.id)}
              onClick={() => toggleBookmark(recipe)}
            />
          </div>
        </div>
      </div>

      {/* Recipe content */}
      <div className="detail-content">

        {/* Ingredients section */}
        <section className="ingredients">
          <p className="eyebrow">
            GATHER YOUR INGREDIENTS
          </p>

          <h2>
            The good <em>stuff.</em>
          </h2>

          {/* Serving adjustment */}
          <div className="serving-control">
            <span>Servings</span>

            <button
              onClick={() => setServings((prev) => Math.max(1, prev - 1))}
              aria-label="Decrease servings"
              disabled={servings <= 1}
            >
              −
            </button>

            <b>{servings}</b>

            <button
              onClick={() => setServings((prev) => prev + 1)}
              aria-label="Increase servings"
            >
              +
            </button>
          </div>

          {/* Ingredients list */}
          <ul>
            {(recipe.ingredients || []).map((ingredient, index) => (
              <li key={`${ingredient.description}-${index}`}>
                <span className="checkmark">✓</span>

                <span>
                  <b>
                    {formatQuantity(ingredient.quantity, multiplier)}{' '}
                    {ingredient.unit}
                  </b>{' '}
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recipe information sidebar */}
        <aside className="detail-aside">
          <span>✳</span>

          <h3>Make it your own.</h3>

          <p>
            Good recipes are starting points. Taste as you go,
            add what you love, and gather everyone around.
          </p>

          {recipe.source_url && (
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Original recipe ↗
            </a>
          )}
        </aside>

      </div>
    </article>
  )
}

export default RecipeDetails
