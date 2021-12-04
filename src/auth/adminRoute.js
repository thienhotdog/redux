import { isAuthenticated } from "../auth";

import { Navigate } from "react-router-dom";
const AdminRoute = (props) => {

  if (isAuthenticated() && isAuthenticated().user.role == 1) {
    return props.children;
  }

  return <Navigate to="/shop" />;
}
 
export default AdminRoute;