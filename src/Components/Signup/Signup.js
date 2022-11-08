import React,{useContext, useState, useEffect} from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import {useHistory} from 'react-router-dom'
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [formErrors,setFormErrors] = useState({})
  const [isSubmit,setIsSubmit] = useState(false)
  const {firebase} = useContext(FirebaseContext)

  const singnUpData ={
    username,
    email,
    phone,
    password
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(singnUpData,'signupdata');
    // setFormErrors(validateForm(singnUpData));
    let error = validateForm(singnUpData)
    setFormErrors(error)
    setIsSubmit(true)
    console.log(Object.keys(error),'pppppp');
    console.log(isSubmit,'yyyyyy');
    if(Object.keys(error).length== 0){
      console.log('reached in');
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
      })
      }).then(()=>{
        history.push('/login')
      })
    }).catch((err)=>{
      error.email = err.message;
      setFormErrors(error)
      console.log(err.message);
      console.log(error);
    })
  }
}

  useEffect(()=>{

    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(FormData);
    }
  },[formErrors])

  const validateForm=(values)=>{

    const errors ={};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userRegex = /^[A-Za-z0-9_-]{3,15}$/

    if(!values.username){
      errors.username = "Username is required"
    }else if(!userRegex.test(values.username)){
      errors.username= 'Enter a valid username'
    }

    if(!values.email){
      errors.email = "email is required"
    }else if(!regex.test(values.email)){
      errors.email='Enter a valid email'
    }

    if(!values.phone){
      errors.phone = "phone is required"
    }else if(values.phone.length != 10){
      errors.phone = "phone must be 10 digits"
    }
    if(!values.password){
      errors.password = "password is required"
    }else if(values.password.length <6){
      errors.password ='Password must be more than 6 characters'
    }else if(values.password.length >10){
      errors.password ='Password cannot exceed more than 10 characters'
    }

    return errors;
    
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          
          <p className='error'>{formErrors.username}</p>
         
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John@gmail.com"
            
          />
          
          <p className='error'>{formErrors.email}</p>
          
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="98514252"
            
          />
          
          <p className='error'>{formErrors.phone}</p>
        
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
           
          />
          
          <p className='error'>{formErrors.password}</p>
          
          <button>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
