import { Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

function UnauthRoutes() {
  const { user } = useAuthContext()

  return !user ? <Outlet /> : <Outlet />
}

export default UnauthRoutes
