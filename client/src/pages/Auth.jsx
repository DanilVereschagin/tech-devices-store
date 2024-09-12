import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

const Auth = observer(() => {
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;

	const { user } = useContext(Context);
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}

			user.setUser(data);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Введите почту'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введите пароль'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Form.Check className='mt-3' type='checkbox' label='Запомнить меня' />
					<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
						{isLogin ? (
							<div>
								Нет аккаунта?{' '}
								<NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
							</div>
						) : (
							<div>
								Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
							</div>
						)}
						<Button variant='outline-success' className='mt-3' onClick={signIn}>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
