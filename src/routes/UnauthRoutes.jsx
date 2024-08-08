import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

function UnauthRoutes() {
  const { isLoggedIn } = useAuthContext()

  if (isLoggedIn === null) return <>a</>

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default UnauthRoutes
