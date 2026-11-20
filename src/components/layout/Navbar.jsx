import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../animations/gsapSetup.js'
import { useBookmarks } from '../../hooks/useBookmarks.js'

function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { bookmarks } = useBookmarks()
  const navigate = useNavigate()

  useGSAP(() => {
    if (menuOpen && !prefersReducedMotion() && window.matchMedia('(max-width: 640px)').matches) {
      gsap.from('.nav-links.open > *', { y: -8, autoAlpha: 0, duration: 0.24, stagger: 0.04, ease: 'power2.out' })
    }
  }, { scope: navRef, dependencies: [menuOpen] })

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="topbar" ref={navRef}>
      <div className="nav-wrap">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">C</span>
          CulinaryNest<span className="brand-dot">.</span>
        </NavLink>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/recipes" onClick={closeMenu}>Recipes</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/bookmarks" onClick={closeMenu}>
            Saved <span className="saved-count">{bookmarks.length}</span>
          </NavLink>
          <button
            className="nav-search"
            aria-label="Search recipes"
            onClick={() => {
              navigate('/recipes')
              closeMenu()
            }}
          >
            ⌕
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
