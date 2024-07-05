import { useRef, useEffect, useState } from "react";
import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Alert } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const ADDRESS_REGEX = /^[\d\w\s.,#-]+$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/gm;

function Editprofile({ userData, setEditProfile, setChildrenDrawer }) {
  const userRef = useRef();
  const errRef = useRef();

  // user name
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFoucs] = useState(false);
  const [image, setImage] = useState("");

  // address
  const [address, setAddress] = useState("");
  const [validAddress, setvalidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFoucs] = useState(false);

  // phone
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [PhoneFocus, setPhoneFoucs] = useState(false);

  // form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [success,setSuccess]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // user name validation
  useEffect(() => {
    const result = USER_REGEX.test(formData.name);
    console.log(result);
    setValidName(result);
  }, [formData.name]);

  // address validation
  useEffect(() => {
    const result = ADDRESS_REGEX.test(formData.address);
    console.log(result);
    setvalidAddress(result);
  }, [formData.address]);

  // phone validation
  useEffect(() => {
    const result = PHONE_REGEX.test(formData.phone);
    console.log(result);
    setValidPhone(result);
  }, [formData.phone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "https://smart-shipment-system.vercel.app/api/v1/users/updateImg",
        { profileImage: image },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update successful:", response.data);
       alert("Login again to see your updates");
    navigate("/signin"); 
    } catch (error) {
      console.error("Error updating Image:", error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "https://smart-shipment-system.vercel.app/api/v1/users/updateMe",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update successful:", response.data);
      alert("Login again to see your updates");
      navigate("/signin");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleImageChange}>
        <img
          src={userData.profileImage}
          width="50%"
          style={{ margin: "auto" }}
        />
        <label htmlFor="">Enter Image URL</label>
        <input
          className="form-control mt-3 mb-3"
          onFocus={() => setUserFoucs(true)}
          onBlur={() => setUserFoucs(false)}
          type="url"
          width="50%"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          ref={userRef}
          autoComplete="off"
          aria-describedby="uidnote"
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "black",
            width: "50%",
            borderRadius: "50px",
            margin: "auto",
            color: "white",
          }}
        >
          Change
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !formData.name ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFoucs(true)}
            onBlur={() => setUserFoucs(false)}
            value={formData.name}
            name="name"
            placeholder={userData.name}
          />
          <p
            id="uidnote"
            className={
              userFocus && formData.name && !validName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="phone" className="form-label">
            Phone Number
            <FontAwesomeIcon
              icon={faCheck}
              className={validPhone ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPhone || !formData.phone ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="text"
            id="phone"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            value={formData.phone}
            required
            aria-invalid={validPhone ? "false" : "true"}
            aria-describedby="uid"
            onFocus={() => setPhoneFoucs(true)}
            onBlur={() => setPhoneFoucs(false)}
            name="phone"
            placeholder={userData.phone}
          />
          <p
            id="uid"
            className={
              PhoneFocus && formData.phone && !validPhone
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
            11 number.
            <br />
            Must begin with a number.
            <br />
            Letters, numbers, underscores, hyphens not allowed.
          </p>
          <label htmlFor="address" className="form-label">
            Address
            <FontAwesomeIcon
              icon={faCheck}
              className={validAddress ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validAddress || !formData.address ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="text"
            id="address"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            value={formData.address}
            required
            aria-invalid={validAddress ? "false" : "true"}
            aria-describedby="uid"
            onFocus={() => setAddressFocus(true)}
            onBlur={() => setAddressFocus(false)}
            name="address"
            placeholder={userData.address}
          />
          <p
            id="uid"
            className={
              addressFocus && formData.address && !validAddress
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
            Please enter a valid address. Example: "123 Main St., Apt #4B, New
            York, NY 10001"
          </p>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#FFCD00",
            width: "100%",
            borderRadius: "50px",
          }}
        >
          Save
        </button>
      </form>
    </>
  );
}

export default Editprofile;