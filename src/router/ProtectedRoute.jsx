import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {

    let auth = (localStorage.getItem('pcpAdmin'));    
 
    let data = auth ? JSON?.parse(atob(auth)) :false;
    
  
    

    if (data && data?.userid === "SUPER_ADMIN") {
      return children ? children : <Outlet />;
    }
    
    return <Navigate to={redirectPath} replace />;
  };

  export default ProtectedRoute;