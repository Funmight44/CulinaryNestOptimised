import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
const Home = lazy(() => import('../pages/Home.jsx'))
const Recipes = lazy(() => import('../pages/Recipes.jsx'))
const RecipeDetails = lazy(() => import('../pages/RecipeDetails.jsx'))
const Bookmarks = lazy(() => import('../pages/Bookmarks.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

function AppRoutes() {
  return (
    <Suspense fallback={<div className="route-loading" role="status">Gathering something good…</div>}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default AppRoutes
