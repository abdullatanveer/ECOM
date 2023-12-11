import React,{useEffect} from 'react';
import './OrderDetails.css'
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
 

const OrderDetails = () => {
    const {id}=useParams();
    // const {order,loading,error} = useSelector(state => state.orderDetails||{})
    const orderDetail=useSelector(state=>state.orderDetails)
    const {order,loading,error} = orderDetail;
    const dispatch=useDispatch();
    const alert=useAlert();
     
     

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id))
    },[dispatch,error,alert,id]);
    
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage">
          
          
          <div className="orderDetailsContainer">
            <Typography component="h1">
              Order #{order && order._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              
              <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>
                  {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>{order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X PKR {item.price} ={" "}
                      <b>PKR {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default OrderDetails
