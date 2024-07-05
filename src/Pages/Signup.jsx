import { useRef, useEffect, useState } from "react";
import React from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imglogo from "../Assets/blacklogo.png";
import googleicon from "../Assets/google.png";
import delivery from "../Assets/signin.png"
import style from "../Styles/SignUp.module.css";
import '../index.css';
import { Link, useNavigate } from "react-router-dom";
import { AppleOutlined } from "@ant-design/icons";
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/gm;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

function Signup() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, phone, pwd, matchPwd, email]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validName || !validEmail || !validPhone || !validPwd || !validMatch) {
      setErrMsg('Invalid entry');
      return;
    }
    try {
      const response = await axios.post("https://smart-shipment-system.vercel.app/api/v1/users/signup", {
        name: user,
        email: email,
        phone: phone,
        password: pwd,
        passwordConfirm: matchPwd,
        role: "client"
      });
      console.log(response.data);
      setSuccess(true);
      setOtpSent(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else { setErrMsg('Signup Failed');}
      console.error("Error details:", err.response);
      errRef.current.focus();
    }
  };
  const handleConfirmAccount = async (e) => { e.preventDefault();
    try {
      const response = await axios.post("https://smart-shipment-system.vercel.app/api/v1/users/confirmAccount", {
        email: email,
        otp: otp
      });
      console.log(response.data);
      setSuccess(true);
      setOtp('');
      setUser('');
      setEmail('');
      setPhone('');
      setPwd('');
      setMatchPwd('');
      alert("Account confirmed successfully!");// Display success message and redirect to home page
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Account Confirmation Failed');
      }
      console.error("Error details:", err.response);
      errRef.current.focus();
    }
  };

  return (
    <div className="text-center" ref={userRef}>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className={style.flex}>
        <div className={style.firstform}>
          <img src={imglogo} alt="" />
          <h2>Sign Up</h2>
          {!otpSent ? (
            <form className={style.form} onSubmit={handleSignup}>
              {/* first name */}
              <label htmlFor="username" className={style.firstname}>
                User Name*
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Enter Your First Name"
                className={style.input}
              />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              {/* Email */}
              <label htmlFor="email" className={style.firstname}>
                Email*
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="Enter Your email"
                className={style.input}
              />
              <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                Uppercase and lowercase letters in English (A-Z, a-z)<br />
                Must begin with @ A period (.)+com or net or org<br />
                Examples: nadahamdy@domainsample.com
              </p>

              {/* phone number */}
              <label htmlFor="phonenum" className={style.lastname}>
                Phone Number*
                <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
              </label>
              <input
                type="text"
                id="phonenum"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
                placeholder="Enter Your phone number"
                className={style.input}
              />
              <p id="uidnote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                11 numbers.<br />
                Must begin with 01+ number from 0-9.<br />
                Ex: 01091545184
                Non alphabet characters are not allowed.
              </p>

              {/* password */}
              <label htmlFor="password" className={style.firstname}>
                Password*
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className={style.input}
                placeholder="Enter Your password"
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number, and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>

              {/* confirm password */}
              <label htmlFor="confirm_pwd" className={style.firstname}>
                Confirm Password*
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className={style.input}
                placeholder="Confirm password"
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              {/* submit */}
              <button className={style.nextbutton} disabled={!validName || !validEmail || !validPhone || !validPwd || !validMatch}>
                Create an account
              </button>
            </form>
          ) : (
            <form className={style.form} onSubmit={handleConfirmAccount}>
              <label htmlFor="otp" className={style.firstname}>
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
                className={style.input}
                placeholder="Enter OTP"
              />
              <button className={style.nextbutton}>
                Confirm Account
              </button>
            </form>
          )}
          <p className={style.or}>___ Or sign in with ___</p>
          <div className={style.flex}>
            <button className={style.googlebtn}>
              <img src={googleicon} alt="" className={style.googleicon} />
              Google
            </button>
            <button className={style.googlebtn}>
              <AppleOutlined style={{ marginRight: "10px", fontSize: "20px", textAlign: "center" }} />
              Apple ID
            </button>
          </div>
          <p className={style.or}>Already have an account? <Link to="/signin" style={{ textDecorationLine: "underline", color: "black" }}>Sign in</Link></p>
        </div>

        <div className={style.secondimg}>
          <img src={delivery} alt="" style={{ width: "100%" }} className={style.deliveryimg} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
