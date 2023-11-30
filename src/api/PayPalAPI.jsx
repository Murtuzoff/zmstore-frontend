import { PayPalAPI } from './serverAPI';

export const createOrder = async ({ totalPrice, currency }) => {
  try {
    const { data } = await PayPalAPI.post(
      '/',
      {
        payload: {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: totalPrice,
              },
            },
          ],
        },
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (data.id) return data.id;

    const errorDetail = data?.details?.[0];
    const errorMessage = errorDetail
      ? `${errorDetail.issue} ${errorDetail.description} (${data.debug_id})`
      : JSON.stringify(data);

    throw new Error(errorMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
};

export const onApprove = async (orderData, actions) => {
  try {
    const { data } = await PayPalAPI.post(`/${orderData.orderID}/capture`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const errorDetail = data?.details?.[0];

    switch (true) {
      case errorDetail?.issue === 'INSTRUMENT_DECLINED':
        return actions.restart();
      case errorDetail:
        throw new Error(`${errorDetail.description} (${data.debug_id})`);
      case !data.purchase_units:
        throw new Error(JSON.stringify(data));
      default:
        return actions(data);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
};
