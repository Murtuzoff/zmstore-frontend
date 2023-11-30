import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { userLoginAction } from '../../../redux/actions/userActions';

import StyledForm from '../../modules/StyledForm/StyledForm';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import MessageDanger from '../../common/Messages/MessageDanger';
import Loading from '../../common/Messages/Loading';

import './Login.css';

const Login = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) navigate(redirect ? `/${redirect}` : '/');
  }, [userInfo, navigate, redirect]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
  };

  return (
    <main className="login">
      <StyledForm onSubmit={submitHandler}>
        {loading && <Loading />}
        {error && <MessageDanger message={error} />}

        <strong>Авторизация пользователя:</strong>
        <input
          type="text"
          placeholder="Электронный адрес..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Пароль..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <WoodenButton width="100%" label="ВХОД" type="submit" />
        <div>
          <span>У меня нет аккаунта:</span>{' '}
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            <strong>РЕГИСТРАЦИЯ</strong>
          </Link>
        </div>
      </StyledForm>
    </main>
  );
};

export default Login;
