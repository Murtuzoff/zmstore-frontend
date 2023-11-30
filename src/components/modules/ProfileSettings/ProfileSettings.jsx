import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  userUpdateAction,
  userUpdateResetAction,
} from '../../../redux/actions/userActions';

import ToastSuccess from '../../common/Toasts/ToastSuccess';
import ToastDanger from '../../common/Toasts/ToastDanger';
import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './ProfileSettings.css';

const ProfileSettings = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { userId } = userUpdate;
  const loadingUpdate = userUpdate.loading;
  const errorUpdate = userUpdate.error;

  const loadingComponent = loading || loadingUpdate;
  const errorComponent = error || errorUpdate;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastType, setToastType] = useState(null);
  const [toastLabel, setToastLabel] = useState(null);

  const toastHandler = (type, label) => {
    setToastType(null);
    setToastLabel(null);

    setTimeout(() => {
      setToastType(type);
      setToastLabel(label);
    });
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastHandler('passwordNoMatch', 'Пароли не совпадают');
    } else {
      dispatch(userUpdateAction({ name, email, password }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
    }
    if (errorUpdate) {
      toastHandler('updateError', 'Ошибка обновления профиля');
      setTimeout(() => {
        dispatch(userUpdateResetAction());
      }, 5000);
    }
    if (userId) {
      toastHandler('updateSuccess', 'Профиль обновлён');
      dispatch(userUpdateResetAction());
    }
  }, [userInfo, errorUpdate, userId, dispatch]);

  return (
    <div>
      {toastType === 'passwordNoMatch' && <ToastDanger label={toastLabel} />}
      {toastType === 'updateError' && <ToastDanger label={toastLabel} />}
      {toastType === 'updateSuccess' && <ToastSuccess label={toastLabel} />}
      {loadingComponent && <Loading marginBottom="20px" />}
      {errorComponent && (
        <MessageDanger message={errorComponent} marginBottom="20px" />
      )}

      <form className="profile-settings" onSubmit={submitHandler}>
        <div className="profile-settings-section">
          <input
            type="text"
            placeholder="Имя пользователя..."
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Электронный адрес..."
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="profile-settings-section">
          <input
            type="password"
            placeholder="Новый пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Подтвердите пароль..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <WoodenButton
          type="submit"
          width="300px"
          maxWidth="inherit"
          label="ОБНОВИТЬ ПРОФИЛЬ"
        />
      </form>
    </div>
  );
};

export default ProfileSettings;
