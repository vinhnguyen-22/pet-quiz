import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";
import MetaTags from 'react-meta-tags';


//redux
import { useSelector, useDispatch } from "react-redux";
//Import data
import { orders as ordersData } from "../../../common/data";

//Import actions
import { getOrders as onGetOrders } from "../../../store/ecommerce/action";

const EcommerceOrders = (props) => {
  const [orderStatus, setorderStatus] = useState(null);
  const [orderPayement, setorderPayement] = useState(null);
  const [productName, setproductName] = useState(null);
  const [singleProductName, setsingleProductName] = useState(null);
  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    orders: state.Ecommerce.orders,
  }));

  const [orderList, setOrderList] = useState([]);

  const orderstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Pending", value: "Pending" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Pickups", value: "Pickups" },
        { label: "Returns", value: "Returns" },
        { label: "Delivered", value: "Delivered" },
      ],
    },
  ];

  const orderpayement = [
    {
      options: [
        { label: "Select Payment", value: "Select Payment" },
        { label: "All", value: "All" },
        { label: "Mastercard", value: "Mastercard" },
        { label: "Paypal", value: "Paypal" },
        { label: "Visa", value: "Visa" },
        { label: "COD", value: "COD" },
      ],
    },
  ];

  const productname = [
    {
      options: [
        { label: "Product", value: "Product" },
        { label: "Puma Tshirt", value: "Puma Tshirt" },
        { label: "Adidas Sneakers", value: "Adidas Sneakers" },
        {
          label: "350 ml Glass Grocery Container",
          value: "350 ml Glass Grocery Container",
        },
        {
          label: "American egale outfitters Shirt",
          value: "American egale outfitters Shirt",
        },
        { label: "Galaxy Watch4", value: "Galaxy Watch4" },
        { label: "Apple iPhone 12", value: "Apple iPhone 12" },
        { label: "Funky Prints T-shirt", value: "Funky Prints T-shirt" },
        {
          label: "USB Flash Drive Personalized with 3D Print",
          value: "USB Flash Drive Personalized with 3D Print",
        },
        {
          label: "Oxford Button-Down Shirt",
          value: "Oxford Button-Down Shirt",
        },
        {
          label: "Classic Short Sleeve Shirt",
          value: "Classic Short Sleeve Shirt",
        },
        {
          label: "Half Sleeve T-Shirts (Blue)",
          value: "Half Sleeve T-Shirts (Blue)",
        },
        { label: "Noise Evolve Smartwatch", value: "Noise Evolve Smartwatch" },
      ],
    },
  ];

  const toggle = useCallback(() => {
      setModal(!modal);
  }, [modal]);

  function handleorderStatus(orderStatus) {
    setorderStatus(orderStatus);
  }

  function handleorderPayement(orderPayement) {
    setorderPayement(orderPayement);
  }

  function handleProductname(productName) {
    setproductName(productName);
  }

  function handlesingleOrderStatus(singleProductName) {
    setsingleProductName(singleProductName);
  }

  const onClickDelete = () => {
    setDeleteModal(true);
  };

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    dispatch(onGetOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(orders)) setOrderList(orders);
  }, [orders]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredOrders = ordersData;
      if (type !== "all") {
        filteredOrders = ordersData.filter((order) => order.status === type);
      }
      setOrderList(filteredOrders);
    }
  };

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Order Id",
        accessor: "orderId",
        filterable: false,
        Cell: (cell) => {
          return <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">{cell.value}</Link>;
        },
      },
      {
        Header: "Customer",
        accessor: "customer",
        filterable: false,
      },
      {
        Header: "Product",
        accessor: "productname",
        filterable: false,
      },
      {
        Header: "Order Date",
        Cell: (order) => (
          <>
            {order.row.original.orderDate[0]},{" "}
            <small className="text-muted">{order.row.original.orderDate[1]}</small>
          </>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        filterable: false,
      },
      {
        Header: "Payment Method",
        accessor: "payment",
        filterable: false,
      },
      {
        Header: "Delivery Status",
        Cell: (order) => (
          <>
            <span
              className={
                "badge text-uppercase badge-soft-" +
                order.row.original.statusClass
              }
            >
              {order.row.original.status}
            </span>
          </>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to="apps-ecommerce-order-details"
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  // onClick={toggle}
                  className="text-primary d-inline-block edit-item-btn"
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    onClickDelete();
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <Container fluid>
      <MetaTags>
          <title>Orders | Velzon - React Admin & Dashboard Template</title>
        </MetaTags>
        <BreadCrumb title="Orders" pageTitle="Ecommerce" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header  border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">Order History</h5>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={toggle}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Create
                      Order
                    </button>{" "}
                    <button type="button" className="btn btn-info">
                      <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                      Import
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="border border-dashed border-end-0 border-start-0">
                <form>
                  <Row className="g-3">
                    <Col sm={6} className="col-xxl-5">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for order ID, customer, order status or something..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>

                    <Col sm={6} className="col-xxl-2">
                      <div>
                        <Flatpickr
                          className="form-control"
                          id="datepicker-publish-input"
                          placeholder="Select a date"
                          options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            mode: "multiple",
                            dateFormat: "d.m.y",
                          }}
                        />
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                          value={orderStatus}
                          onChange={() => {
                            handleorderStatus();
                          }}
                          options={orderstatus}
                          name="choices-single-default"
                          id="idStatus"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                          value={orderPayement}
                          onChange={() => {
                            handleorderPayement();
                          }}
                          options={orderpayement}
                          name="choices-payment-default"
                          id="idPayment"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-1">
                      <div>
                        <button type="button" className="btn btn-primary w-100">
                          {" "}
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filters
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success mb-3"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        All Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "Delivered");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Delivered
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "Pickups");
                        }}
                        href="#"
                      >
                        <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                        Pickups{" "}
                        <span className="badge bg-danger align-middle ms-1">
                          2
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("4", "Returns");
                        }}
                        href="#"
                      >
                        <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                        Returns
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "5" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("5", "Cancelled");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Cancelled
                      </NavLink>
                    </NavItem>
                  </Nav>

                    <TableContainer
                      columns={columns}
                      data={orderList}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={10}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                    />
                </div>
                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                      Add Order
                  </ModalHeader>
                  <Form action="#">
                    <ModalBody>
                      <input type="hidden" id="id-field" />

                      <div className="mb-3">
                        <Label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Customer Name
                        </Label>
                        <Input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter Name"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label
                          htmlFor="productname-field"
                          className="form-label"
                        >
                          Product
                        </Label>
                        <Select
                          name="productname-field"
                          id="productname-field"
                          value={productName}
                          onChange={() => {
                            handleProductname();
                          }}
                          options={productname}
                        ></Select>
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="date-field" className="form-label">
                          Order Date
                        </Label>
                        <Flatpickr
                          className="form-control"
                          id="datepicker-publish-input"
                          placeholder="Select a date"
                          options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            mode: "multiple",
                            dateFormat: "d.m.y",
                          }}
                        />
                      </div>

                      <div className="row gy-4 mb-3">
                        <div className="col-md-6">
                          <div>
                            <Label
                              htmlFor="amount-field"
                              className="form-label"
                            >
                              Amount
                            </Label>
                            <Input
                              type="text"
                              id="amount-field"
                              className="form-control"
                              placeholder="Total amount"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <Label
                              htmlFor="payment-field"
                              className="form-label"
                            >
                              Payment Method
                            </Label>
                            <Select
                              name="payment-method"
                              id="payment-field"
                              options={orderpayement}
                            ></Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="delivered-status"
                          className="form-label"
                        >
                          Delivery Status
                        </Label>
                        <Select
                          name="delivered-status"
                          id="delivered-status"
                          value={singleProductName}
                          onChange={() => {
                            handlesingleOrderStatus();
                          }}
                          options={orderstatus}
                        ></Select>
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Add Order
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          id="edit-btn"
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>

                <DeleteModal
                  show={deleteModal}
                  onDeleteClick={() => setDeleteModal(false)}
                  onCloseClick={() => setDeleteModal(false)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrders;
