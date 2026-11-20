import { useEffect, useMemo, useState } from 'react'
import { BookmarkContext } from './bookmarkContextValue.js'

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem('culinarynest-bookmarks') || '[]')
  } catch {
    return []
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(readBookmarks)

  useEffect(() => {
    localStorage.setItem('culinarynest-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const value = useMemo(() => ({
    bookmarks,
    toggleBookmark(recipe) {
      setBookmarks((current) => current.some((item) => item.id === recipe.id)
        ? current.filter((item) => item.id !== recipe.id)
        : [recipe, ...current])
    },
    isBookmarked(id) {
      return bookmarks.some((item) => item.id === id)
    },
  }), [bookmarks])

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

