import React, { useState } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image1 from "../../assets/images/products/img-1.png";
import image2 from "../../assets/images/products/img-2.png";
import image3 from "../../assets/images/products/img-3.png";
import image6 from "../../assets/images/products/img-6.png";
import image5 from "../../assets/images/products/img-5.png";

const MyCartDropdown = () => {
    const [isCartDropdown, setIsCartDropdown] = useState(false);
    const toggleCartDropdown = () => {
        setIsCartDropdown(!isCartDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isCartDropdown} toggle={toggleCartDropdown} className="topbar-head-dropdown ms-1 header-item">
                <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                    <i className='bx bx-shopping-bag fs-22'></i>
                    <span
                        className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-info">7<span
                            className="visually-hidden">unread messages</span></span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-xl dropdown-menu-end p-0"
                    aria-labelledby="page-header-cart-dropdown">
                    <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
                            </Col>
                            <div className="col-auto">
                                <span className="badge badge-soft-warning fs-13"> 7 items</span>
                            </div>
                        </Row>
                    </div>
                    <SimpleBar style={{ maxHeight: "300px" }}>
                        <div className="p-2">
                            <div className="d-block dropdown-item text-wrap px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img src={image1}
                                        className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1 fs-14">
                                            <Link to="/apps-ecommerce-product-details" className="text-reset">Branded
                                                T-Shirts</Link>
                                        </h6>
                                        <p className="mb-0 fs-12 text-muted">
                                            Quantity: <span>10 x $32</span>
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <h5 className="m-0 fw-normal">$320</h5>
                                    </div>
                                    <div className="ps-2">
                                        <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"><i
                                            className="ri-close-fill fs-16"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-block dropdown-item text-wrap px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img src={image2}
                                        className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1 fs-14">
                                            <Link to="/apps-ecommerce-product-details"
                                                className="text-reset">Bentwood Chair</Link>
                                        </h6>
                                        <p className="mb-0 fs-12 text-muted">
                                            Quantity: <span>5 x $18</span>
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <h5 className="m-0 fw-normal">$89</h5>
                                    </div>
                                    <div className="ps-2">
                                        <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"><i
                                            className="ri-close-fill fs-16"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-block dropdown-item text-wrap px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img src={image3}
                                        className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1 fs-14">
                                            <Link to="/apps-ecommerce-product-details" className="text-reset">
                                                Borosil Paper Cup</Link>
                                        </h6>
                                        <p className="mb-0 fs-12 text-muted">
                                            Quantity: <span>3 x $250</span>
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <h5 className="m-0 fw-normal">$750</h5>
                                    </div>
                                    <div className="ps-2">
                                        <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"><i
                                            className="ri-close-fill fs-16"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-block dropdown-item text-wrap px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img src={image6}
                                        className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1 fs-14">
                                            <Link to="/apps-ecommerce-product-details" className="text-reset">Gray
                                                Styled T-Shirt</Link>
                                        </h6>
                                        <p className="mb-0 fs-12 text-muted">
                                            Quantity: <span>1 x $1250</span>
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <h5 className="m-0 fw-normal">$1250</h5>
                                    </div>
                                    <div className="ps-2">
                                        <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"><i
                                            className="ri-close-fill fs-16"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-block dropdown-item text-wrap px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img src={image5}
                                        className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1 fs-14">
                                            <Link to="/apps-ecommerce-product-details"
                                                className="text-reset">Stillbird Helmet</Link>
                                        </h6>
                                        <p className="mb-0 fs-12 text-muted">
                                            Quantity: <span>2 x $495</span>
                                        </p>
                                    </div>
                                    <div className="px-2">
                                        <h5 className="m-0 fw-normal">$990</h5>
                                    </div>
                                    <div className="ps-2">
                                        <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"><i
                                            className="ri-close-fill fs-16"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                    <div className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border d-grid">
                        <div className="d-flex justify-content-between align-items-center pb-3">
                            <h5 className="m-0 text-muted">Total:</h5>
                            <div className="px-2">
                                <h5 className="m-0">$1258.58</h5>
                            </div>
                        </div>

                        <Link to="/apps-ecommerce-checkout" className="btn btn-success text-center">
                            Checkout
                        </Link>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default MyCartDropdown;