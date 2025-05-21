import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/Store";
import { Toaster } from "@/components/ui/sonner";
import { useGetUserProfileQuery } from "./Features/api/authApi";
import LoadingSpinner from "./components/ui/Loading";


const Custom = ({ children }) => {
  const { isLoading } = useGetUserProfileQuery();
  return (
    <>
      {isLoading ? (
        <>
          <LoadingSpinner />{" "}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
