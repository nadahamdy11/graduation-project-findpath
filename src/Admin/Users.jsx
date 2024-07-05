import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Avatar, Button, Tabs, Space, Input, Dropdown,Modal } from 'antd';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from '../Styles/Admin/Users.module.css';
import "../index.css";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;
const Users = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('clients');
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setIsModalVisible(true);
  };
  

  useEffect(() => {
    // Fetch users
    axios.get('https://smart-shipment-system.vercel.app/api/v1/admin/getAllUsers')
      .then(response => {
        console.log("get all users", response.data.data);
        setUsers(response.data.data.users);
        setFilteredUsers(response.data.data.users);
      })
      .catch(error => console.error(error));
    // Fetch deliveries
    axios.get('https://smart-shipment-system.vercel.app/api/v1/admin/getAllDeliveries')
      .then(response => {
        console.log("get all delivers", response.data.data);
        setDeliveries(response.data.data.deliveries);
        setFilteredDeliveries(response.data.data.deliveries);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, users, deliveries]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const lowercasedValue = value.toLowerCase();
      const filteredUsers = users.filter(user =>
        user._id.toString().includes(lowercasedValue) ||
        user.name.toLowerCase().includes(lowercasedValue) ||
        user.email.toLowerCase().includes(lowercasedValue)
      );
      const filteredDeliveries = deliveries.filter(delivery =>
        delivery._id.toString().includes(lowercasedValue) ||
        delivery.name.toLowerCase().includes(lowercasedValue) ||
        delivery.email.toLowerCase().includes(lowercasedValue)
      );
      setFilteredUsers(filteredUsers);
      setFilteredDeliveries(filteredDeliveries);
    } else {
      setFilteredUsers(users);
      setFilteredDeliveries(deliveries);
    }
  };

  const approveDelivery = async (deliveryId) => {
    try {
      const response = await axios.patch('https://smart-shipment-system.vercel.app/api/v1/admin/approveDelivery', {
        deliveryId: deliveryId
      });
      console.log('Delivery approved:', response.data);
      // Update the deliveries state to reflect the change
      setDeliveries(prevDeliveries =>
        prevDeliveries.map(delivery =>
          delivery._id === deliveryId ? { ...delivery, deliveryApproved: true } : delivery
        )
      );
      setFilteredDeliveries(prevDeliveries =>
        prevDeliveries.map(delivery =>
          delivery._id === deliveryId ? { ...delivery, deliveryApproved: true } : delivery
        )
      );

    } catch (error) {
      console.error('Error approving delivery:', error);
    }
  };
  
//ban user
  const banUser = async (userId) => {
    try {
      const response = await axios.patch('https://smart-shipment-system.vercel.app/api/v1/admin/banUser', {
        userId: userId
      });
      console.log('User banned:', response.data);
      // Update the users state to reflect the change
      setUsers(prevUsers =>

        prevUsers.filter(user => user._id !== userId)
        
      );
      setFilteredUsers(prevUsers =>
        prevUsers.filter(user => user._id !== userId)
      );
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };
  const renderImageModal = () => (
    <Modal
      visible={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
      centered
    >
      <img src={modalImageSrc} alt="Enlarged" style={{ width: '100%' }} />
    </Modal>
  );
  const columnsUser = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
        <Avatar 
          src={record.profileImage}
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(record.profileImage)}
        />
        {text}
      </Space>
      ),
    },
    {
      title: 'Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'OTP Message',
      dataIndex: 'OTP',
      key: 'OTP',
      render: OTP =>
        OTP
          ? OTP
          : 'N/A',
    },
    {
      title: 'Confirmed Email',
      dataIndex: 'confirmedEmail',
      key: 'confirmedEmail',
      render: confirmedEmail => (confirmedEmail ? 'Yes' : 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="1" onClick={() => approveDelivery(record._id)}>Approve</Menu.Item>
            <Menu.Item key="2" onClick={() => banuser(record._id)}>Ban</Menu.Item>
          </Menu>
        }
        placement="bottomRight"
>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const columnsDelivery = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
        <Avatar 
          src={record.profileImage}
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(record.profileImage)}
        />
        {text}
      </Space>
      ),
    },
    {
      title: 'Delivery Approval Image',
      dataIndex: 'deliveryApprovalImg',
      key: 'deliveryApprovalImg',
      render: (text, record) => (
        <Avatar 
          src={record.deliveryApprovalImg}
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(record.deliveryApprovalImg)}
        />
      ),
    },
    {
      title: 'Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Start Location',
      dataIndex: 'startState',
      key: 'startState.coordinates',
      render: startState =>
        startState && startLoc.coordinates
          ? startLoc.coordinates.join(', ')
          : 'N/A',
    },
    {
      title: 'End State',
      dataIndex: 'endState',
      key: 'endState',
      render: endState =>
        endState
          ? endState
          : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Delivery Approved',
      dataIndex: 'deliveryApproved',
      key: 'deliveryApproved',
      render: deliveryApproved => (deliveryApproved ? 'Yes' : 'No'),
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
      render: vehicleType =>
        vehicleType
          ? vehicleType
          : 'N/A',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="1" onClick={() => showApprove(record._id)}>Approve</Menu.Item>
            <Menu.Item key="2" onClick={() => bandelivery(record._id)}>Ban</Menu.Item>
          </Menu>
        }>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handlePrint = () => {
    window.print();
  };
  const showApprove = (deliveryId) => { 
    confirm({ 
      title: "Are you sure you want to approve this delivery?", 
      content: "This action cannot be undone.", 
      okText: "Yes", 
      okType: "danger", 
      cancelText: "No", 
      onOk() { 
        approveDelivery(deliveryId); 
      }, 
    }); 
  };
  const bandelivery = (deliveryId) => { 
    confirm({ 
      title: "Are you sure you want to ban this delivery?", 
      content: "This action cannot be undone.", 
      okText: "Yes", 
      okType: "danger", 
      cancelText: "No", 
      onOk() { 
        banUser(deliveryId); 
      }, 
    }); 
  };
  const banuser = (userId) => { 
    confirm({ 
      title: "Are you sure you want to ban this user?", 
      content: "This action cannot be undone.", 
      okText: "Yes", 
      okType: "danger", 
      cancelText: "No", 
      onOk() { 
        banUser(userId); 
      }, 
    }); 
  };
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Layout className="site-layout">
        <Header style={{ padding: 10, backgroundColor: "white" }}>
          <Input
            placeholder="Search user's ID or name or email"
            style={{ width: 300 }}
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
          />
          <Button type="primary" className={styles.download} onClick={handlePrint}>
            Download Report
            <DownloadOutlined style={{ color: "black" }} />
          </Button>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Drivers" key="drivers" className={styles.data} >
              <Table columns={columnsDelivery} dataSource={filteredDeliveries} />
            </TabPane>
            <TabPane tab="Clients" key="clients">
              <Table columns={columnsUser} dataSource={filteredUsers} />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
      {renderImageModal()}

    </Layout>
  );
};

export default Users;
