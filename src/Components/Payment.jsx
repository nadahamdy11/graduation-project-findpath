import { useTranslation } from "react-i18next";
import style from "../Styles/StartShipment.module.css";
import visa from "../Assets/visa.png";
import card from "../Assets/card.png";
import CVC from "../Assets/cvc.png";
import { background } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Payment() {
  const [Data, setData] = useState({
    cardNumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });

    console.log("data", Data);
  };

  const { orderId } = useParams();
  console.log(orderId);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expire, setExpire] = useState("");

  console.log(userData);
  const { t, i18n } = useTranslation();
  const handlePaymentSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://smart-shipment-system.vercel.app/api/v1/client/order/${orderId}/checkout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Payment successful", response.data);
      } else {
        console.error("Payment failed", response.data);
      }
    } catch (error) {
      console.error("Error during payment", error);
    }
  };

  return (
    <div className="container">
      <div className={`row ${style.paymentRow}`}>
        <div
          className="col-md-6 p-4"
          style={{
            backgroundColor: "rgba(0,0,0,.1)",
            boxSizing: "border-box",
            borderRadius: "30px 0px 0px 30px",
          }}
        >
          <h3
            className="mt-4 pb-2"
            style={{
              color: "black",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              marginBottom: "30px",
            }}
          >
            Details
          </h3>
          <div style={{ marginBottom: "40px" }}>
            <p style={{ display: "flex" }}>
              <h6>Name : </h6> {userData.name}
            </p>
            <p style={{ display: "flex" }}>
              <h6>Email : </h6> {userData.email}
            </p>
            <p style={{ display: "flex" }}>
              <h6>phone : </h6> {userData.phone}
            </p>
          </div>
          <hr />
          <div style={{ marginTop: "40px" }}>
            <h6 style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tax </span>
              <span>$0.00</span>
            </h6>
            <h6
              className="mt-4"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Total </span>
              <span>$0.00</span>
            </h6>
          </div>
        </div>
        <div className={`col-md-6  p-4 ${style.paymentDetails}`}>
          <h3
            className="mt-4"
            style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
          >
            <span
              style={{
                color: "black",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              }}
            >
              {" "}
              Easy ,fast and safe
            </span>{" "}
            payments
          </h3>
          <form onSubmit={handlePaymentSubmit} className={style.paymentform}>
            <div className="form-group">
              <div className={style.inputbox}>
                <label htmlFor="Cardnumber">{t("Cardnumber")}</label>
                <input
                  type="text"
                  id="Cardnumber"
                  name="Cardnumber"
                  placeholder="1234 1234 1234 1234"
                  className={`${style.paymentinput} `}
                  style={{
                    backgroundImage: `url(${visa}),url(${card}) `,
                    backgroundSize: "50px 50px ,60px 35px",
                    backgroundRepeat: "no-repeat ",
                    backgroundPosition: "97% ,78%",
                  }}
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>
            <div className={`${style.Expiration} form-group`}>
              <div className={style.inputbox}>
                <label htmlFor="expiration">{t("Expiration")}</label>
                <input
                  type="text"
                  id="expiration"
                  name="expiration"
                  placeholder="MM/YY"
                  className={style.paymentinput}
                  required
                  value={expire}
                  onChange={(e) => setExpire(e.target.value)}
                />
              </div>
              <div className={style.inputbox}>
                <label htmlFor="CVC">CVC</label>
                <input
                  type="number"
                  id="CVC"
                  name="CVC"
                  placeholder="CVC"
                  className={`${style.paymentinput} ${CVC}`}
                  style={{
                    backgroundImage: `url(${CVC})`,
                    backgroundSize: "50px 50px ,60px 35px",
                    backgroundRepeat: "no-repeat ",
                    backgroundPosition: "97% , 90%",
                    appearance: "textfield",
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                  }}
                  required
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
            <button className={`${style.butn2} mt-5`} type="submit">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
