import React, { useEffect, useState, useRef } from "react";
import style from "../Styles/StartShipment.module.css";
import location from "../Assets/location.png";
import location2 from "../Assets/bxs_map.png";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import axios from "axios";
import "animate.css";
import { useTranslation } from "react-i18next";
import { Avatar, Space } from "antd";
import { UserOutlined, CarOutlined } from "@ant-design/icons";
import lottie from "lottie-web";
import animationData from "../Assets/Animation2.json"; // Replace with the path to your JSON file
import From from "../Assets/ui.png";
import To from "../Assets/loc.png";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
  width: "82vw",
  height: "160vh",
  position: "relative",
};

const extractGovernorate = (addressComponents) => {
  const component = addressComponents.find((component) =>
    component.types.includes("administrative_area_level_1")
  );
  if (component) {
    let governorateName = component.long_name;
    // Remove "Governorate" from the name if it exists
    governorateName = governorateName.replace(/ Governorate$/, "").trim();
    return governorateName;
  }
  return "Unknown Governorate";
};

export default function Map() {


  const { t, i18n } = useTranslation();


  const URL =
    "https://smart-shipment-system.vercel.app/api/v1/client/order/createOrder";
  const [Data, setData] = useState({
    type: "",
    recipentName: "",
    reciepentPhone: "",
    senderName: "",
    senderPhone: "",
    startLoc: { type: "Point", coordinates: [] },
    currentLoc: { type: "Point", coordinates: [] },
    endLoc: { type: "Point", coordinates: [] },
    endLocation: "",
    startLocation: "",
    weight: "",
    quantity: "",
    description: "",
    price: "",
  });

  {
    /*animation*/
  }
  const container = useRef(null);
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      animationData: animationData,
      loop: true,
      autoplay: true,
    });
    return () => {
      anim.destroy(); // Cleanup animation instance when component unmounts
    };
  }, []);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit startLocation to 8 characters
    if (name === "startLocation" && value.length > 9) {
      return;
    }
    setData({
      ...Data,
      [name]: value,
    });

    console.log("data", Data);
  };

  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject(new Error("Geocoding failed: " + status));
        }
      });
    });
  };
  
  const[price,setPrice]=useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const endLocationCoordinates = await geocodeAddress(Data.endLocation);
      Data.endLoc.coordinates = [
        endLocationCoordinates.lat,
        endLocationCoordinates.lng,
      ];

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Data),
      });
      const result = await response.json();
      if (result.data && result.data.order._id) {
        setOrderId(result.data.order._id); // Store the order ID
        console.log(orderId);
        navigate(`/startshipment/${result.data.order._id}`);
      }
      // Fetch nearest deliveries after order creation
      fetchFindPath(Data.startLocation, Data.endLocation);
      // fetchNearestDeliveries(
      //   Data.startLoc.coordinates.join(","),
      //   Data.endLocation
      // );
      fetchAllNearestDeliveries(Data.startLoc.coordinates.join(","))
          setPrice(result.data.order.price);
      console.log(result);
      setRecommend((recommend) => !recommend);
      console.log("recommend", recommend);
    } catch (error) {
      console.error("There was an error creating the order!", error);
    }
  };

  // find path
  const [findPath, setFindPath] = useState([]);
  const fetchFindPath = (startLocation, endLocation) => {
    axios
      .get(
        `https://smart-shipment-system.vercel.app/api/v1/client/order/findPath`,
        {
          params: {
            orderStartState: startLocation.toLowerCase(),
            orderEndState: endLocation.toLowerCase(),
          },
        }
      )
      .then((response) => {
        console.log(
          "find path deliveries fetched",
          response.data.data.deliveries
        );
        setFindPath(response.data.data.deliveries);
      })
      .catch((error) => console.error("Error fetching path deliveries", error));
  };

  // nearest delivery
  const [nearestDeliveries, setNearestDeliveries] = useState([]);
  console.log("nearestDeliveries", nearestDeliveries);
  const fetchNearestDeliveries = (startLocation, endLocation) => {
    const maxDis = 10000000;
    axios
      .get(
        "https://smart-shipment-system.vercel.app/api/v1/client/order/nearestDelivery",
        {
          params: {
            startLocation,
            endLocation,
            maxDis,
          },
        }
      )
      .then((response) => {
        console.log(
          "Nearest deliveries fetched",
          response.data.data.deliveries
        );
        setNearestDeliveries(response.data.data.deliveries);
      })
      .catch((error) =>
        console.error("Error fetching nearest deliveries", error)
      );
  };

  const [allNearestDelivery, setAllNearestDelivery] = useState([]);
  console.log("All NearestDeliveries", nearestDeliveries);

  console.log("nearestDeliveries", allNearestDelivery);
  const fetchAllNearestDeliveries = (currentLocation) => {
    const maxDis = 10000000;
    axios
      .get("https://smart-shipment-system.vercel.app/api/v1/client/order/nearestUnOrganizedDelivery",
        {
          params: {
            currentLocation,
            maxDis,
          },
        }
      )
      .then((response) => {
        const deliveries = response.data.data.deliveries;
        const limitedDeliveries = deliveries.slice(0, 2); // Change 2 to your desired limit
        setAllNearestDelivery(limitedDeliveries);

        console.log("ALL Nearest deliveries fetched", deliveries);
      })
      .catch((error) =>
        console.error("Error fetching all nearest deliveries", error)
      );
  };

  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [recommend, setRecommend] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderId, setOrderId] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  console.log(lat);
  Data.startLoc.coordinates = [lat, lon];
  Data.currentLoc.coordinates = [lat, lon];
  console.log("delivery", selectedDelivery);
  const [address, setAddress] = useState("");
  console.log("address", address);

  const center = {
    lat: lat,
    lng: lon,
  };

  const handleConvert = () => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lon) };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const fullAddress = results[0].formatted_address;
          setAddress(fullAddress);

          // Extract governorate and update startLocation
          const governorate = extractGovernorate(results[0].address_components);
          // Remove "Governorate" from the name if it exists
          const startLocationWithoutGovernorate = governorate
            .replace(/ Governorate$/, "")
            .trim();
          setData((prevData) => ({
            ...prevData,
            startLocation: startLocationWithoutGovernorate,
          }));
        } else {
          setAddress("No results found");
        }
      } else {
        setAddress("Geocoder failed due to: " + status);
      }
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDwAKZ3cPqdVhu_QjMjxb492NTHDMxpMQU",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const deliveryIds = [
    ...findPath.map((delivery) => delivery._id),
    ...allNearestDelivery.map((delivery) => delivery._id),
  ];
  console.log("deliveryIds####",deliveryIds);

  const handleAccept = async () => {
     // Collect all delivery IDs from both arrays
     try {

    const deliveryIds = [
    ...findPath.map((delivery) => delivery._id),
    ...allNearestDelivery.map((delivery) => delivery._id),
  ];
  console.log("deliveryIds####",deliveryIds);
    
      const token = localStorage.getItem("token");
     // const deliveryId = delivery.deliveryPerson._id;
      const acceptPromises = deliveryIds.map((deliveryId) =>
           axios.patch(
        `https://smart-shipment-system.vercel.app/api/v1/delivery/order/${orderId}/assignToMe?delivery=${deliveryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    await Promise.all(acceptPromises);
    handlePaymentSubmit();
    console.log("All deliveries accepted successfully");

  } catch (error) {
    console.error("Error accepting deliveries", error);
  }
};
  const handlePaymentSubmit = async () => {

    const token = localStorage.getItem("token");
    try {
      const postResponse = await axios.post(
        `https://smart-shipment-system.vercel.app/api/v1/client/order/${orderId}/checkout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (postResponse.status === 200) {
        console.log("Payment successful", postResponse.data.data);
        window.location.href = postResponse.data.data.url;

        setTimeout(() => {
          window.location.href = 'http://localhost:5173/';
        }, 3000);   
      }
      try {
        const response = await axios.patch(
          `https://smart-shipment-system.vercel.app/api/v1/client/order/${orderId}/success`
        );
        console.log("Order status updated successfully:", response.data.data);
        // Show success message or navigate to success page
        // Navigate or show confirmation
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };



  return (
    <div className={style.mapContainer}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        console.log({lat}, {lon})
        <MarkerF onLoad={onLoad} position={{ lat: lat, lng: lon }} />
      </GoogleMap>

      <h3
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "black",
          paddingLeft: "45%",
          marginTop: "20px",
        }}
      >
        {t("Shipment")}
      </h3>

      <form className={style.form} onSubmit={handleSubmit}>
        {/* sender name*/}
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="senderName" className={style.productweight}>
              {t("sendername")}
            </label>
            <input
              type="text"
              placeholder={t("placesename")}
              className={style.allinputsize}
              onChange={handleChange}
              id="senderName"
              value={Data.senderName}
              name="senderName"
            />
          </div>
        </div>
        {/* sender phone*/}
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="senderPhone" className={style.productweight}>
              {t("senderphone")}
            </label>
            <input
              type="number"
              id="senderPhone"
              name="senderPhone"
              placeholder={t("placesephone")}
              className={style.numericalinput}
              onChange={handleChange}
              value={Data.senderPhone}
            />
          </div>
        </div>

        {/* recipient Name*/}
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="recipentName" className={style.productweight}>
              {t("rename")}
            </label>
            <input
              type="text"
              placeholder={t("placesename")}
              className={style.allinputsize}
              onChange={handleChange}
              id="recipentName"
              name="recipentName"
              value={Data.recipentName}
            />
          </div>
        </div>
        {/* recipient phone*/}
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="reciepentPhone" className={style.productweight}>
              {t("rephone")}
            </label>
            <input
              type="number"
              id="reciepentPhone"
              name="reciepentPhone"
              placeholder={t("placesephone")}
              className={style.numericalinput}
              onChange={handleChange}
              value={Data.reciepentPhone}
            />
          </div>
        </div>

        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="from">
              <img
                src={location}
                alt=""
                className={style.locationimg}
                onClick={handleConvert}
              />
            </label>
            <input
              type="text"
              value={address}
              id="from"
              name="from"
              placeholder={t("from")}
              className={style.allinputsize}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="endLocation">
              <img src={location2} alt="" className={style.locationimg} />
            </label>
            <input
              type="text"
              placeholder={t("to")}
              className={style.allinputsize}
              id="endLocation"
              name="endLocation"
              value={Data.endLocation}
              onChange={(e) => {
                setData({ ...Data, endLocation: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="weight" className={style.productweight}>
              {t("prweight")}
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="1 bs = 0.5845 kg"
              className={style.numericalinput}
              onChange={handleChange}
              value={Data.weight}
            />
          </div>
        </div>

        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="type" className={style.productweight}>
              {t("prtype")}
            </label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder={t("type")}
              className={style.allinputsize}
              onChange={handleChange}
              value={Data.type}
            />
          </div>
        </div>
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="quantity" className={style.productweight}>
              {t("Quantity")}
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder={t("qu")}
              className={style.numericalinput}
              onChange={handleChange}
              value={Data.quantity}
            />
          </div>
        </div>
        <div className="form-group">
          <div className={style.inputbox}>
            <label htmlFor="description" className={style.productweight}>
              {t("Description")}
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder={t("de")}
              className={style.numericalinput}
              onChange={handleChange}
              value={Data.description}
            />
          </div>
        </div>
        <button className={style.butn} type="submit">
          {t("createorder")}
        </button>
      </form>

      {recommend && (
        <div className={style.nearestDeliveries}>
          <div className={style.modalContent}>
            <h3 style={{ color: "black" }}>Deliveries</h3>
            <h6 className={style.cost}>cost is {price}</h6>

            <div>
              {[...findPath, ...allNearestDelivery].map((delivery, index) => {
                const isFindPath = findPath.includes(delivery);
                const name = isFindPath ? delivery.deliveryPerson.name : delivery.name;
                const phone = isFindPath ? delivery.deliveryPerson.phone : delivery.phone; // Assuming phone is available in both
                const time = delivery.time;  // Assuming time is available in both
                const vehicleType = isFindPath ? delivery.deliveryPerson.vehicleType : delivery.vehicleType; // Assuming vehicleType is available in both
                const duration = delivery.duration// Assuming duration is available in both
                const startState = isFindPath ? delivery.startState : delivery.currentState.coordinates.join(","); // Assuming startState is available in both
                const endState = delivery.endState; // Assuming endState is available in both
                const vehicleLicenseImg = isFindPath ? delivery.deliveryPerson.profileImage : delivery.vehicleLicenseImg;

                return (
                  <div key={index} className={style.deliveryOption}>
                    <div className={style.flex}>
                      <Space size={18} wrap>
                        <Avatar
                          style={{
                            backgroundColor: "#87d068",
                            margin: "8px",
                          }}
                          icon={<UserOutlined />}
                        />
                      </Space>
                      <span
                        style={{
                          marginTop: "3%",
                          fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                          fontSize: "15px",
                          fontWeight: 600,
                        }}
                      >
                        {name}
                      </span>

                      <span
                        style={{
                          marginLeft: "20%",
                          marginTop: "3%",
                          fontSize: "15px",
                          fontWeight: 600,
                          fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                        }}
                      >
                        {time}
                      </span>
                    </div>
                    <span
                      style={{
                        marginTop: "3%",
                        marginLeft: "5%",
                        fontFamily:
                          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                      }}
                    >
                      {phone}
                    </span>
                    <div className={style.flex}>

                      <span
                        style={{
                          marginLeft: "5%",
                          marginTop: "5%",
                          fontSize: "17px",
                          fontWeight: 600,
                          fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                        }}
                      >
                        {vehicleType}
                      </span>
                      <div
                        ref={container}
                        style={{
                          height: 100,
                          marginLeft: "17%",
                          marginTop: "-5%",
                        }}
                      ></div>
                      <span
                        style={{
                          marginLeft: "15%",
                          marginTop: "5%",
                          fontSize: "15px",
                          fontWeight: 600,
                          fontFamily:
                            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                        }}
                      >
                        {duration}
                      </span>
                      <img src={vehicleLicenseImg} style={{ width: "60px", height: "60px", border: "0px", marginLeft: "20%" }} alt="" />
                    </div>

                    <div className={style.flex}>
                      <div className={style.flexcoulmn}>
                        <img
                          src={From}
                          alt="from"
                          style={{
                            marginLeft: "30%",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                        <span
                          style={{
                            marginTop: "2%",
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily:
                              "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                          }}
                          onClick={handleConvert}
                        >
                          {startState}
                        </span>
                      </div>
                      <div className={style.flexcoulmn2}>

                        {isFindPath && (
                          <img
                            src={To}
                            alt="to"
                            style={{
                              marginLeft: "30%",
                              width: "25px",
                              height: "30px",
                            }}
                          />)}
                        <span
                          style={{
                            marginTop: "2%",
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily:
                              "'Segoe UI', Tahoma, Geneva, Verdana, sans-serifVerdana, Geneva, Tahoma, sans-serif",
                          }}
                        >
                          {endState}
                        </span>
                      </div>
                    </div>
                  
                  </div>
                );
              })}
            </div>
            <button onClick={handleAccept}  className={style.acceptButton}>Accept All Deliveries</button>

          </div>
        </div>
      )}
      
      <div ref={container} className={style.lottieAnimation}></div>
    </div>
  );

}