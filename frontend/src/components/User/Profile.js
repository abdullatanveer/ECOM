 
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from '../layouts/metadata';
import Loader from "../layouts/loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated === false) {
        navigate("/login");
      }
    }, [navigate, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/updateProfile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders/me">My Orders</Link>
                <Link to="/me/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>

  );
  
}

export default Profile