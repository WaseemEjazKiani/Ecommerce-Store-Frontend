import React, { Fragment , useRef, useState, useEffect} from 'react'
import "./LoginSignUp.css";
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import FaceIcon from '@mui/icons-material/Face';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useDispatch,useSelector} from "react-redux"
import {login,clearErrors,register} from "./../../actions/userAction";
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom";


const LoginSignUp = () => {
                                        // Preparing Ground for Redux Use
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated } = useSelector((state)=>state.user);
    const history = useNavigate();
                                        // Error Ouput
    const alert = useAlert();

                                        // States Decleration
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    
                                        // POSTING ERROR 
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            history("/account");
        }
    },[dispatch,error,isAuthenticated]);

                                        // Login Form and SignUp form SWAPING
    const loginTab = useRef(null);
    const switcherTab = useRef(null);
    const registerTab = useRef(null);
    
    const switchTabs = (e, tab) => {
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
    };

const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
})

const {name , email, password}= user;

const [avatar, setAvatar] = useState()

const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
    

const loginSubmit = (e)=>{
    
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))    
}
    
    const registerSubmit =(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar); 
        dispatch(register(myForm))
    }


    const registerDataChange = (e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            
            reader.readAsDataURL(e.target.files[0]);

        }else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }


  return (
    <Fragment>
        {loading?<Loader/>:(<div className='LoginSignupContainer'>
            <div className='LoginSignupBox'>
                <div>
                    <div className='Login-Signup-toggle'>
                    <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <EmailIcon />
                                <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e)=> setLoginEmail(e.target.value)}
                                />
                            </div>

                            <div className='loginPassword'>
                                <LockOpenIcon/>
                                <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e)=> setLoginPassword(e.target.value)}
                                />
                            </div>
                        
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className='loginBtn'/>
                </form>

                <form 
                className='signupForm'
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                >
                        <div className='signupName'>
                            <FaceIcon/>
                            <input 
                            type="text"
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={registerDataChange}
                            />
                        </div>

                        <div className='signupEmail'>
                        <EmailIcon />
                        <input 
                            type="email"
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={registerDataChange}
                            />
                        </div>

                        <div className='signupPassword'>
                        <LockOpenIcon/>
                        <input 
                            type="password"
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={registerDataChange}
                            />
                        </div>

                        <div id='registerImage'>
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                            type="file"
                            name='avatar'
                            accept='image/*'
                            onChange={registerDataChange}
                            />         
                        </div>
                        <input
                        type="submit"
                        value="Register"
                        className='signupBtn'
                        />

                </form>


            </div>
        </div>)}
    </Fragment>

  )
}

export default LoginSignUp