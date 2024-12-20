import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


const PrivateRoute = () => {
  const {userInfo} = useAppSelector(state => state.auth);

if (!userInfo.email ) {
  return <Navigate to="/login" replace/> 
 
} else if (userInfo.isAdmin === true) {
  return  <Navigate to="/" replace/> 
} else {
  return <Outlet/> 
}
  
}

export default PrivateRoute;