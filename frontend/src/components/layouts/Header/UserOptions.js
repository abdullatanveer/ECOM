import React,{useState} from 'react'
import {SpeedDial,SpeedDialAction } from '@material-ui/lab';
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import {useSelector,useDispatch} from "react-redux";
import { logOut } from '../../../actions/userActions';
import { ResetCart } from '../../../actions/cartActions';
 


const UserOptions = ({user}) => {
   
    const [open,setOpen]=useState(false);
    const navigate= useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();
   
    
    const options=[
        {icon:<ListAltIcon/> ,name:"orders",func:orders},
        {icon:<PersonIcon/> ,name:"Profile",func:account},
        
        {icon:<ExitToAppIcon/> ,name:"logout",func:logoutUser},
    ]
    if(user.role==="admin"){
        options.unshift(
        {icon:<DashboardIcon/> ,name:"Dashboard",func:dashboard})

    }
    if(user.role==="customerAgent"){
        options.unshift(
            {icon:<DashboardIcon/> ,name:"Ticket Management",func:ticketManagement}
        )
    }

    function orders(){
        navigate('/orders/me')
    }

    function dashboard(){
        navigate('/admin/dashboard')
    }

    function account(){
        navigate('/account')
    }
    function ticketManagement(){
        navigate('/TicketManagement')
    }
     

    function logoutUser(){
        dispatch(logOut())
        alert.success("LogOut Successfully");
        dispatch(ResetCart())
    }
  return (
    <>
     <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial 
    ariaLabel="speed dial tooltip example"
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction="down"
    className='speedDail'
    icon={<img 
        className='speedDialIcon'
        // src={user.avatar.url ? user.avatar.url :"/Profile.png"}
        alt="Profile"
         

       /> 
       }>


{options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
             
          />
        ))}
    
     
         
    </SpeedDial>
    </>
  )
}

export default UserOptions