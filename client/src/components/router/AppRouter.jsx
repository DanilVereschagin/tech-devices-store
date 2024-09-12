import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../../routes';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
	const { user } = useContext(Context);

	return (
		<Routes>
			{user.isAuth &&
				user.user.role === 'ADMIN' &&
				adminRoutes.map(({ path, component }) => (
					<Route key={path} path={path} Component={component} exact />
				))}
			{user.isAuth &&
				authRoutes.map(({ path, component }) => (
					<Route key={path} path={path} Component={component} exact />
				))}
			{publicRoutes.map(({ path, component }) => (
				<Route key={path} path={path} Component={component} exact />
			))}
			<Route path='*' key={'*'} element={<Navigate to='/' replace />} />
		</Routes>
	);
});

export default AppRouter;
