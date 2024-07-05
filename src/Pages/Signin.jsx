import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Styles/SignIn.module.css";
import google from "../Assets/google.png";
import photo from "../Assets/signin.png";
import logo from "../Assets/blacklogo.png";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Result } from 'antd';


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signin = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [matchFocus, setMatchFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [user, setUser] = useState();


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPwd(result);
    const match = newPassword === confirmPassword;
    setValidMatch(match);
  }, [newPassword, confirmPassword]);


  useEffect(() => {
    setErrMsg('');
  }, [newPassword, confirmPassword]);
  const handleSignin = async (e) => {
    e.preventDefault();

    login(email, pwd);
  }

  useEffect(() => {
    console.log('user.data', user?.data);
    if (user) {
      if ((user?.data.data.user) && user?.data.data.user.role === 'admin') {
        navigate('/dashboard')
      }
      else {
        navigate("/");
      }
    }
  }, [user])


  const login = async (email, pwd) => {
    try {
      const res = await axios.post("https://smart-shipment-system.vercel.app/api/v1/users/login",
        { email, password: pwd });
      const token = res.data.token;
      const user = res.data.data.user;
      console.log('user', user);// assuming the response contains user details
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));// Store user as JSON string
      setUser(res); // Update the user state in App component

    } catch (err) {
      setErrMsg("Login failed. Please try again.");
    }
  };

  const handleResetEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://smart-shipment-system.vercel.app/api/v1/users/forgetPassword", { email: resetEmail });
      setErrMsg("OTP sent to your email.");
    } catch (error) {
      setErrMsg("Failed to send OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }
    try {
      await axios.patch("https://smart-shipment-system.vercel.app/api/v1/users/resetPassword", {
        otp,
        password: newPassword,
        passwordConfirm: confirmPassword
      });
      setResetSuccess(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      setErrMsg(errorMessage);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-md-5 mt-4" style={{ paddingLeft: "10%" }}>
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="text-center">
              <img src={logo} alt="logo" width="75px" height="117px" />
              <p style={{ fontWeight: "bold", fontSize: "32px", marginBottom: 0 }}>Sign In</p>
              <p>Welcome back! Please enter your details.</p>
            </div>
            {!showResetForm ? (
              <form onSubmit={handleSignin}>
                <label htmlFor="email" style={{ fontWeight: "bold" }}>
                  Email*
                </label>
                <br />
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="Enter Your email"
                  style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%", marginBottom: "20px" }}
                />

                <label htmlFor="password" style={{ fontWeight: "bold" }}>
                  Password*

                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Enter Your Password"
                  style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%" }}
                />

                <p className="p-2" onClick={() => setShowResetForm(true)} style={{ cursor: "pointer", color: "#FDB706" }}>Forget your password?</p>
                <button style={{ width: "100%", backgroundColor: "black", color: "#F9F7F7", borderRadius: "50px", fontSize: "20px", margin: 0 }}>Sign In</button>
              </form>
            ) : (
              <div>
                {!resetSuccess ? (
                  <>
                    <form onSubmit={handleResetEmailSubmit}>
                      <label>Email:</label>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%", marginBottom: "20px" }}
                      />
                      <button type="submit" style={{ width: "100%", backgroundColor: "black", color: "#F9F7F7", borderRadius: "50px", fontSize: "20px", margin: 0 }}>Send OTP</button>
                    </form>
                    <form onSubmit={handleResetPassword}>
                      <label>OTP:</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%", marginBottom: "20px" }}
                      />
                      <label htmlFor="password">New Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !newPassword ? "hide" : "invalid"} />
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="Enter new password"
                        aria-describedby="pwdnote"

                        style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%", marginBottom: "20px" }}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                      <label htmlFor="confirm_pwd" >Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && confirmPassword ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !confirmPassword ? "hide" : "invalid"} />
                      </label>
                      <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        placeholder="Confirm password"

                        style={{ padding: "12px 25px", border: "1px solid rgb(0,0,0,0.3)", borderRadius: "50px", width: "100%", marginBottom: "20px" }}
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                      </p>

                      <button type="submit" style={{ width: "100%", backgroundColor: "black", color: "#F9F7F7", borderRadius: "50px", fontSize: "20px", margin: 0 }}>Reset Password</button>
                    </form>
                  </>
                ) : (
                  <Result
                  status="success"
                  title="Password reset successfully!"
                  />
                )}
                <button onClick={() => setShowResetForm(false)} style={{ width: "100%", backgroundColor: "black", color: "#F9F7F7", borderRadius: "50px", fontSize: "20px", marginTop: "20px" }}>Back to Sign In</button>
              </div>
            )}
            <p>
              Don't have an account? <Link to="/Signup" style={{ textDecoration: "none", color: "#FDB706" }}><span className="line">Sign up</span></Link>
            </p>
          </section>
        </div>
        <div className={styles.photo}>
          <img src={photo} alt="" width="80%" className={styles.img} />
        </div>
      </div>
    </div>
  );
}

export default Signin;
