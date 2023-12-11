import React,{useEffect,useRef}from 'react'
import './Payment.css';
import './CheckoutSteps';
import {useSelector,useDispatch} from 'react-redux';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import MetaData from '../layouts/metadata';
import {CardNumberElement,CardCvcElement,useStripe,useElements,CardExpiryElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderActions';


const baseUrl = "http://localhost:3001";



const Payment = () => {
  const payBtn=useRef(null);
  const alert=useAlert();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {shippingInfo,cartItems}=useSelector( state => state.cart);
  const {user} =useSelector(state=> state.user);
  const {error}=useSelector( state => state.newOrder);
  const stripe=useStripe();
  const elements=useElements();

  const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData={
    amount:Math.round(orderInfo.totalPrice *100)
  };

  const submitHandler = async (e)=>{
    e.preventDefault();
    payBtn.current.disabled=true;

    try {
      const config={
        headers:{
          "Content-Type":"application/json",
           
           
        },
        withCredentials:true,

      };

      // const {data}=await axios.post(
      //   `${baseUrl}/api/v1/process/payment`,
      //    paymentData,
      //    config
      //   );
      const response = await axios.post(
        `${baseUrl}/api/v1/process/payment`,
        paymentData,
        config
      );
      const {data}=response;
        if (response.status === 200) {
          // const data = response.data; // Access the 'data' property
          // ... Rest of the code ...
           
          console.log(data);
        } else {
          // Handle unexpected response status
          console.error("Unexpected response status:", response.status);
        }
      const client_secret=data.client_secret;
      if(!stripe||!elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if(result.error){
        payBtn.current.disabled=false;
        alert.error(result.error.message);
      }else{
        if(result.paymentIntent.status==="succeeded"){
          order.paymentInfo={
           id:result.paymentIntent.id,
           status:result.paymentIntent.status,
          }
          dispatch(createOrder(order));
          navigate('/success');
        }
        else{
          alert.error("Issue While Processing Payment")
        }
      }

      
    } catch (error) {
      payBtn.current.disable=false;
      alert.error(error.response.data.message);
      
    }

  }

  // order
  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
  },[dispatch,error,alert]);
  return (
    <>
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Card Info</Typography>
        <div>
          <CreditCardIcon />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <EventIcon />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <VpnKeyIcon />
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          value={`Pay - PKR ${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  </>
  )
}

export default Payment