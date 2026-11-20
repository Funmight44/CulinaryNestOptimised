import { memo } from 'react'
import { Link } from 'react-router-dom'
import BookmarkButton from './BookmarkButton.jsx'

function RecipeCard({ recipe, saved, onBookmark }) {
  return (
    <article className="recipe-card">
      <Link
        className="recipe-photo"
        to={`/recipes/${recipe.id}`}
        aria-label={`View ${recipe.title}`}
      >
        <img
          src={recipe.image_url?.replace(/\/(\d+)x\d+\//, '/600x600/') || recipe.image_url}
          alt={recipe.title}
          loading="lazy"
          decoding="async"
          width="600"
          height="600"
          onError={(event) => {
            event.currentTarget.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
          }}
        />
        <span className="photo-overline">A GOOD THING TO MAKE</span>
      </Link>
      <div className="recipe-info">
        <p className="recipe-publisher">
          {recipe.publisher || 'From the CulinaryNest kitchen'}
        </p>
        <Link className="recipe-title" to={`/recipes/${recipe.id}`}>
          {recipe.title}
        </Link>
        <div className="recipe-card-bottom">
          <span>{recipe.cooking_time ? `◷ ${recipe.cooking_time} min` : 'A lovely little recipe'}</span>
          <BookmarkButton
            saved={saved}
            onClick={() => onBookmark(recipe)}
          />
        </div>
      </div>
    </article>
  )
}

export default memo(RecipeCard)
