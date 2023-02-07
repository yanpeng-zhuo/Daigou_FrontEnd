/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-31 16:43:08
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */
/*
 * @Author: Yanpeng Zhuo
 * @Github: https://github.com/zhuoyanpeng
 * @Date: 2023-01-24 12:07:48
 * @LastEditors: Yanpeng Zhuo
 * @Description: file content
 */
import React, { useState, useEffect } from "react";
import { postFetch, getFetch, deleteFetch } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { Space, Table, Modal, Tag, Button, DatePicker } from "antd";
import moment from 'moment';
import "./OrderManagement.css";

function ProductManage() {
  const [trackings, setTrackings] = useState();
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tranctionName, setTranctionName] = useState();
  const [tranctionContact, setTranctionContact] = useState();
  const [tranctionAddress, setTranctionAddress] = useState();
  const [tranctionDate, setTranctionDate] = useState();
  const [tranctionProducts, setTranctionProducts] = useState();
  const [tranctionPrice, setTranctionPrice] = useState();

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    const result = await getFetch("http://localhost:8080/transactionManagement/transaction?username=" + username);
    console.log(result);
    if (result.status === 403) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("JWT");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/login");
    }
    //改变result格式
    result.data.forEach(element => {
      element.username = element?.user?.username || ""
    });
    console.log(result);
    setTrackings(result.data);

  };
  const deleteBtnHandler = async(row, record) => {
    console.log(record);
    await deleteFetch("http://localhost:8080/transactionManagement/transaction/" + record.id);
    setReload(!reload);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    var body = {
      "buyerName": tranctionName,
      "contact":tranctionContact,
      "address": tranctionAddress,
      "amount": tranctionPrice,
      "products": tranctionProducts,
      "transactionDate": tranctionDate,
      "status": "已创建"
    }
    await postFetch("http://localhost:8080/transactionManagement/transaction/" + username, body);
    setIsModalOpen(false);
    setReload(!reload);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeName = (event) => {
    setTranctionName(event.target.value);
  };
  const changeContact = (event) => {
    setTranctionContact(event.target.value);
  };
  const changeAddress = (event) => {
    setTranctionAddress(event.target.value);
  };
  const changeDate = (dayjs) => {
    setTranctionDate(dayjs);
  };
  const changeProducts = (event) => {
    setTranctionProducts(event.target.value);
  };
  const changePrice = (event) => {
    setTranctionPrice(event.target.value);
  };
  const columns = [
    {
      title: "订单号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "买家姓名",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "微信号",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "收货地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "交易日期",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (val) => {
        return val ? moment(val).format('MM-DD-YYYY') : ''
      }
    },
    {
      title: "商品详情",
      dataIndex: "products",
      key: "products",
    },

    {
      title: "总额",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "负责人",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "订单状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={(e) => deleteBtnHandler(e, record)}>删除</button>
        </Space>
      ),
    },
  ];

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  return (
    <div className="product_manage">
      <Button onClick={showModal}>新增订单</Button>
      <Modal title="新增订单" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>       
        <div>
        名称 <input onChange={changeName} ></input>
        </div>
        <div>
        微信 <input onChange={changeContact} ></input>
        </div>
        <div>
        地址 <input onChange={changeAddress} ></input>
        </div>
        <div>
        日期 <DatePicker onChange={(dayjs)=>changeDate(dayjs)} format={dateFormatList} />
        </div>
        
        <div>
        商品 <input onChange={changeProducts} ></input>
        </div>
        <div>
        价格 <input onChange={changePrice} ></input>
        </div>
        
      </Modal>
      <Table rowKey="id" dataSource={trackings} columns={columns} />

      
    </div>
  );
}

export default ProductManage;
