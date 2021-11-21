import { Home, Login, Signup, Forgot, Profile, Unauthorized, Unknown, YourWork, Organization, Board } from '../components';
import { withAuth } from '../../helpers';

export const createRoutes = () => ([
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: withAuth({ redirectTo: "/account/login" })(Home),
  },  
  {
    name: 'Board',
    path: '/workspace/:id',
    exact: true,
    component: withAuth({ redirectTo: "/account/login" })(Board),
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
    name: 'Organization',
    path: '/organization/settings',
    exact: true,
    component: withAuth({ redirectTo: "/account/login" })(Organization),
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
    component: withAuth({ redirectTo: "/account/login" })(Profile),
  },
  {
    name: 'Unauthorized',
    path: '/Unauthorized',
    exact: true,
    component: Unauthorized,
  },
  {
    name: 'YourWork',
    path: '/your-work',
    exact: true,
    component: withAuth({ redirectTo: "/account/login" })(YourWork),
  },
  {
    name: 'Default',
    path: '*',
    exact: true,
    component: Unknown,
    // resources: [profileResource],
  },
]);