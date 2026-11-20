import { BrowserRouter } from 'react-router-dom'
import { BookmarkProvider } from './context/BookmarkContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
      <BookmarkProvider>
        <AppRoutes />
      </BookmarkProvider>
    </BrowserRouter>
  )
}

export default App
