import { Home, Login, Signup, Forgot, Profile, Unauthorized, Unknown } from '../components';
import { withAuth } from '../../utils';

export const createRoutes = () => ([
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: withAuth({ redirectTo: "/account/login" })(Home),
  },
  {
    name: 'Login',
    path: '/account/login',
    exact: true,
    component: Login,
  },
  {
    name: 'Signup',
    path: '/account/signup',
    exact: true,
    component: Signup,
  },
  {
    name: 'Forgot',
    path: '/account/forgot-password',
    exact: true,
    component: Forgot,
  },
  {
    name: 'Profile',
    path: '/account/profile',
    exact: true,
    component: withAuth()(Profile),
  },
  {
    name: 'Unauthorized',
    path: '/Unauthorized',
    exact: true,
    component: Unauthorized,
  },
  {
    name: 'Default',
    path: '*',
    exact: true,
    component: Unknown,
    // resources: [profileResource],
  },
]);