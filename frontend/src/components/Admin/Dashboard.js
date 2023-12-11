import React,{useState,useEffect} from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { CategoryScale } from 'chart.js';
 import { useSelector,useDispatch } from 'react-redux';


 
import Sidebar from './Sidebar.js'


const Dashboard = () => {
  const {products}=useSelector(state => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const {users}= useSelector (state=>state.allUsers);
  
   
  const dispatch=useDispatch();
  
  let outofStock=0;
  {products && products.forEach((item)=>{
    if(item.stock===0){
      outofStock += 1;
    }
   })}
    

    


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["blue"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        type:"line",
        data: [0, 900],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outofStock, products.length-outofStock],
      },
    ],
  };

  const [registered, setRegistered] =useState(false);

  if (!registered) {
    Chart.register(...registerables);
    Chart.register(CategoryScale);
    setRegistered(true);
  }
  return (
     <> 
        <div className="dashboard">
       
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> PKR 200
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
            <p>  {products && products.length}</p>
               
            </Link>
            <Link to="/admin/orders">
            <p>Orders</p>
              <p>{orders && orders.length}</p>
              
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
               
            </Link>
          </div>
        </div>
        <div className="lineChart">
        <Line data={lineState}
 
/>

        </div>
        
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

        </div>
        </div>
    </>
  )
}

export default Dashboard