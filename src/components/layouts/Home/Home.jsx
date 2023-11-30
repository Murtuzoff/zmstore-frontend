import React from 'react';
import HomeHeader from '../../modules/HomeHeader/HomeHeader';
import HomeShop from '../../modules/HomeShop/HomeShop';
import HomeSubscription from '../../modules/HomeSubscription/HomeSubscription';
import HomeContactList from '../../modules/HomeContactList/HomeContactList';
import './Home.css';

const Home = () => (
  <main className="home">
    <HomeHeader />
    <HomeShop />
    <HomeSubscription />
    <HomeContactList />
  </main>
);

export default Home;
