import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Types from '../store/rewards/types';

const Paypal = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  let paypalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AXz4VC7YgDPC9ii0TRvl3y2LXBvPddq2GCQ65CvNKOAgaJEka4koW24Q2V3mBv_-ssOSIyQ2Z_f06ayX';
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    currency_code: 'USD',
                    value: product.totalPrice
                  },
                  reference: product.reference
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            dispatch({type: Types.REWARD_CREATE, payload: {...product, ...order}})
          }
        }).render(paypalRef)
      });
    }
  })

  return <div ref={v => (paypalRef= v)}></div>;
};


export default Paypal;