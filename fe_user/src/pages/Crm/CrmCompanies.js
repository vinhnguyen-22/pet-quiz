import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import MetaTags from 'react-meta-tags';

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  ModalBody,
  Label,
  Input,
  Modal,
  ModalHeader,
  Form,
  ModalFooter,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import actions
import { getCompanies as onGetCompanies } from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";

import mail_chimp from "../../assets/images/brands/mail_chimp.png";

const CrmCompanies = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => ({
    companies: state.Crm.companies,
  }));

  useEffect(() => {
    if (companies && !companies.length) {
      dispatch(onGetCompanies());
    }
  }, [dispatch, companies]);

  const [modal, setModal] = useState(false);
  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);
  const [sortBy, setsortBy] = useState("Owner");
  const [industryType, setindustryType] = useState(null);

  function handleIndustryType(industryType) {
    setindustryType(industryType);
  }

  function handlesortBy(sortBy) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];

  const industrytype = [
    {
      options: [
        { label: "Select industry type", value: "Select industry type" },
        { label: "Computer Industry", value: "Computer Industry" },
        { label: "Chemical Industries", value: "Chemical Industries" },
        { label: "Health Services", value: "Health Services" },
        {
          label: "Telecommunications Services",
          value: "Telecommunications Services",
        },
        {
          label: "Textiles: Clothing, Footwear",
          value: "Textiles: Clothing, Footwear",
        },
      ],
    },
  ];

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const onClickDelete = () => {
    setDeleteModal(true);
  };

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return (
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="checkAll" value="option1" />
            </div>
          );
        },
      },
      {
        Header: "Company Name",
        Cell: (company) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={company.row.original.img}
                  alt=""
                  className="avatar-xxs rounded-circle"
                />
              </div>
              <div className="flex-grow-1 ms-2 name">
                {company.row.original.companyName}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Owner",
        accessor: "owner",
        filterable: false,
      },
      {
        Header: "Industry Type",
        accessor: "industryType",
        filterable: false,
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: false,
      },
      {
        Header: "Location",
        accessor: "location",
        filterable: false,
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Call">
                <Link
                  to="#"
                  className="text-muted d-inline-block"
                // onClick={toggle}
                >
                  <i className="ri-phone-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit" title="Message">
                <Link to="#" className="text-muted d-inline-block">
                  <i className="ri-question-answer-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="View">
                <Link to="#">
                  <i className="ri-eye-fill align-bottom text-muted"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Edit">
                <Link className="edit-item-btn" to="#"
                // onClick={toggle}
                >
                  <i className="ri-pencil-fill align-bottom text-muted"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Delete">
                <Link
                  className="remove-item-btn"
                  onClick={() => {
                    onClickDelete();
                  }}
                  to="#"
                >
                  <i className="ri-delete-bin-fill align-bottom text-muted"></i>
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
        <MetaTags>
          <title>Companies | Velzon - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Companies" pageTitle="CRM" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="flex-grow-1">
                      <button className="btn btn-info add-btn" onClick={toggle}>
                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                        Company
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="hstack text-nowrap gap-2">
                        <button className="btn btn-danger">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button>
                        <button className="btn btn-soft-success">Import</button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            href="#"
                            className="btn-soft-info btn-icon"
                            tag="button"
                          >
                            <i className="ri-more-2-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem className="dropdown-item" href="#">
                              All
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Week
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Month
                            </DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">
                              Last Year
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col xxl={9}>
              <Card id="companyList">
                <CardHeader>
                  <Row className="g-2">
                    <Col md={3}>
                      <div className="search-box">
                        <Input
                          type="text"
                          className="form-control search"
                          placeholder="Search for company..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <div className="col-md-auto ms-auto">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted">Sort by: </span>
                        <Select
                          className="mb-0"
                          value={sortBy}
                          onChange={() => {
                            handlesortBy();
                          }}
                          options={sortbyname}
                          id="choices-single-default"
                        ></Select>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div>

                    <TableContainer
                      columns={columns}
                      data={companies}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={7}
                      className="custom-header-css"
                      divClass="table-responsive table-card mb-3"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light"
                    />

                  </div>
                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                      Add Company
                    </ModalHeader>
                    <Form>
                      <ModalBody>
                        <input type="hidden" id="id-field" />
                        <Row className="g-3">
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="name-field"
                                className="form-label"
                              >
                                Name
                              </Label>
                              <Input
                                type="text"
                                id="customername-field"
                                className="form-control"
                                placeholder="Enter company name"
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="owner-field"
                                className="form-label"
                              >
                                Owner Name
                              </Label>
                              <Input
                                type="text"
                                id="owner-field"
                                className="form-control"
                                placeholder="Enter owner name"
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="industry_type-field"
                                className="form-label"
                              >
                                Industry Type
                              </Label>
                              <Select
                                id="industry_type-field"
                                value={industryType}
                                onChange={() => {
                                  handleIndustryType();
                                }}
                                options={industrytype}
                              ></Select>
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="star_value-field"
                                className="form-label"
                              >
                                Rating
                              </Label>
                              <Input
                                type="text"
                                id="star_value-field"
                                className="form-control"
                                placeholder="Enter rating"
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="location-field"
                                className="form-label"
                              >
                                location
                              </Label>
                              <Input
                                type="text"
                                id="location-field"
                                className="form-control"
                                placeholder="Enter location"
                              />
                            </div>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            color="light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            type="submit"
                            color="success"
                            className="d-none"
                            id="add-btn"
                          >
                            Add Company
                          </Button>
                          <Button
                            color="success"
                            id="edit-btn"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </ModalFooter>
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
            <Col xxl={3}>
              <Card>
                <CardBody className="text-center">
                  <div className="position-relative d-inline-block">
                    <div className="avatar-md">
                      <div className="avatar-title bg-light rounded-circle">
                        <img src={mail_chimp} alt="" className="avatar-xs" />
                      </div>
                    </div>
                  </div>
                  <h5 className="mt-3 mb-1">Syntyce Solution</h5>
                  <p className="text-muted">Michael Morris</p>

                  <ul className="list-inline mb-0">
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-soft-success text-success fs-15 rounded"
                      >
                        <i className="ri-global-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                      >
                        <i className="ri-mail-line"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </li>
                  </ul>
                </CardBody>
                <div className="card-body">
                  <h6 className="text-muted text-uppercase fw-semibold mb-3">
                    Information
                  </h6>
                  <p className="text-muted mb-4">
                    A company incurs fixed and variable costs such as the
                    purchase of raw materials, salaries and overhead, as
                    explained by AccountingTools, Inc. Business owners have the
                    discretion to determine the actions.
                  </p>
                  <div className="table-responsive table-card">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">
                            Industry Type
                          </td>
                          <td>Chemical Industries</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Location
                          </td>
                          <td>Damascus, Syria</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Employee
                          </td>
                          <td>10-50</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Rating
                          </td>
                          <td>
                            4.0{" "}
                            <i className="ri-star-fill text-warning align-bottom"></i>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Website
                          </td>
                          <td>
                            <Link
                              to="#"
                              className="link-primary text-decoration-underline"
                            >
                              www.syntycesolution.com
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Contact Email
                          </td>
                          <td>info@syntycesolution.com</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Since
                          </td>
                          <td>1995</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CrmCompanies;
