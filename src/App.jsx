import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/login";
import HeroSection from "./pages/student/HeroSection";
import Layout from "./Layout/Layout";
import Courses from "./pages/student/CoursesContainer";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/lecture/Sidebar";
import DashBord from "./pages/admin/DashBord";
import AddCourse from "./pages/admin/course/addCourse";
import CourseTable from "./pages/admin/course/CourseTable";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CouresDetail from "./pages/student/CouresDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
  PurchaseCourseProtectedRoute,
} from "./components/ui/ProtectedRoute";
import { ThemeProvider } from "./components/ui/ThemProvider";
import Students from "./pages/admin/course/Students";
import Premium from "./pages/admin/Premium";
import BecomeAdmin from "./pages/admin/Tech/BecomeAdmin";
import TechDetails from "./pages/admin/Tech/TechDetails";
import AdminProfile from "./pages/admin/Tech/AdminProfile";
import Msync from "./pages/Msync";
import UserDetailsPage from "./pages/Msync/UserProfile/UserDetailsPage";
import FooterSection from "./pages/student/FooterSection";
// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
            <FooterSection/>
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "/tech",
        element: <BecomeAdmin />,
      },
      {
        path: "/tech-credencial/:userId",
        element: <TechDetails />,
      },
      {
        path: "/mylearn",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "/m-sync",
        element: (
          <ProtectedRoute>
            <Msync />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-profile/:userId",
        element: (
          <ProtectedRoute>
            <UserDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/course/search",

        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coursedetails/:courseId",
        element: (
          <ProtectedRoute>
            <CouresDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-profile/:userId",
        element: (
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courseprogress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard", // Use relative path
            element: <DashBord />,
          },
          {
            path: "course", // Use relative path
            element: <CourseTable />,
          },
          {
            path: "students", // Use relative path
            element: <Students />,
          },

          {
            path: "premium", // Use relative path
            element: <Premium />,
          },

          {
            path: "course/create", // Use relative path
            element: <AddCourse />,
          },
          {
            path: "course/:courseId", // Use relative path
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture", // Use relative path
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId", // Use relative path
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main className="">
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
