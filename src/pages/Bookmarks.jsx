import { Link } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks.js'
import RecipeGrid from '../components/recipes/RecipeGrid.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useGsapReveal } from '../hooks/useGsapReveal.js'

function Bookmarks() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const pageRef = useGsapReveal('.page-heading, .empty-state', { stagger: 0.08 })

  return (
    <section className="page-shell" ref={pageRef}>
      <div className="page-heading">
        <p className="eyebrow">YOUR LITTLE RECIPE BOX</p>
        <h1>Made for <em>keeping.</em></h1>
        <p>All the good things you’ve saved, in one place.</p>
      </div>
      {bookmarks.length ? (
        <RecipeGrid
          recipes={bookmarks}
          bookmarks={bookmarks}
          onBookmark={toggleBookmark}
        />
      ) : (
        <>
          <EmptyState
            title="A little space for something lovely"
            text="Tap the heart on any recipe to keep it close for later."
          />
          <div className="load-more"><Link className="button" to="/recipes">Explore recipes ↗</Link></div>
        </>
      )}
    </section>
  )
}

export default Bookmarks
