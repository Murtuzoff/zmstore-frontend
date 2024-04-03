import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  productItemAction,
  productUpdateAction,
  productUpdateResetAction,
  productDeleteAction,
} from '../../../redux/actions/productActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';
import CheckButton from '../../common/Buttons/EditButton/CheckButton';
import EditButton from '../../common/Buttons/EditButton/EditButton';
import EditImageButton from '../../common/Buttons/EditButton/EditImageButton';
import ProductImage from '../../common/Images/ProductImage';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './ProductUpdate.css';

const ProductUpdate = () => {
  const { t } = useTranslation();

  const { loading, error, productInfo } = useSelector(
    (state) => state.productItem,
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  const loadingComponent = loading || loadingUpdate;
  const errorComponent = error || errorUpdate;

  const [processName, setProcessName] = useState(false);
  const [name, setName] = useState('');
  const [processPrice, setProcessPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [processCountInStock, setProcessCountInStock] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [processDescription, setProcessDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [stateSuccessUpdate, setStateSuccessUpdate] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const productUpdateHandler = () => {
    dispatch(
      productUpdateAction({
        productId: params.id,
        name,
        image,
        description,
        price,
        countInStock,
      }),
    );
    window.scrollTo(0, 0);
  };

  const productDeleteHandler = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const deleteConfirmed = confirm(t('sureWantDelete'));

    if (deleteConfirmed) {
      dispatch(productDeleteAction({ productId: params.id }));
      navigate('/');
      // eslint-disable-next-line no-alert
      alert(t('deletionCompleted'));
    } else {
      // eslint-disable-next-line no-alert
      alert(t('deletionCancelled'));
    }
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(productItemAction({ productId: params.id }));
      setName(productInfo.name);
      setPrice(productInfo.price);
      setCountInStock(productInfo.countInStock);
      setDescription(productInfo.description);
    }
  }, [
    dispatch,
    params.id,
    productInfo.name,
    productInfo.price,
    productInfo.countInStock,
    productInfo.description,
  ]);

  useEffect(() => {
    if (successUpdate) {
      setStateSuccessUpdate(true);
      dispatch(productUpdateResetAction());
    }
  }, [successUpdate, dispatch]);

  return (
    <main className="product-update">
      {loadingComponent && <Loading />}
      {errorComponent && <MessageDanger message={errorComponent} />}

      {!loadingComponent &&
        !errorComponent &&
        (stateSuccessUpdate ? (
          <>
            <MessageSuccess message={t('productUpdateSuccess')} />

            <div className="product-update-buttons">
              <div>
                <Link to={`/product/${params.id}`}>
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label={t('toProduct')}
                  />
                </Link>

                <Link to="/">
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label={t('toHome')}
                  />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="product-update-name">
              {processName ? (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setProcessName(false)}
                  />
                  <span> &nbsp;</span>
                  <CheckButton onClick={() => setProcessName(false)} />
                </>
              ) : (
                <>
                  <span>{name}</span>
                  <span> &nbsp;</span>
                  <EditButton onClick={() => setProcessName(true)} />
                </>
              )}
            </span>

            <div className="product-update-data">
              <div className="product-update-image">
                <EditImageButton
                  width="36px"
                  height="36px"
                  onClick={(e) => setImage(e.target.files[0])}
                />
                <ProductImage
                  src={image ? URL.createObjectURL(image) : productInfo.image}
                  alt={productInfo.name}
                  borderRadius="12px"
                />
              </div>

              <div className="product-update-detail">
                <table cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td className="td-left">
                        <span>{t('price')}:</span>
                      </td>

                      <td className="td-right">
                        {processPrice ? (
                          <>
                            <input
                              type="text"
                              value={price}
                              onChange={(e) =>
                                setPrice(
                                  e.target.value
                                    .replace(/,/g, '.')
                                    .replace(/^\./, '0.')
                                    .replace(/[^\d.]/g, '')
                                    .replace(/^(\d*\.\d*)\..*/, '$1'),
                                )
                              }
                              onBlur={(e) => {
                                if (Number.isNaN(Number(price))) {
                                  // eslint-disable-next-line no-alert
                                  alert(`${t('enterValidValue')}.`);
                                  setPrice('');
                                }
                                setPrice(Number(e.target.value).toFixed(2));
                                setProcessPrice(false);
                              }}
                            />
                            <span> $ &nbsp;</span>
                            <CheckButton
                              onClick={() => setProcessPrice(false)}
                            />
                          </>
                        ) : (
                          <>
                            <span>{price}</span>
                            <span> $ &nbsp;</span>
                            <EditButton onClick={() => setProcessPrice(true)} />
                          </>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="td-left td-last">
                        <span>{t('quantity')}:</span>
                      </td>

                      <td className="td-right td-last">
                        {processCountInStock ? (
                          <>
                            <input
                              type="text"
                              value={countInStock}
                              onChange={(e) =>
                                setCountInStock(
                                  e.target.value.replace(/[^\d]/g, ''),
                                )
                              }
                              onBlur={(e) => {
                                if (Number.isNaN(Number(countInStock))) {
                                  // eslint-disable-next-line no-alert
                                  alert(`${t('enterValidValue')}.`);
                                  setCountInStock('');
                                }
                                setCountInStock(
                                  Number(e.target.value).toFixed(0),
                                );
                                setProcessCountInStock(false);
                              }}
                            />
                            <span> &nbsp;</span>
                            <CheckButton
                              onClick={() => setProcessCountInStock(false)}
                            />
                          </>
                        ) : (
                          <>
                            <span>{countInStock}</span>
                            <span> &nbsp;</span>
                            <EditButton
                              onClick={() => setProcessCountInStock(true)}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <span className="product-update-description">
              {processDescription ? (
                <>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setProcessDescription(false)}
                  />
                  <span> &nbsp;</span>
                  <CheckButton onClick={() => setProcessDescription(false)} />
                </>
              ) : (
                <>
                  <span>{description}</span>
                  <span> &nbsp;</span>
                  <EditButton onClick={() => setProcessDescription(true)} />
                </>
              )}
            </span>

            <div className="product-update-buttons">
              <div>
                <Link to={`/product/${params.id}`}>
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label={t('CANCEL')}
                  />
                </Link>
                <WoodenButton
                  width="300px"
                  maxWidth="100%"
                  label={t('UPDATE')}
                  onClick={productUpdateHandler}
                />
              </div>
              <WoodenButton
                width="300px"
                maxWidth="100%"
                label={t('DELETE')}
                onClick={productDeleteHandler}
              />
            </div>
          </>
        ))}
    </main>
  );
};

export default ProductUpdate;
