import React, {useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/profileActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layouts/metadata";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {useNavigate, useParams} from 'react-router-dom';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {token}=useParams();
    const navigate=useNavigate();
  
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
  
    
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
       
      myForm.set("password", Password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token,myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Paassword Updated Successfully");
  
        navigate("/login");
  
         
      }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MetaData title="Reset Password" />
              <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                  <h2 className="updatePasswordHeading">Update Password</h2>
    
                  <form
                    className="resetPasswordForm"
                    onSubmit={resetPasswordSubmit}
                  >
                    
    
                    <div  >
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div >
                      <LockIcon />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      value="update"
                      className="resetPasswordBtn"
                    />
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      );
}

export default ResetPassword