import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

function PrivateRoutes() {
  const { isLoggedIn } = useAuthContext()

  if (isLoggedIn === null) return <></> //LOADING?

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
