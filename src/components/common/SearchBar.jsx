
import { useState } from 'react'

function SearchBar({ onSearch, compact = false }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) return

    onSearch(trimmedQuery)
  }

  return (
    <form
      className={`search-form ${compact ? 'search-compact' : ''}`}
      onSubmit={handleSubmit}
    >
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>

      <input
        type="search"
        aria-label="Search recipes"
        placeholder="Try ‘roasted tomato pasta’…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        required
      />

      <button
        type="submit"
        aria-label="Find recipes"
        disabled={!query.trim()}
      >
        {compact ? '↗' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
