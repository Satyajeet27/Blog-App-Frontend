import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';

import Editor from './pages/Editor';
import Layout from './layout/Layout';
import PrivateRoute from './auth/PrivateRoute';
import Blogs from './components/Dashboard/Blogs';
import BlogPage from './pages/BlogPage';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import SearchPage from './pages/SearchPage';



const withLayout = (Component: React.ComponentType) => (
  <Layout><Component /></Layout>
);

const withPrivateLayout = (Component: React.ComponentType) => (
  <PrivateRoute>{withLayout(Component)}</PrivateRoute>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: withLayout(Home),
  },
  {
    path: "/auth",
    element: withLayout(Auth),
  },
  {
    path: "/user/:username",
    element: withPrivateLayout(UserProfile),
  },
  {
    path: "/dashboard",
    element: withPrivateLayout(Dashboard),
    children: [
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "editor",
        element: <Editor />,
      },
    ],
  },
  {
    path: "/settings",
    element: withPrivateLayout(Dashboard),
    children: [
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "reset-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/editor",
    element: withPrivateLayout(Editor),
  },
  {
    path: "/blog/:blogId",
    element: withLayout(BlogPage)
  }
  ,
  {
    path: "/search",
    element: withLayout(SearchPage)
  }
];


export const router = createBrowserRouter(routes);