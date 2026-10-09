import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './routes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logout, setCredentials, setLoading } from './features/auth/authSlice'
import { authApi } from './features/auth/api/authApi'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if(!accessToken){
      dispatch(setLoading(false))
      return
    }

    authApi.getMe(accessToken)
      .then((user) => {
        dispatch(setCredentials({ user, accessToken }))
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])

  return <RouterProvider router={ router } />
}

export default App
