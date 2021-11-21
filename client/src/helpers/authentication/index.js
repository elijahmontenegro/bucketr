import Cookies from 'js-cookie';

export const getSessionToken = () => Cookies.get('sid');
