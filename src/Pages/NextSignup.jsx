/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import React from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imglogo from "../Assets/blacklogo.png";
import googleicon from "../Assets/google.png";
import delivery from "../Assets/signin.png"
import style from "../Styles/SignUp.module.css";
import '../index.css';
import { Link } from "react-router-dom";
import {
    AppleOutlined, LeftOutlined
} from "@ant-design/icons";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/gm;
const EMAIL_REGEX=     /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
function NextSignup() {
    const userRef = useRef();
    const errRef = useRef();

    {/*Email*/ }
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFoucs] = useState(false);


    {/*user password*/ }
    const [pwd, setPwd] = useState('');
    const [validPwd, setvalidPwd] = useState(false);
    const [pwdFocus, setpwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setvalidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    {/*message*/ }
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    {/*email*/ }
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);

    }, [email])
    



    {/*password*/ }

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setvalidPwd(result);
        const match = pwd === matchPwd;
        setvalidMatch(match);

    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');

    }, [email, pwd, matchPwd])



    return (

        <div className=" text-center" ref={userRef}>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className={style.flex}>
                {/*Form*/}
                <div className={style.firstform}>
                    <Link to="/signup"><LeftOutlined style={{ color: "black", fontSize: "30px", }} /></Link>

                    <img src={imglogo} alt="" />
                    <h2>Sign Up</h2>
                    <form className={style.form}>
                        {/*Email*/}
                        <label htmlFor="username" className={style.firstname}>
                            Email*
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFoucs(true)}
                            onBlur={() => setEmailFoucs(false)}
                            placeholder="Enter Your email"
                            className={style.input}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{ Color: "red" }} />
                            Uppercase and lowercase letters in English (A-Z, a-z)<br />
                            Must begin with @ A period (.)+com or net or org<br />
                            Examples : nadahamdy@domainsample.com

                        </p>

                        {/*password*/}
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
                            onFocus={() => setpwdFocus(true)}
                            onBlur={() => setpwdFocus(false)}
                            className={style.input}
                            placeholder="Enter Your password"
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                         {/*confirm password*/}
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
                            placeholder="confirm password"
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>


                        {/*next*/}
                        <Link  to="/" style={{marginTop:"10px",padding:"10px"}} className={style.nextbutton} disabled={!validEmail || !validPwd || !validMatch ? true : false}> Create an account</Link>

                        <p className={style.or}>___ Or sign in with ___</p>
                        <div className={style.flex}>
                            <button className={style.googlebtn} >
                                <img src={googleicon} alt="" className={style.googleicon} />
                                Google
                            </button>
                            <a className={style.googlebtn} >
                                <AppleOutlined style={{ marginRight: "10px", fontSize: "20px", textAlign: "center" }} />
                                Apple ID
                            </a>
                        </div>
                        <p className={style.or}>Already have an account ? <Link to="/signin"
                            style={{ textDecorationLine: "underline", color: "black" }}>Sign in</Link></p>
                    </form>
                </div>

                {/*image*/}
                <div className={style.secondimg}>
                    <img src={delivery} alt="" className={style.deliveryimg} />
                </div>
            </div>

        </div>
    )
}

export default NextSignup;
