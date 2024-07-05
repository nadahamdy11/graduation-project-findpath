import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
{
  /*Email*/
}
const Changepassword = ({ userData }) => {
  const userRef = useRef();
  const [validEmail, setValidEmail] = useState(false);
const [emailFocus, setEmailFoucs] = useState(false);





  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://smart-shipment-system.vercel.app/api/v1/users/forgetPassword",
        { email: resetEmail }
      );
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
      await axios.patch(
        "https://smart-shipment-system.vercel.app/api/v1/users/resetPassword",
        {
          otp,
          password: newPassword,
          passwordConfirm: confirmPassword,
        }
      );
      setResetSuccess(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setErrMsg(errorMessage);
    }
  };
  {
    /*Email*/
  }
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = EMAIL_REGEX.test(resetEmail);
    setValidEmail(result);
  }, [resetEmail]);


  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPwd(result);
    const match = newPassword === confirmPassword;
    setValidMatch(match);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [newPassword, confirmPassword]);
  return (
    <>
      {!resetSuccess ? (
        <>
          <form onSubmit={handleResetEmailSubmit}>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !resetEmail ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              style={{
                padding: "12px 25px",
                border: "1px solid rgb(0,0,0,0.3)",
                borderRadius: "50px",
                width: "100%",
                marginBottom: "20px",
              }}
              class="form-control"
              id="email"
              name="email"
              ref={userRef}
              autoComplete="off"
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uid"
              onFocus={() => setEmailFoucs(true)}
              onBlur={() => setEmailFoucs(false)}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "#F9F7F7",
                borderRadius: "50px",
                fontSize: "20px",
                margin: 0,
              }}
            >
              Send OTP
            </button>
          </form>
          <form onSubmit={handleResetPassword}>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{
                padding: "12px 25px",
                border: "1px solid rgb(0,0,0,0.3)",
                borderRadius: "50px",
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <label htmlFor="password">
              New Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !newPassword ? "hide" : "invalid"}
              />
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
              style={{
                padding: "12px 25px",
                border: "1px solid rgb(0,0,0,0.3)",
                borderRadius: "50px",
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && confirmPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !confirmPassword ? "hide" : "invalid"}
              />
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
              style={{
                padding: "12px 25px",
                border: "1px solid rgb(0,0,0,0.3)",
                borderRadius: "50px",
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "#F9F7F7",
                borderRadius: "50px",
                fontSize: "20px",
                margin: 0,
              }}
            >
              Reset Password
            </button>
          </form>
        </>
      ) : (
        <p>Password reset successfully!</p>
      )}
    </>
  );
};

export default Changepassword;
