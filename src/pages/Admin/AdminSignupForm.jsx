import House from "../../assets/images/House.png";
import "../../styles/Admin Styles/signupform.css";
import search from "../../assets/images/search.png";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import {ToastContainer, toast}  from  "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const SignupForm = () => {
  const {BASE_URL} = useGlobalContext()
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState({
    password: '',
    email: '',
    confirmPassword: '',
    role: 'admin'
  })
  
  
  const redirect = useNavigate()

  const handleChange = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const togglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const togglePassword2 = (e) => {
    e.preventDefault();
    setShow2(!show2);
  };

  const handleRegister = async (e) =>{
    e.preventDefault()
    setClicked(true)
    console.log(user)

  if(user.password.length < 7){
    toast.error("Minimum Password length 7");
    setClicked(false);
    return;
  }
  if(user.password !== user.confirmPassword){
    // console.log("Password does not match")
    toast.error("Password do not match");
    setClicked(false);
    return;
  }

  try {
    const {data} = await axios.post(`${BASE_URL}/register`, {...user});
      if (data.success){
        toast.success('Account Created')
        //navigate 
        redirect("/admin/login")
      }
  } catch (error) {
    toast.error(error.response?.data?.err)
     console.log(error)
     setClicked(false)
     setUser({
      password: '',
      email: '',
      confirmPassword: ''
     })
    
  }


  }

  

  



  return (
    <div className="d-flex justify-content-center sign-in vh-100">
      <ToastContainer/>
      <div className="input-field bg-light p-3 p-md-5 col-md-6">
        <div className="header lh-1 mb-4 text-center text-md-start">
          <p className="text fw-bold fs-4 ">Create an admin account.</p>
          <p>Lets get started by filling out the information below</p>
        </div>
        <form className="inputs " onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email1" className="form-label fs-6">
              Email
            </label>
            <input
              type="email"
              className="form-control shadow-none"
              placeholder="johndoe@gmail.com"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password1" className="form-label fs-6">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              className="form-control shadow-none"
              id="password1"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />

            <button
              className="border-none border-0 outline-none bg-transparent position-absolute top-50"
              style={{ right: "7px", backgroundColor: "transparent" }}
              onClick={togglePassword}
            >
              {show ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fs-6">
              Confirm Password
            </label>

            <input
              type={show2 ? "text" : "password"}
              
              className="w-100 shadow-none"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              className="border-none border-0 outline-none bg-transparent position-absolute top-50"
              style={{ right: "7px", backgroundColor: "transparent" }}
              onClick={togglePassword2}
            >
              {show2 ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-success text-center w-100 btn-lg"
          >
            {clicked ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/admin/login" className="fw-bold text-success">
            Sign in
          </Link>
        </p>
      </div>
      <img
        src={House}
        alt="House Image"
        className=" w-50 rounded-left d-none d-md-block "
      />
    </div>
  );
};

export default SignupForm;
