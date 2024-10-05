import React from 'react';
import { useContext } from 'react';
import { Context } from '../../index';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './NavBar.module.css';
import { observer } from 'mobx-react-lite';
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	LOGIN_ROUTE,
	SHOP_ROUTE,
} from '../../utils/consts';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logout = () => {
		user.setIsAuth(false);
		user.setUser({});
		navigate(LOGIN_ROUTE);
	};

	const auth = () => {
		navigate(LOGIN_ROUTE);
	};

	return (
		<>
			<Navbar bg='dark' data-bs-theme='dark'>
				<Container>
					<NavLink className={classes.main} to={SHOP_ROUTE}>
						Tech Devices
					</NavLink>
					{user.isAuth ? (
						<div className='d-flex'>
							<Nav style={{ color: 'white' }}>
								<Button
									onClick={() => navigate(BASKET_ROUTE)}
									variant='outline-light'
									className='ms-2'
								>
									Корзина
								</Button>
							</Nav>
							<Nav style={{ color: 'white' }}>
								{user.user.role === 'ADMIN' && (
									<Button
										onClick={() => navigate(ADMIN_ROUTE)}
										variant='outline-light'
										className='ms-2'
									>
										Админ панель
									</Button>
								)}

								<Button
									onClick={logout}
									variant='outline-light'
									className='ms-2'
								>
									Выйти
								</Button>
							</Nav>
						</div>
					) : (
						<Nav style={{ color: 'white' }}>
							<Button variant='outline-light' onClick={auth}>
								Авторизация
							</Button>
						</Nav>
					)}
				</Container>
			</Navbar>
		</>
	);
});

export default NavBar;
