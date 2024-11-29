import { Route, Routes } from 'react-router-dom'
import Front from './pages/Front'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext'
import MyList from './components/MyList'
import NotFound from './pages/NotFound'
import DetailedMovie from './pages/DetailedMovie'

function App() {

  return (
    <AuthContext>
      <Routes>
        <Route path='/' element={<Front/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/my-list' element={<ProtectedRoute><MyList/></ProtectedRoute>} />
        <Route path='/detailed/:id' element={<ProtectedRoute><DetailedMovie /></ProtectedRoute>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </AuthContext>
  )
}

export default App
