import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../assets";
import { SignUp } from "../components";

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user.token) {
      localStorage.setItem("User Token", user.token);
      if (user.accountType === "admin") {
        navigate("/admin"); // Redirect to admin page
      } else {
        navigate(from); // Use navigate for redirection
      }
    }
  }, [user, from, navigate]);

  return (
    <div className='w-full'>
      <img src={Office} alt='Office' className='object-contain' />
      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;