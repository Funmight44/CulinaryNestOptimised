import { memo, useMemo } from 'react'
import RecipeCard from './RecipeCard.jsx'
import { useGsapReveal } from '../../hooks/useGsapReveal.js'

function RecipeGrid({ recipes, bookmarks, onBookmark }) {
  const gridRef = useGsapReveal('.recipe-card', { stagger: 0.07 })
  const bookmarkIds = useMemo(() => new Set(bookmarks.map(({ id }) => id)), [bookmarks])
  return (
    <div className="recipe-grid" ref={gridRef}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          saved={bookmarkIds.has(recipe.id)}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  )
}

export default memo(RecipeGrid)
