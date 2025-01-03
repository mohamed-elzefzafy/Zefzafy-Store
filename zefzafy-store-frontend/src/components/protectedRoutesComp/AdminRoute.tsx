import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


const AdminRoute = () => {

  const {userInfo} = useAppSelector(state => state.auth);


  if (!userInfo.email ) {
    return <Navigate to="/login" replace/> 
   
  } else if (userInfo.isAdmin === false) {
    return  <Navigate to="/" replace/> 
  } else {
    return <Outlet/> 
  }

}

export default AdminRoute;