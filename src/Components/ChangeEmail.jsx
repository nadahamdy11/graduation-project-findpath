import { useRef, useEffect, useState } from "react";
import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangeEmail({ userData }) {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
  {
    /*Email*/
  }
  const [validEmail, setValidEmil] = useState(false);
  const [emailFocus, setEmailFoucs] = useState(false);
  {
    /*Email*/
  }
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmil(result);
  }, [email]);

  const handleUpdateEmail = async (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to update your email address?"
    );
    if (!userConfirmed) {
      return; // User canceled the action
    }
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "https://smart-shipment-system.vercel.app/api/v1/users/updateMe",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Email update initiated successfully");
      setMessage(
        "An OTP has been sent to your new email address. Please enter it below to confirm the change."
      );
      setOtpSent(true);
    } catch (error) {
      if (error.response) {
        console.error("Error updating email:", error.response.data);
        setMessage("Error updating email: " + error.response.data.message);
      } else {
        console.error("Network error:", error.message);
        setMessage("Network error: " + error.message);
      }
    }
  };
  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://smart-shipment-system.vercel.app/api/v1/users/confirmAccount",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "OTP verified and email updated successfully:",
        response.data
      );
      setMessage("Your email has been updated successfully.");
      alert("Your session has expired. ");
      navigate("/signin")
    } catch (error) {
      if (error.response) {
        console.error("Error verifying OTP:", error.response.data);
        setMessage("Error verifying OTP: " + error.response.data.message);
      } else {
        console.error("Network error:", error.message);
        setMessage("Network error: " + error.message);
      }
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleUpdateEmail}>
          <label htmlFor="email">
            New Email Address:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>
          <input
            class="form-control"
            type="email"
            id="email"
            name="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uid"
            onFocus={() => setEmailFoucs(true)}
            onBlur={() => setEmailFoucs(false)}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
            Uppercase and lowercase letters in English (A-Z, a-z)
            <br />
            Must begin with @ A period (.)+com or net or org
            <br />
            Examples: nadahamdy@domainsample.com
          </p>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "black",
              color: "#F9F7F7",
              borderRadius: "50px",
              fontSize: "20px",
              marginTop: "30px",
            }}
          >
            Update Email
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            class="form-control"
            ref={userRef}
            autoComplete="off"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
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
              marginTop: "30px",
            }}
          >
            Confirm Email
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangeEmail;
