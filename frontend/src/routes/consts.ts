export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  ABOUT: "/about",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH_CATEGORY: "/search/:category",
  BUSINESS_DETAIL: "/business/:id",
  MY_BOOKINGS: "/appointments/:id",
  SEARCH: "/search",
  SIMILAR: "/services/search/:category",
};

export const navigationBarLinks = [
  {
    name: "Home",
    path: ROUTES.HOME,
  },
  {
    name: "Services",
    path: ROUTES.SERVICES,
  },
  {
    name: "About Us",
    path: ROUTES.ABOUT,
  },
];

export const API_URL = "http://localhost:3000";
