import { Outlet, Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';

function PrivateRoutes() {
  const { user } = useAuthContext();

  if (user === undefined) return <></> //

  if (user === null) return <></> //LOADING?



  return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
