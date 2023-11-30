import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { productListAction } from '../../../redux/actions/productActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import HomeProduct from '../HomeProduct/HomeProduct';
import HomePagination from '../HomePagination/HomePagination';

import './HomeShop.css';

const HomeShop = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const productList = useSelector((state) => state.productList);
  const { loading, error, productArray, pageCurrent, pageCount } = productList;

  const params = useParams();
  const keyword = params.keyword || '';
  const pagenumber = params.pagenumber || '';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAction({ keyword, pagenumber }));
  }, [dispatch, keyword, pagenumber]);

  return (
    <div className="home-shop">
      {loading && <Loading />}
      {error && <MessageDanger message={error} />}

      {!loading && !error && (
        <div className="home-product-list">
          {productArray.map((productInfo) => (
            <HomeProduct key={productInfo._id} productInfo={productInfo} />
          ))}
        </div>
      )}

      <HomePagination
        pageCurrent={pageCurrent}
        pageCount={pageCount}
        keyword={keyword}
      />

      {userLogin?.userInfo?.isAdmin && (
        <Link to="/product/create">
          <WoodenButton
            width="300px"
            maxWidth="100%"
            label="ДОБАВИТЬ НОВЫЙ ТОВАР"
          />
        </Link>
      )}
    </div>
  );
};

export default HomeShop;
