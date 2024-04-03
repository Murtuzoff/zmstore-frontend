import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      toastHandler('passwordMismatch', t('passwordMismatch'));
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
      toastHandler('profileUpdateError', t('profileUpdateError'));
      setTimeout(() => {
        dispatch(userUpdateResetAction());
      }, 5000);
    }
    if (userId) {
      toastHandler('profileUpdateSuccess', t('profileUpdateSuccess'));
      dispatch(userUpdateResetAction());
    }
  }, [userInfo, errorUpdate, userId, dispatch, t]);

  return (
    <div>
      {toastType === 'passwordMismatch' && <ToastDanger label={toastLabel} />}
      {toastType === 'profileUpdateError' && <ToastDanger label={toastLabel} />}
      {toastType === 'profileUpdateSuccess' && (
        <ToastSuccess label={toastLabel} />
      )}
      {loadingComponent && <Loading marginBottom="20px" />}
      {errorComponent && (
        <MessageDanger message={errorComponent} marginBottom="20px" />
      )}

      <form className="profile-settings" onSubmit={submitHandler}>
        <div className="profile-settings-section">
          <input
            type="text"
            placeholder={`${t('username')}...`}
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder={`${t('emailAddress')}...`}
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="profile-settings-section">
          <input
            type="password"
            placeholder={`${t('newPassword')}...`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={`${t('confirmPassword')}...`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <WoodenButton
          type="submit"
          width="300px"
          maxWidth="inherit"
          label={t('updateProfile')}
        />
      </form>
    </div>
  );
};

export default ProfileSettings;
