/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FloatButton, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { data } from "../Components/Collection";
import { Steps, Col, Row } from "antd";
import style from "../Styles/AdminTracing.module.css";
import To from "../Assets/to.svg";
import whatsapp from "../Assets/whatsapp.png";
import { GoogleMap, useLoadScript ,Polyline , MarkerF} from '@react-google-maps/api';
import location from "../Assets/location.png";
import location2 from "../Assets/bxs_map.png";
import{MessageOutlined ,PhoneOutlined } from "@ant-design/icons";
import axios from "axios";

{/*map*/ }
const libraries = ['places'];
const mapContainerStyle = {
  width: '23vw',
  height: '50vh',
  position: "relative",
  margin:'5px'
};

export default function Tracing() {
  const [category, setCategory] = useState(data);
  const [id, setId] = useState();
  const [status, setStatus] = useState();
  const [date, setDate] = useState();
  const [lau, setLat] = useState()
  const [lon, setLon] = useState()
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://smart-shipment-system.vercel.app/api/v1/admin/getAllOrders');
      const fetchedOrders = response.data.data.orders || [];
      console.log('all order',fetchedOrders);
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleBtns = (e) => {
    const filter = e.target.value;
    if (filter === "coming") {
      const filtered = orders.filter(order => order.status === "coming");
      setFilteredOrders(filtered);
    } else if (filter === "delivered") {
      const filtered = orders.filter(order => order.status === "delivered");
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  const handleSearch = (e) => {
    const orderId = e.target.value.trim();
    setSearchTerm(orderId);
    if (orderId) {
      const filtered = orders.filter(order => order._id === orderId);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  {/*const center = {
    lat: lau,
    lng: lon // default longitude
  };*/}
  {/*put our location on input*/ }

  const handleConvert = () => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: parseFloat(lau), lng: parseFloat(lon) };
    {/*convert lat to address*/ }

    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress('No results found');
        }
      } else {
        setAddress('Geocoder failed due to: ' + status);
      }
    });
  };


  {/*get our location*/ }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      setLat(postion.coords.latitude)
      setLon(postion.coords.longitude)
    })
  })
  {/*load the map*/ }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwAKZ3cPqdVhu_QjMjxb492NTHDMxpMQU',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  {/*show the marker in map*/ }
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };



  function handlePrint() {
    window.print()
    //the window.print() command is what is telling the browser to print the page
  }

  /*const CardClick = (id) => {
    if (id === data.id) {
      const filtere = data.filter((item) => item.id !== id);
      setCategory(filtere);
    }

  }
*/

 
const getCurrentStep = (status) => {
  switch (status.toLowerCase()) {
    case 'un-picked':
      return 0;
    case 'picked':
      return 1;
    case 'coming':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 0;
  }
};

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-5 col-md-5 " style={{ backgroundColor: "#EEEDEB"  ,height:"50000px" }}>
          <h6 style={{ margin: "20px" }}>Shipment</h6>

          {/*search input*/}
          <Input
          onChange={handleSearch}
          value={searchTerm}
          prefix={
            <SearchOutlined style={{ color: "Black", fontSize: "20px", fontWeight: "900" }} />
          }
          placeholder="Enter Track Number"
          className={style.search}
        />

          {/*filter button*/}
          <div className={style.buttons}>
            <button
              className={style.button1}
              value="all" onClick={handleBtns}
            >
              All
            </button>
            <button
              className={style.button1}
              value="coming" onClick={handleBtns}
            >
              Coming
            </button>

            <button
              className={style.button1}
              value="delivered" onClick={handleBtns} >
              Delivered

            </button>
          </div>


          <div className={style.active}>
            {filteredOrders.map((item) => (
              <div key={item.id} className={style.data}>
                <div className={style.flex}>
                  <h5>#{item._id}</h5>
                  <button >{item.status}</button>
                </div>
                <img src={item.client.profileImage} style={{ marginLeft: "65%", width: "50px", height: "50px", borderRadius: "25px" }} alt="" />
                  <img src={item.url} style={{ marginLeft: "5%", width: "50px", height: "50px", borderRadius: "25px" }} alt="" />

                <hr style={{ borderTop: " 2px solid  black" }} />

                <Row>
                  <Col
                    xs={{
                      span: 5,
                      offset: 1,
                    }}
                    lg={{
                      span: 8,
                      offset: 2,
                    }}

                  >
                    <h6 style={{ color: "#A4A3A3", fontWeight: "400" }}>Order date&time</h6>
                    <h5 style={{ marginLeft: "2%", fontWeight: "600" }}>{item.createdAt}</h5>
                  </Col>

                  <Col
                    xs={{
                      span: 5,
                      offset: 1,
                    }}
                    lg={{
                      span: 10,
                      offset: 2,
                    }}
                  >
                    <h6 style={{ marginLeft: "15%", color: "#A4A3A3", fontWeight: "400" }}>Delivery date&time</h6>
                    <h5 style={{ marginLeft: "15%", fontWeight: "600" }}>2024-07-05T23:41:18.500Z
                    </h5>    </Col>
                </Row>


              </div>
            ))}
          </div>
        </div>

        <div className="col-sm-5 offset-sm-2 col-md-7 offset-md-0" style={{ height: "500px" }}>
          {filteredOrders.map((item) => (
            <>
              <div className={style.flex}>
                <h5>#{item._id}</h5>
                <button >{item.status}</button>
                <button style={{ marginLeft: "10%" }} onClick={handlePrint}>Download Report</button>
              </div>

              <div className={style.flex} >
                <div className="col-sm-5  col-md-6" style={{ border: "3px solid  rgb(202, 198, 198)", borderRadius: "10px", padding: "10px" }}>
                  <p className={style.orderdetails}>ORDER DETAILS</p>
                  <div className={style.flex}>
                    <div>
                      <p className={style.fromTo}>{item.startLocation}</p>
                      <p style={{ color: "#A4A3A3", fontSize: "15px" }}>{item.createdAt}</p>
                    </div>
                    <img src={To} alt="" style={{ marginLeft: "5%", marginRight: "5%" }} />
                    <div>
                      <p className={style.fromTo}>{item.endLocation}</p>
                      <p style={{ color: "#A4A3A3", fontSize: "15px" }}></p>
                    </div>

                  </div>
                  {/*Tracking shipment virtical*/}
                  <Steps progressDot 
                     direction="vertical" 
                     style={{height:"55%"}}
                     current={getCurrentStep(item.status)}
                    items={[
                      {
                        title: "Receiving",
                        description: item.endLocation,
                        date: item.createdAt
                      },
                      {
                        title: "Shipped",
                      },
                      {
                        title: "On the way",
                      },
                      {
                        title: "delivered",
                        description: item.endLocation,
                        date: item.endLoc

                      },
                    ]} />

                  {/*product details*/}
                  <p className={style.productdetails}>PRODUCT DETAILS</p>
                  <div className={style.flex}>
                    <div style={{ marginRight: "25%" }}>
                      <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>DELIVERY COST</p>
                      <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.price} EGY</p>
                    </div>
                    <div>
                      <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>WEIGHT</p>
                      <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.weight} Ibs</p>
                    </div>
                  </div>

                  <div className={style.flex}>
                    <div style={{ marginRight: "25%" }}>
                      <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>PRODUCT TYPE</p>
                      <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.type}</p>
                    </div>
                    <div>
                      <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>ITEMS</p>
                      <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.quantity}</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5  col-md-6">
                  <div>
                  


                  <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={{
                    lat: item.startLoc.coordinates[0],
                    lng: item.startLoc.coordinates[1],
                  }}
                >
                  <MarkerF onLoad={onLoad} position={{ lat: item.startLoc.coordinates[0], lng: item.startLoc.coordinates[1] }} />
                  <MarkerF  onLoad={onLoad} position={{ lat: item.endLoc.coordinates[0], lng: item.endLoc.coordinates[1] }} />
                  <Polyline
                    path={[
                      { lat: item.startLoc.coordinates[0], lng: item.startLoc.coordinates[1] },
                      { lat: item.endLoc.coordinates[0], lng: item.endLoc.coordinates[1] }
                    ]}
                    options={{
                      strokeColor: 'red',
                      strokeOpacity: 1.0,
                      strokeWeight: 2,
                    }}
                  />
                </GoogleMap>
                  </div>

                  <div style={{ border: "3px solid  rgb(202, 198, 198)", borderRadius: "10px", padding: "5px",margin:"5px" }}>
                    <p className={style.productdetails}>Delivery</p>
                    <div className={style.flex}>
                      <img src={item.url} alt="" style={{width:"40px",height:"40px",borderRadius:"50%",marginTop:"5%"}} />
                      <div style={{marginRight:"10%"}}>
                        <p className={style.productdetails}>{item.deliveryname}</p>
                        <p style={{ color: "#2477F3", fontSize: "18px" ,marginLeft:"7%"}}>{item.phonedelivery}</p>
                      </div>
                      {/*calling*/}
                      <button style={{backgroundColor:"#EEEDEB"}} >< a href={`tel:${item.phonedelivery}`} ><PhoneOutlined style={{fontSize:"25px" ,color:"#78B159"}} /></a></button>
                      {/*message*/}
                      <button style={{backgroundColor:"#EEEDEB"}} >  <a  href={`sms:${item.phonedelivery}`} > 
                      <MessageOutlined style={{fontSize:"25px",color:"#78B159"}} /></a></button>
                    </div>


                    <p className={style.productdetails}>Customer</p>
                    <div className={style.flex} style={{marginBottom:"-5%"}}>
                    <img src={item.client.profileImage} alt="" style={{width:"40px",height:"40px",borderRadius:"50%",marginTop:"5%"}} />
                    <div style={{marginRight:"10%"}}>
                    <p className={style.productdetails}>{item.recipentName}</p>
                        <p style={{ color: "#2477F3", fontSize: "18px" ,marginLeft:"7%" }}>{item.reciepentPhone}</p>

                      </div>
                      {/*calling*/}
                      <button style={{backgroundColor:"#EEEDEB"}} >< a href={`tel:${item.reciepentPhone}`}><PhoneOutlined style={{fontSize:"25px" ,color:"#78B159"}} /></a></button>
                      {/*message*/}
                      <button style={{backgroundColor:"#EEEDEB"}} ><a  href={`sms:${item.reciepentPhone}`} > <MessageOutlined style={{fontSize:"25px",color:"#78B159"}} /></a></button>
                    </div>
                    <div>                      <p style={{fontSize:"15px",color:"blue"}}>{item.client.email}</p>
                    </div>
                  </div>

                  {/*Vehicle details*/}
                  <div style={{ border: "3px solid  rgb(202, 198, 198)", borderRadius: "10px", padding: "5px",margin:"5px" }} >
                    <p className={style.productdetails}>VEHICLE DETAILS</p>
                    <div className={style.flex}>
                      <div>
                        <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>description</p>
                        <p style={{ fontSize: "18px", fontWeight: "600" ,marginBottom:"-10%"}}>{item.description}hr</p>
                      </div>
                    </div>

                    <div className={style.flex}>
                      <div style={{ marginRight: "25%" }}>
                        <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>Max Payload</p>
                        <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.weight}Kg</p>
                      </div>
                      <div>
                        <p style={{ color: "#A4A3A3", fontSize: "18px", fontWeight: "500" }}>Weight</p>
                        <p style={{ fontSize: "18px", fontWeight: "600" }}>{item.weight}Kg</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          ))}

        </div>
      </div>
    </div>
  )
}