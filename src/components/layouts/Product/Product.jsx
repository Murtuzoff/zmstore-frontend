import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { productItemAction } from '../../../redux/actions/productActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import ProductData from '../../modules/ProductData/ProductData';
import ProductReviews from '../../modules/ProductReviews/ProductReviews';

import './Product.css';

const Product = () => {
  const { loading, error, productInfo } = useSelector(
    (state) => state.productItem,
  );

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productItemAction({ productId: params.id }));
  }, [dispatch, params.id]);

  return (
    <main className="product">
      {loading && <Loading />}
      {error && <MessageDanger message={error} />}

      {!loading && !error && (
        <>
          <span className="product-name">{productInfo.name}</span>
          <ProductData />
          <span className="product-description">{productInfo.description}</span>
          <ProductReviews />
        </>
      )}
    </main>
  );
};

export default Product;
