import React, { useState, useEffect } from "react";
import { Input, Steps, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "../Styles/OrderList.module.css";
import Locationicon from "../Assets/bxs_map.png";
import axios from "axios";
import { useTranslation } from 'react-i18next';

function Orders() {
  const { t, i18n } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (filter = "") => {
    let url = 'https://smart-shipment-system.vercel.app/api/v1/client/order/getAllOrders';

    if (filter === "coming") {
      url += '?coming=true';
    } else if (filter === "delivered") {
      url += '?delivered=true';
    }
    try {
      const response = await axios.get(url);
      const fetchedOrders = response.data.data.orders || [];
      console.log(fetchedOrders);
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleBtns = (e) => {
    const filter = e.target.value;
    fetchOrders(filter);
  };

  const handleSearch = async (e) => {
    const orderId = e.target.value.trim();
    setSearchTerm(orderId);
    if (orderId) {
      try {
        const response = await axios.get(`https://smart-shipment-system.vercel.app/api/v1/client/order/${orderId}`);
        const order = response.data.data.order;
        console.log("search order",order);
        setFilteredOrders(order ? [order] : []);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setFilteredOrders([]);
      }
    } else {
      setFilteredOrders(orders);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://smart-shipment-system.vercel.app/api/v1/client/order/${orderId}`);
      // Refresh the orders list after deletion
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

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
    <>
      <div className={styles.track}>
        <h1 className={styles.h1}>{t('tracking')}</h1>
        <p className={styles.p}>{t('tracknum')}</p>
        <Input
          prefix={
            <SearchOutlined style={{ color: "Black", fontSize: "20px", fontWeight: "900" }} />
          }
          placeholder={t('enter')}
          value={searchTerm}
          onChange={handleSearch}
          className={styles.search}
        />

        <div className={styles.buttons}>
          <button className={styles.button1} value="all" onClick={() => fetchOrders()}>
            {t('all')}
          </button>
          <button className={styles.button1} value="coming" onClick={handleBtns}>
            {t('coming')}
          </button>
          <button className={styles.button1} value="delivered" onClick={handleBtns}>
            {t('delivered')}
          </button>
        </div>
      </div>

      <div className={styles.active}>
        {filteredOrders.map((order) => (
          <div key={order._id} className={styles.data}>
            <div className={styles.flex}>
              <span>
                <img src={Locationicon} alt="" className={styles.icon} />
              </span>
              <h5>#{order._id}</h5>
              <button className={styles.button}>{order.status}</button>
              <button onClick={() => deleteOrder(order._id)} className={styles.deleteButton}>
                {t('delete')}
              </button>
            </div>
            <Steps
              progressDot
              current={getCurrentStep(order.status)}
              items={[
                {
                  title: t('Receiving'),
                  description: order.startLocation || order.currentLoc.coordinates || "N/A",
                },
                {
                  title: t('Shipped'),
                },
                {
                  title: t('On the Way'),
                },
                {
                  title: t('Delivered'),
                  description: order.endLocation || "N/A",
                },
              ]}
            />
            <hr style={{ borderTop: "2px dashed black" }} />
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <h6>{t('cost')}</h6>
                <h5 style={{ marginLeft: "12%" }}>{order.deliveryCost || "N/A"} {t('EGY')}</h5>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <h6>{t('ITEMS')}</h6>
                <h5 style={{ marginLeft: "12%" }}>{order.quantity || "N/A"}</h5>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <h6>{t('WEIGHT')}</h6>
                <h5 style={{ marginLeft: "11%" }}>{order.weight || "N/A"} lbs</h5>
              </Col>
            </Row>
            <hr style={{ borderTop: "2px dashed black" }} />
            <div>
              {order.url ? (
                <img src={order.url} style={{ marginLeft: "37%" }} alt="QR Code" />
              ) : (
                <p>No QR code available</p>
              )}
              <p style={{ fontSize: "20px", padding: "10px", textAlign: "center", color: "black", fontWeight: "500" }}>
                SCAN QR CODE TO ACCEPT DELIVERY
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
