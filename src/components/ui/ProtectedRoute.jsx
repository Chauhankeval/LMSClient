import { useGetCourseDetailsQuery } from "@/Features/api/purchaseApi";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to={"/"} />;
  }

  return children;
};

export const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();

  const { data, isLoading } = useGetCourseDetailsQuery(courseId);

  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? children : <Navigate to={`/coursedetails/${courseId}`} />;
};
