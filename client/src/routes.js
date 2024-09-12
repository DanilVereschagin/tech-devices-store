import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
} from './utils/consts';
import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import DevicePage from './pages/DevicePage';
import Auth from './pages/Auth';

export const adminRoutes = [
	{
		path: ADMIN_ROUTE,
		component: Admin,
	},
];

export const authRoutes = [
	{
		path: BASKET_ROUTE,
		component: Basket,
	},
];

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		component: Auth,
	},
	{
		path: DEVICE_ROUTE + '/:id',
		component: DevicePage,
	},
];
