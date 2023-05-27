import { Navigate, useRoutes, Route } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { useRecoilValue } from 'recoil';
import { authAtom } from './states/authAtom';
import { userAtom } from './states/userAtom';


// ----------------------------------------------------------------------

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useRecoilValue(authAtom);

  return (
        isAuthenticated ? (
          <Component/>
        ) : (
          <Navigate to="/login" />
        )
  );
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <AuthRoute component={DashboardAppPage} /> },
        { path: 'user', element: <AuthRoute component={UserPage} /> },
        { path: 'projects', element: <AuthRoute component={ProductsPage} /> },
        
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
