import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import MessageDanger from '../../common/Messages/MessageDanger';
import WoodenProfileBackground from '../../common/Backgrounds/WoodenProfileBackground';
import Loading from '../../common/Messages/Loading';
import UserIcon from '../../common/Icons/RoundedIcons/UserIcon';
import ProfileButton from '../../common/Buttons/ProfileButton/ProfileButton';
import OrderListAll from '../../modules/OrderListAll/OrderListAll';
import ProfileOrderList from '../../modules/ProfileOrderList/ProfileOrderList';
import ProfileSettings from '../../modules/ProfileSettings/ProfileSettings';

import './Profile.css';

const Profile = () => {
  window.scrollTo(0, 0);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const orderListAll = useSelector((state) => state.orderListAll);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=profile');
    }
  }, [userInfo, navigate]);

  const [activeTab, setActiveTab] = useState('ProfileOrderList');

  const profileOrderListHandler = () => {
    setActiveTab('ProfileOrderList');
  };
  const profileSettingsHandler = () => {
    setActiveTab('ProfileSettings');
  };

  return (
    <main className="profile">
      <div className="profile-card">
        {error && <MessageDanger message={error} />}

        <div className="profile-card-header">
          <WoodenProfileBackground />

          <div className="profile-card-header-container">
            <div className="profile-card-info">
              <span className="profile-card-username">{userInfo?.name}</span>

              <span className="profile-card-reglabel">
                Аккаунт зарегистрирован:
              </span>

              <span className="profile-card-regdate">
                {moment(userInfo?.createdAt).format('LL')}
              </span>
            </div>

            {loading ? (
              <Loading color="#fea" />
            ) : (
              <UserIcon width="70px" height="70px" />
            )}
          </div>
        </div>

        <div className="profile-buttons">
          <ProfileButton
            label="СПИСОК ЗАКАЗОВ"
            count={
              userInfo?.isAdmin
                ? orderListAll?.orderArray?.length
                : orderList?.orderArray?.length
            }
            onClick={profileOrderListHandler}
            isActive={activeTab === 'ProfileOrderList'}
          />

          <ProfileButton
            label="НАСТРОЙКИ ПРОФИЛЯ"
            onClick={profileSettingsHandler}
            isActive={activeTab === 'ProfileSettings'}
          />
        </div>
      </div>

      {activeTab === 'ProfileOrderList' ? (
        <>
          {userInfo?.isAdmin && <OrderListAll />}
          {!userInfo?.isAdmin && <ProfileOrderList />}
        </>
      ) : (
        <ProfileSettings />
      )}
    </main>
  );
};

export default Profile;
