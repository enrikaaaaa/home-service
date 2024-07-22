import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "./pages/About/About";
import Bookings from "./components/business/Bookings/Bookings";
import BusinessDetail from "./components/business/BusinessDetail/BusinessDetail";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginRegister/Login";
import { ROUTES } from "./routes/consts";
import React from "react";
import Register from "./pages/LoginRegister/Register";
import RootLayout from "./components/layout/RootLayout";
import SearchCategory from "./pages/SearchCategory/SearchCategory";
import { SearchProvider } from "./context/SearchContext";
import SearchResults from "./pages/SearchCategory/SearchResults";
import Services from "./pages/Services/Services";
import SimilarCategories from "./components/business/SimilarCategories/SimilarCategories";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SERVICES,
        element: <Services />,
      },
      {
        path: ROUTES.ABOUT,
        element: <About />,
      },
      {
        path: ROUTES.SEARCH_CATEGORY,
        element: <SearchCategory />,
      },
      {
        path: ROUTES.BUSINESS_DETAIL,
        element: <BusinessDetail />,
      },
      {
        path: ROUTES.MY_BOOKINGS,
        element: <Bookings />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchResults />,
      },
      {
        path: ROUTES.SIMILAR,
        element: <SimilarCategories />,
      },
    ],
  },
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <UserProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </UserProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export default App;
