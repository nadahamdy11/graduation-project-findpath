// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "../Styles/StartShipment.module.css";
import Map from "../Components/Map";
import Payment from "../Components/Payment";
import { useState } from "react";
import { Button, message, Steps } from "antd";
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
    }
    // Fetch nearest deliveries after order creation
    fetchFindPath(Data.startLocation, Data.endLocation);
    fetchNearestDeliveries(
      Data.startLoc.coordinates.join(","),
      Data.endLocation
    );

    console.log(result);
    setRecommend((recommend) => !recommend);
    console.log("recommend", recommend);
  } catch (error) {
    console.error("There was an error creating the order!", error);
  }
};

const StartShipment = () => {
  {
    /*const { token } = theme.useToken();*/
  }
  const [current, setCurrent] = useState(0);
  const [orderId, setOrderId] = useState("");
  /*const next = () => {
    setCurrent(current + 1);
  };
  const steps = [
    {
      content: <Map next={next} />,
    },
       {
      content: <Payment/>,
    }, 
  ];
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
  }));
  const contentStyle = {
    marginTop: 16,
  }; */
  return (
    <>
    <Map/>
    {/*   <Steps current={current} items={items} className={style.step} />
      <div className="flex">
        {current > 0 && (
          <Button className={style.previousbutton} onClick={() => prev()}>
            Previous
          </Button>
        )}

        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            className={style.nextbutton}
          >
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
            className={style.nextbutton}
          >
            Done
          </Button>
        )}
      </div>

      <div style={contentStyle} className={style.app}>
        {steps[current].content}
      </div>
      <div
        style={{
          marginTop: 0,
        }}
      ></div> */}
    </>
  );
};
export default StartShipment;
