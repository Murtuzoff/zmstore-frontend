import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginGuard from '../security/loginGuard';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderPage from '../pages/OrderPage';
import ProfilePage from '../pages/ProfilePage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductUpdatePage from '../pages/ProductUpdatePage';

const publicRoutes = [
  { path: '/', Component: HomePage },
  { path: '/search/:keyword/page/:pagenumber', Component: HomePage },
  { path: '/search/:keyword', Component: HomePage },
  { path: '/page/:pagenumber', Component: HomePage },
  { path: '/product/:id', Component: ProductPage },
  { path: '/cart/:id?', Component: CartPage },
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignupPage },
  { path: '*', Component: NotFoundPage },
];

const userRoutes = [
  { path: '/shipping', Component: ShippingPage },
  { path: '/payment', Component: PaymentPage },
  { path: '/placeorder', Component: PlaceOrderPage },
  { path: '/order/:id', Component: OrderPage },
  { path: '/profile', Component: ProfilePage },
];

const adminRoutes = [
  { path: '/product/create', Component: ProductCreatePage },
  { path: '/product/:id/update', Component: ProductUpdatePage },
];

const MainRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}

    {userRoutes.map(({ path, Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <LoginGuard>
            <Component />
          </LoginGuard>
        }
      />
    ))}

    {adminRoutes.map(({ path, Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <LoginGuard isAdminRoutes={false}>
            <Component />
          </LoginGuard>
        }
      />
    ))}
  </Routes>
);

export default MainRouter;
