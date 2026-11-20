
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchRecipes } from '../services/recipeApi.js'
import { useBookmarks } from '../hooks/useBookmarks.js'
import RecipeGrid from '../components/recipes/RecipeGrid.jsx'
import Skeleton from '../components/common/Skeleton.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useGsapReveal } from '../hooks/useGsapReveal.js'

function Recipes() {
  const pageRef = useGsapReveal('.page-heading, .search-form, .results-meta', { stagger: 0.09 })
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('search') || ''

  // Component states
  const [inputQuery, setInputQuery] = useState(query)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(Boolean(query))
  const [error, setError] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)

  const { bookmarks, toggleBookmark } = useBookmarks()

  // Fetch recipes whenever the search query changes
  useEffect(() => {
    if (!query) {
      return
    }

    const controller = new AbortController()

    async function fetchRecipes() {
      try {
        setLoading(true)
        setError('')
        setRecipes([])

        const results = await searchRecipes(query, {
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setRecipes(results)
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to fetch recipes. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchRecipes()

    // Cancel previous request when query changes
    return () => {
      controller.abort()
    }
  }, [query])

  const displayRecipes = query ? recipes : []
  const displayLoading = Boolean(query && loading)
  const displayError = query ? error : ''

  // Handle search form submission
  function submit(event) {
    event.preventDefault()

    const trimmedQuery = inputQuery.trim()

    if (trimmedQuery) {
      setSearchParams({ search: trimmedQuery })
      setVisibleCount(12)
    }
  }

  // Handle quick search filters
  function handleQuickSearch(term) {
    setInputQuery(term)
    setSearchParams({ search: term })
    setVisibleCount(12)
  }

  return (
    <section className="page-shell" ref={pageRef}>

      {/* Page heading */}
      <div className="page-heading">
        <p className="eyebrow">THE RECIPE COLLECTION</p>

        <h1>
          Find your next <em>favorite.</em>
        </h1>

        <p>Good food starts with a little inspiration.</p>
      </div>

      {/* Search form */}
      <form className="search-form" onSubmit={submit}>
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          type="search"
          aria-label="Search recipes"
          placeholder="Try 'roasted tomato pasta'..."
          value={inputQuery}
          onChange={(event) => setInputQuery(event.target.value)}
        />

        <button type="submit" disabled={!inputQuery.trim()}>
          Search
        </button>
      </form>

      {/* Results information */}
      <div className="results-meta">
        <span>
          {displayLoading
            ? 'Finding something delicious...'
            : `${displayRecipes.length} recipes found`}
        </span>

        <div className="quick-filters">
          {['chicken', 'pasta', 'salad'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleQuickSearch(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {displayError && (
        <div className="error-message" role="alert">
          <p>{displayError}</p>

          <button
            type="button"
            onClick={() => setSearchParams({ search: query })}
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading state */}
      {displayLoading && <Skeleton />}

      {/* Recipe results */}
      {!displayLoading && !displayError && displayRecipes.length > 0 && (
        <>
          <RecipeGrid
            recipes={displayRecipes.slice(0, visibleCount)}
            bookmarks={bookmarks}
            onBookmark={toggleBookmark}
          />

          {/* Load more button */}
          {visibleCount < displayRecipes.length && (
            <div className="load-more">
              <button
                type="button"
                className="button button-outline"
                onClick={() =>
                  setVisibleCount((count) => count + 12)
                }
              >
                Load more recipes ↓
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!displayLoading && !displayError && displayRecipes.length === 0 && (
        <EmptyState
          title="Nothing simmering here"
          text={
            query
              ? 'Try another search. Your next favorite might be one word away.'
              : 'Search for an ingredient, dish, or craving to get started.'
          }
        />
      )}

    </section>
  )
}

export default Recipes
