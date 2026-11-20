import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark">C</span>
          CulinaryNest<span className="brand-dot">.</span>
        </Link>
        <p>A little inspiration for the everyday table.</p>
        <div className="footer-links">
          <Link to="/recipes">Recipes</Link>
          <Link to="/about">About</Link>
          <Link to="/bookmarks">Saved recipes</Link>
        </div>
        <small>@copyright 2026 Funmight. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
