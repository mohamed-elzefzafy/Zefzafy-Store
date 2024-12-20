import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";


const LoggedUserRoute = () => {

  const {userInfo} = useAppSelector(state => state.auth);


  if (userInfo.email ) {
    return <Navigate to="/" replace/> 
   
  } else {
    return <Outlet/> 
  }

}

export default LoggedUserRoute;