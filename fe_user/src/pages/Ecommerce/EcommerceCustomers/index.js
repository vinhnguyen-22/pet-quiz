import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import MetaTags from 'react-meta-tags';


//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import { getCustomers as onGetCustomers } from "../../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

const EcommerceCustomers = () => {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => ({
    customers: state.Ecommerce.customers,
  }));

  const [customerStatus, setcustomerStatus] = useState(null);
  const [customerModalStatus, setcustomerModalStatus] = useState(null);

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const customerstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  const customermocalstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  function handlecustomerStatus(customerStatus) {
    setcustomerStatus(customerStatus);
  }

  function handlemodalcustomerStatus(customerModalStatus) {
    setcustomerModalStatus(customerModalStatus);
  }

  const onClickDelete = () => {
    setDeleteModal(true);
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
        Header: "Customer",
        accessor: "customer",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: false,
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: false,
      },
      {
        Header: "Status",
        Cell: (customer) => (
          <>
            <span className={"badge text-uppercase badge-soft-" + customer.row.original.statusClass}>{customer.row.original.status}</span>
          </>
        )
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                // onClick={toggle}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Remove">
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <MetaTags>
            <title>Customers | Velzon - React Admin & Dashboard Template</title>
          </MetaTags>

          <BreadCrumb title="Customers" pageTitle="Ecommerce" />

          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-bottom-dashed">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={toggle}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>{" "}
                        <button type="button" className="btn btn-info">
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="border-bottom-dashed border-bottom">
                  <form>
                    <Row className="g-3">
                      <Col xl={6}>
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search /"
                            placeholder="Search for customer, email, phone, status or something..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <Row className="g-3">
                          <Col sm={4}>
                            <div className="">
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

                          <Col sm={4}>
                            <div>
                              <Select
                                value={customerStatus}
                                onChange={() => {
                                  handlecustomerStatus();
                                }}
                                options={customerstatus}
                                name="choices-single-default"
                                id="idStatus"
                              ></Select>
                            </div>
                          </Col>

                          <Col sm={4}>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                {" "}
                                <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                Filters
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
                <div className="card-body">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={customers}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  </div>
                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      Add Customer
                    </ModalHeader>
                    <Form action="#">
                      <ModalBody>
                        <input type="hidden" id="id-field" />

                        <div
                          className="mb-3"
                          id="modal-id"
                          style={{ display: "none" }}
                        >
                          <Label htmlFor="id-field1" className="form-label">
                            ID
                          </Label>
                          <Input
                            type="text"
                            id="id-field1"
                            className="form-control"
                            placeholder="ID"
                            readOnly
                          />
                        </div>

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
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="email-field" className="form-label">
                            Email
                          </Label>
                          <Input
                            type="email"
                            id="email-field"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="phone-field" className="form-label">
                            Phone
                          </Label>
                          <Input
                            type="text"
                            id="phone-field"
                            className="form-control"
                            placeholder="Enter Phone no."
                          />
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="date-field" className="form-label">
                            Joining Date
                          </Label>
                          <Flatpickr
                            className="form-control"
                            id="date-field"
                            placeholder="Select Joining Date"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              mode: "multiple",
                              dateFormat: "d.m.y",
                            }}
                          />
                        </div>

                        <div>
                          <Label htmlFor="status-field" className="form-label">
                            Status
                          </Label>
                          <Select
                            value={customerModalStatus}
                            onChange={() => {
                              handlemodalcustomerStatus();
                            }}
                            options={customermocalstatus}
                            name="status-field"
                            id="status-field"
                          ></Select>
                        </div>
                      </ModalBody>
                      <ModalFooter>
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
                            Add Customer
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
                      </ModalFooter>
                    </Form>
                  </Modal>

                  <DeleteModal
                    show={deleteModal}
                    onDeleteClick={() => setDeleteModal(false)}
                    onCloseClick={() => setDeleteModal(false)}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomers;
