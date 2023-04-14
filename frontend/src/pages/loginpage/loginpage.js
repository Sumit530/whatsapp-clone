import React, { useState } from 'react'
import "./loginpage.css"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Loginpage = () => {
    const Navigate = useNavigate()
    const [cookie,setcookie] =  useCookies()
    const [user,setuser] = useState({
        username:"",
        phone:"",
        name:""
    })
    const loginhandlechange = (e) =>{
        setuser({...user,[e.target.name]:e.target.value})
    }
   const signinhandlechange = (e) =>{
    setuser({...user,[e.target.name]:e.target.value})
   }

   const handleregister = async(e) =>{
    e.preventDefault()
    const form = new FormData()
    form.append("username",user.username)
    form.append("phone",user.phone)
    form.append("name",user.phone)
    const data = await fetch(`${window.path}/register`,{
        method:"post",
        body:form
    })
    const res = await data.json()
    if(res.status == 1){
        setcookie("userid", res.data._id, {
            path: "/",
            maxAge:2592000
          });
           // sessionStorage.setItem("auth",resdata.cb)
           Navigate("/chat")
    }
   }
   const handlelogin = async(e) =>{
    e.preventDefault()
    const form = new FormData()
    form.append("username",user.username)
    form.append("phone",user.phone)
    const data = await fetch(`${window.path}/login`,{
        method:"post",
        body:form
    })
    const res = await data.json()
    if(res.status == 1){
        // setcookie("userid", res.data._id, {
        //     path: "/",
        //     maxAge:2592000
        //   });
            sessionStorage.setItem("auth",res.data[0]._id)
           Navigate("/chat")
    }

   }
    return (
    <>
    
            
            
            
    <h2>Chat App</h2>
    <div className='body'>

    
<div class="container " id="container">
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" onChange={signinhandlechange} value={user.name} name = "name" />
			<input type="email" placeholder="Email" onChange={signinhandlechange} value={user.username} name = "username" />
			<input type="password" placeholder="Password" onChange={signinhandlechange} value={user.phone} name = "phone" />
			<button onClick={handleregister} >Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
            <input type="email" placeholder="username" onChange={loginhandlechange} value={user.username} name = "username"/>
			<input type="password" placeholder="phone" onChange={loginhandlechange} value={user.phone} name = "phone" />
			<a href="#">Forgot your password?</a>
            <button onClick={handlelogin} >Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={()=>{document.getElementById("container").classList.toggle("right-panel-active")}}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={()=>{document.getElementById("container").classList.toggle("right-panel-active")}} >Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>

    </>
  )
}

export default Loginpage