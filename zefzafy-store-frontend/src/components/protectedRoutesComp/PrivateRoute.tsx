import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


const PrivateRoute = () => {
  const {userInfo} = useAppSelector(state => state.auth);

  return userInfo && !userInfo.isAdmin ? <Outlet/> : <Navigate to="/login" replace/> 
  
}

export default PrivateRoute;