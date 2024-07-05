import React from "react";
import { Card, Col, Row } from "antd";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import box from "../../Assets/Vector.png";
import circle from "../../Assets/Group 436.png";
import car from "../../Assets/carbon_delivery.png";
import completed from "../../Assets/fluent-mdl2_completed.png";
import cancel from "../../Assets/cancel.png";
import style from "../../Styles/Admin/Dashboard.module.css"

const App = () => (
  <div
    style={{
      width: "95%",
      margin: "auto",
      marginBottom: "20px",
      border: "1px rgba(0,0,0,.1) solid ",
      padding: "20px",
      borderRadius: "20px",
      justifyContent: "center",
      marginBottom: "20px",
    }}
  >
    <h5 style={{ paddingBottom: "30px" }}>SHIPMENTS</h5>
    <Row gutter={16} className={style.row}>
      <Col className="col-md-2 ">
      <img
          src={circle}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">120</h6>
          <p className="mb-3">Total shipment</p>
          <div className="" style={{ fontWeight: "normal", color: "#319F43" }}>
            <FontAwesomeIcon icon={faArrowUp} /> <span>+1.2%</span>
          </div>
        </Card>
      </Col>
      <Col className="col-md-2">
        <img
          src={box}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">49</h6>
          <p className="mb-3">Easy Shipment</p>
          <div className="" style={{ fontWeight: "normal", color: "#319F43" }}>
            <FontAwesomeIcon icon={faArrowUp} /> <span>+2.2%</span>
          </div>
        </Card>
      </Col>
      <Col className="col-md-2">
      <img
          src={car}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">71</h6>
          <p className="mb-3">Speed Shipment</p>
          <div className="" style={{ fontWeight: "normal", color: "#319F43" }}>
            <FontAwesomeIcon icon={faArrowUp} /> <span>+2.5%</span>
          </div>
        </Card>
      </Col>
      <Col className="col-md-2">
      <img
          src={circle}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">30</h6>
          <p className="mb-3">Active</p>
          <div className="" style={{ fontWeight: "normal", color: "#319F43" }}>
            <FontAwesomeIcon icon={faArrowUp} /> <span>+30%</span>
          </div>
        </Card>
      </Col>
      <Col className="col-md-2">
      <img
          src={completed}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">63</h6>
          <p className="mb-3">Completed</p>
          <div className="" style={{ fontWeight: "normal", color: "#319F43" }}>
            <FontAwesomeIcon icon={faArrowUp} /> <span>+67%</span>
          </div>
        </Card>
      </Col>
      <Col className="col-md-2">
      <img
          src={cancel}
      className={style.img}
        />
        <Card
          bordered={false}
          className={style.card}
        >
          <h6 className="mb-3">27</h6>
          <p className="mb-3">Cancelled</p>
          <div className="" style={{ fontWeight: "normal", color: "#E33629" }}>
            <FontAwesomeIcon icon={faArrowDown} /> <span>-0.5%</span>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);
export default App;
