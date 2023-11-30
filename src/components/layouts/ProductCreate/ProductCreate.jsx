import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  productCreateAction,
  productCreateResetAction,
} from '../../../redux/actions/productActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';
import CheckButton from '../../common/Buttons/EditButton/CheckButton';
import EditButton from '../../common/Buttons/EditButton/EditButton';
import EditImageButton from '../../common/Buttons/EditButton/EditImageButton';
import ProductImage from '../../common/Images/ProductImage';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './ProductCreate.css';

const ProductCreate = () => {
  const { loading, error, productId } = useSelector(
    (state) => state.productCreate,
  );

  const [processName, setProcessName] = useState(false);
  const [name, setName] = useState('');
  const [processPrice, setProcessPrice] = useState(false);
  const [price, setPrice] = useState(Number(0).toFixed(2));
  const [processCountInStock, setProcessCountInStock] = useState(false);
  const [countInStock, setCountInStock] = useState(Number(0).toFixed(0));
  const [processDescription, setProcessDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [stateProductId, setStateProductId] = useState('');

  const dispatch = useDispatch();

  const productCreateHandler = () => {
    dispatch(
      productCreateAction({
        name,
        image,
        description,
        price,
        countInStock,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (productId) {
      setStateProductId(productId);
      dispatch(productCreateResetAction());
    }
  }, [productId, dispatch]);

  return (
    <main className="product-create">
      {loading && <Loading />}
      {error && <MessageDanger message={error} />}

      {!loading &&
        !error &&
        (stateProductId ? (
          <>
            <MessageSuccess message="Товар был успешно добавлен" />

            <div className="product-create-buttons">
              <div>
                <Link to={`/product/${stateProductId}`}>
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label="К ТОВАРУ"
                  />
                </Link>

                <Link to="/">
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label="НА ГЛАВНУЮ"
                  />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="product-create-name">
              {processName ? (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setProcessName(false)}
                    placeholder="Введите название"
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

            <div className="product-create-data">
              <div className="product-create-image">
                <EditImageButton
                  width="36px"
                  height="36px"
                  onClick={(e) => setImage(e.target.files[0])}
                />
                <ProductImage
                  src={image ? URL.createObjectURL(image) : null}
                  alt={name}
                  borderRadius="12px"
                />
              </div>

              <div className="product-create-detail">
                <table cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td className="td-left">
                        <span>Цена:</span>
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
                                  alert(
                                    'Пожалуйста, введите корректное значение.',
                                  );
                                  setPrice('');
                                }
                                setPrice(Number(e.target.value).toFixed(2));
                                setProcessPrice(false);
                              }}
                            />
                            <span> ₽ &nbsp;</span>
                            <CheckButton
                              onClick={() => setProcessPrice(false)}
                            />
                          </>
                        ) : (
                          <>
                            <span>{price}</span>
                            <span> ₽ &nbsp;</span>
                            <EditButton onClick={() => setProcessPrice(true)} />
                          </>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="td-left td-last">
                        <span>Количество:</span>
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
                                  alert(
                                    'Пожалуйста, введите корректное значение.',
                                  );
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

            <span className="product-create-description">
              {processDescription ? (
                <>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setProcessDescription(false)}
                    placeholder="Введите описание"
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

            <div className="product-create-buttons">
              <div>
                <Link to="/">
                  <WoodenButton
                    width="300px"
                    maxWidth="100%"
                    label="ОТМЕНИТЬ"
                  />
                </Link>
                <WoodenButton
                  width="300px"
                  maxWidth="100%"
                  label="ДОБАВИТЬ"
                  onClick={productCreateHandler}
                />
              </div>
            </div>
          </>
        ))}
    </main>
  );
};

export default ProductCreate;
