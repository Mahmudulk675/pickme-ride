
// //////////////////////////////////////


import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react'
import firebaseConfig from "./firebase.config"
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
import './Login.css'

library.add( faGoogle ); 



if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}


function Login() {


    const history =useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/destination/2" } };
    // const [password,setPassword] = useState('');
    // const [confirmPassword,setConfirmPassword] = useState('');

  const [loggedInUser, setLoggedInUser] = useContext(UserContext) ;
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  // const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from)

    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(signedOutUser);
    }).catch(err => {
     
    });
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);

      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleInfoSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(newUserInfo.name);
        setLoggedInUser(newUserInfo)
      })
      .catch( error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        newUserInfo.isSignedIn= true;
        newUserInfo.name= user.name;
        setUser(newUserInfo);
        updateUserName(newUserInfo.name);
        setLoggedInUser(newUserInfo);
        history.replace(from )
        console.log('user info' ,res);
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault();
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      
     
      
      {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/> */}
      <label htmlFor="newUser"> Sign up or Log in</label> 
       <form  className="inputForm" onSubmit={handleInfoSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input  className="password" type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        {newUser && <input  className="ConfirmPassword" type="password" name="ConfirmPassword" onBlur={handleBlur} placeholder=" Confirm Your Password" required/>}

        <br/>
        {newUser&& <input type="checkbox" value="remember me"/> } {newUser && <p>remember me</p>}
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
        <br/>
        <p onClick={() => setNewUser(!newUser)} name="newUser" id="">{newUser? `Already have a account? Login` : `Dont have a account? Creat a new`}</p>
      </form>

    

      <br/><br/>
      { user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sign In With Google</button>
      }
      
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;







