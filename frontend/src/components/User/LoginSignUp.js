 import React, {useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
 

 
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import Loader from "../layouts/loader/Loader";

import { login,clearErrors, register } from "../../actions/userActions";
import{ useDispatch,useSelector} from 'react-redux';
import {useAlert} from'react-alert';
import {useNavigate,useLocation} from 'react-router-dom';
 
 
 
 const LoginSignUp = () => {

    const dispatch=useDispatch();
    const {error,loading,isAuthenticated}=useSelector((state) => state.user);
    const alert =useAlert();
    const navigate = useNavigate();
    const location=useLocation();

    const loginTab=useRef(null)
    const switcherTab=useRef(null);
    const registerTab =useRef(null);
    const [loginPassword,setLoginPassword]=useState("");
    const [loginEmail,setLoginEmail]=useState('');


     



// i am setting the states here
    const [user, setUser]=useState({
        name:"",
        email:"",
        password:""
    });
    const { name, email, password } = user;
    

    const [avatar,setAvatar]=useState("/Profile.png");
    const[avatarPreview,setAvatarPreview]=useState("/Profile.png");



     




    const loginSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
        
        
         
          
        }
         
        
    
    const registerSubmit = (e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("password",password);
        myform.set("avatar",avatar);
        dispatch(register(myform))
        console.log("FORM SUBIMITTED");
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    // useEFFECT

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
          navigate(redirect);
          }
           
           
         
          
        
        
       
       
    }, [dispatch,error,alert,isAuthenticated,navigate,redirect]);
    

     

    const switchTabs= (e,tab)=>{
         
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
        }
// this is my fuction that get triggered on Onchange in my input fields
        const registerDataChange = (e) => {
            if (e.target.name === "avatar") {
              const reader = new FileReader();
        
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
                }
              };
        
              reader.readAsDataURL(e.target.files[0]);
            } else {
              setUser({ ...user, [e.target.name]: e.target.value });
            }
          };
        
   return (
    <>
    {loading ? (<Loader/>):( <>
      
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />

          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
{/**  and the proble lies here i am trying to upload image */}
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>

          </div>
          </div>
 </>
 )}
     
     </>
   )
 }
 
 export default LoginSignUp;