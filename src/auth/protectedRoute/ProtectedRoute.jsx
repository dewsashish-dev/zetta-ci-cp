import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.userAuthState.isLoggedIn);
  console.log(user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
