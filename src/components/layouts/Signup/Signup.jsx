import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { userSignupAction } from '../../../redux/actions/userActions';

import StyledForm from '../../modules/StyledForm/StyledForm';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import MessageDanger from '../../common/Messages/MessageDanger';
import Loading from '../../common/Messages/Loading';

import './Signup.css';

const Signup = () => {
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error } = userSignup;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) navigate(redirect ? `/${redirect}` : '/');
  }, [userInfo, navigate, redirect]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignupAction({ name, email, password }));
  };

  return (
    <main className="signup">
      <StyledForm onSubmit={submitHandler}>
        {loading && <Loading />}
        {error && <MessageDanger message={error} />}

        <strong>Регистрация нового пользователя:</strong>
        <input
          type="text"
          placeholder="Имя пользователя..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <WoodenButton width="100%" label="РЕГИСТРАЦИЯ" type="submit" />
        <div>
          <span>У меня есть аккаунт:</span>{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            <strong>ВХОД</strong>
          </Link>
        </div>
      </StyledForm>
    </main>
  );
};

export default Signup;
