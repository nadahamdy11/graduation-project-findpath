import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Table,
  Avatar,
  Button,
  Tabs,
  Space,
  Input,
  Dropdown,
  Flex,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import axios from "axios";
import styles from "../Styles/Admin/Users.module.css";
import "../index.css";
const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;
const Orders = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [unPickedOrders, setUnPickedOrders] = useState([]);
  const [filterUnPickedOrders, setFilterUnPickedOrders] = useState([]);
  const [pickedOrders, setPickedOrders] = useState([]);
  const [filterPickedOrders, setFilterPickedOrders] = useState([]);
  const [comingOrders, setComingOrders] = useState([]);
  const [filterComingOrders, setFilterComingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [filterDeliveredOrders, setFilterDeliveredOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://smart-shipment-system.vercel.app/api/v1/admin/getAllOrders")
      .then((response) => {
        const ordersData = response.data.data.orders;
        setOrders(ordersData);
        console.log(ordersData);
        setFilteredOrders(ordersData);

        const coming = [];
        const unPicked = [];
        const picked = [];
        const delivered = [];

        ordersData.forEach((order) => {
          switch (order.status) {
            case "coming":
              coming.push(order);
              break;
            case "un-picked":
              unPicked.push(order);
              break;
            case "picked-up":
              picked.push(order);
              break;
            case "delivered":
              delivered.push(order);
              break;
            default:
              break;
          }
        });

        setComingOrders(coming);
        setUnPickedOrders(unPicked);
        setPickedOrders(picked);
        setDeliveredOrders(delivered);
      })
      .catch((error) => console.error(error));
  }, []);
  const showDeleteConfirm = (orderId) => {
    confirm({
      title: "Are you sure you want to delete this order?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(orderId);
      },
    });
  };
  const handleDelete = (orderId) => {
    axios
      .delete(
        `https://smart-shipment-system.vercel.app/api/v1/admin/orders/${orderId}`
      )
      .then((response) => {
        setOrders(orders.filter((order) => order._id !== orderId));
        setFilteredOrders(
          filteredOrders.filter((order) => order._id !== orderId)
        );
        setUnPickedOrders(
          unPickedOrders.filter((order) => order._id !== orderId)
        );
        setPickedOrders(pickedOrders.filter((order) => order._id !== orderId));
        setComingOrders(comingOrders.filter((order) => order._id !== orderId));
        setDeliveredOrders(
          deliveredOrders.filter((order) => order._id !== orderId)
        );
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, orders]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const lowercasedValue = value.toLowerCase();
      const filterOrders = (orders) =>
        orders.filter(
          (order) =>
            order._id.toString().includes(lowercasedValue) ||
            order.recipentName.toLowerCase().includes(lowercasedValue) ||
            order.senderName.toLowerCase().includes(lowercasedValue)
        );

      setFilteredOrders(filterOrders(orders));
      setFilterUnPickedOrders(filterOrders(unPickedOrders));
      setFilterPickedOrders(filterOrders(pickedOrders));
      setFilterDeliveredOrders(filterOrders(deliveredOrders));
      setFilterComingOrders(filterOrders(comingOrders));
    } else {
      setFilteredOrders(orders);
      setFilterUnPickedOrders(unPickedOrders);
      setFilterPickedOrders(pickedOrders);
      setFilterDeliveredOrders(deliveredOrders);
      setFilterComingOrders(comingOrders);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Recipient Name",
      dataIndex: "recipentName",
      key: "recipentName",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: "Reciepent Phone",
      dataIndex: "reciepentPhone",
      key: "reciepentPhone",
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      key: "senderName",
    },
    {
      title: "Sender Phone",
      dataIndex: "senderPhone",
      key: "senderPhone",
    },
    {
      title: "Start Location",
      dataIndex: "startLocation",
      key: "startLocation",
    },
    {
      title: "End Location",
      dataIndex: "endLocation",
      key: "endLocation",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Paid Status",
      dataIndex: "paidStatus",
      key: "paidStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <button onClick={() => showDeleteConfirm(record._id)} type="button">
          {" "}
          <DeleteOutlined style={{ color: "red" }} />
        </button>
      ),
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Layout className="site-layout">
        <Header style={{ padding: 10, backgroundColor: "white" }}>
          <Input
            placeholder="Search user's ID or name or email"
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            type="primary"
            className={styles.download}
            onClick={handlePrint}
          >
            Download Report
            <DownloadOutlined style={{ color: "black" }} />
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="All" key="all">
              <Table columns={columns} dataSource={filteredOrders} />
            </TabPane>
            <TabPane tab="Unpicked" key="unPicked">
              <Table columns={columns} dataSource={filterUnPickedOrders} />
            </TabPane>
            <TabPane tab="Picked Up" key="pickedUp">
              <Table columns={columns} dataSource={filterPickedOrders} />
            </TabPane>
            <TabPane tab="Coming" key="coming">
              <Table columns={columns} dataSource={filterComingOrders} />
            </TabPane>
            <TabPane tab="Delivered" key="delivered">
              <Table columns={columns} dataSource={filterDeliveredOrders} />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Orders;
