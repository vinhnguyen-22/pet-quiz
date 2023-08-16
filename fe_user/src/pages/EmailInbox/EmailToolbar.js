import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mailbox } from '../../common/data';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, Offcanvas, OffcanvasBody, Row, UncontrolledDropdown, UncontrolledTooltip, UncontrolledCollapse, ButtonGroup, Button, UncontrolledButtonDropdown } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

// Rating
import Rating from "react-rating";

// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";

import img2 from "../../assets/images/small/img-2.jpg";
import img6 from "../../assets/images/small/img-6.jpg";

const EmailToolbar = () => {

    const [isRight, setIsRight] = useState(false);

    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    return (
        <React.Fragment>
            <div className="email-content">
                <div className="p-4 pb-0">
                    <div className="border-bottom border-bottom-dashed">
                        <Row className="mt-n2 mb-3 mb-sm-0">
                            <Col className="col-sm-auto order-1 d-block d-lg-none">
                                <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 email-menu-btn">
                                    <i className="ri-menu-2-fill align-bottom"></i>
                                </button>
                            </Col>
                            <div className="col-sm order-3 order-sm-2">
                                <div className="hstack gap-sm-1 align-items-center flex-wrap email-topbar-link">
                                    <div className="form-check checkbox-wrapper-mail fs-14 m-0">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheck18" />
                                        <label className="form-check-label" htmlFor="flexCheck18"></label>
                                    </div>
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip1">
                                        <i className="ri-inbox-archive-fill align-bottom"></i>
                                    </button>
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip2">
                                        <i className="ri-error-warning-fill align-bottom"></i>
                                    </button>
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip3">
                                        <i className="ri-delete-bin-5-fill align-bottom"></i>
                                    </button>
                                    <div className="vr align-self-center mx-2"></div>
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip4">
                                        <i className="ri-mail-open-fill align-bottom"></i>
                                    </button>
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip5">
                                        <i className="ri-price-tag-3-fill align-bottom"></i>
                                    </button>
                                    <UncontrolledTooltip placement="top" target="Tooltip1"> Archive </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip2"> Report Spam </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip3"> Trash </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip4"> Labels </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip5"> Labels </UncontrolledTooltip>
                                </div>
                            </div>
                            <div className="col-auto order-2 order-sm-3">
                                <div className="d-flex gap-sm-1 email-topbar-link">
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                        <i className="ri-refresh-line align-bottom"></i>
                                    </button>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-more-2-fill align-bottom"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            <DropdownItem>Mark as Unread</DropdownItem>
                                            <DropdownItem>Mark as Important</DropdownItem>
                                            <DropdownItem>Add to Tasks</DropdownItem>
                                            <DropdownItem>Add Star</DropdownItem>
                                            <DropdownItem>Mute</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                        </Row>

                        <Row className="align-items-center mt-3">
                            <Col>
                                <ul className="nav nav-tabs nav-tabs-custom nav-success gap-1 text-center border-bottom-0" role="tablist">
                                    <NavItem>
                                        <NavLink className="fw-semibold active" href="#">
                                            <i className="ri-inbox-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Primary</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="fw-semibold" href="#">
                                            <i className="ri-group-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Social</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="fw-semibold" href="#">
                                            <i className="ri-price-tag-3-fill align-bottom d-inline-block"></i>
                                            <span className="ms-1 d-none d-sm-inline-block">Promotions</span>
                                        </NavLink>
                                    </NavItem>
                                </ul>
                            </Col>
                            <div className="col-auto">
                                <div className="text-muted">1-50 of 154</div>
                            </div>
                        </Row>
                    </div>

                    <SimpleBar className="message-list-content mx-n4 px-4 message-list-scroll">
                        <ul className="message-list">
                            {
                                mailbox.map((item, key) => (
                                    <li className={item.unread ? "unread" : null} key={key}>
                                        <div className="col-mail col-mail-1">
                                            <div className="form-check checkbox-wrapper-mail fs-14">
                                                <input className="form-check-input" type="checkbox" value="" id={item.forId} />
                                                <label className="form-check-label" htmlFor={item.forId}></label>
                                            </div>
                                            <button type="button" className="btn avatar-xs p-0 favourite-btn fs-15 active">
                                                <Rating
                                                    stop={1}
                                                    emptySymbol="ri-star-fill text-muted"
                                                    fullSymbol="ri-star-fill text-warning "
                                                />
                                            </button>
                                            <Link to="#" className="title">{item.name}</Link>
                                        </div>
                                        <div className="col-mail col-mail-2" onClick={toggleRightCanvas}>
                                            <Link to="#" className="subject"> {item.badge ? <span className={"badge me-2 bg-" + item.badgeClass}>{item.badge}</span> : null} {item.subject} - <span className="teaser">{item.teaser}</span>
                                            </Link>
                                            <div className="date">{item.date}</div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </SimpleBar>
                </div>
            </div>

            <div className="email-detail-content">
                <Offcanvas isOpen={isRight} direction="end" id="offcanvasRight" >
                    <OffcanvasBody className="overflow-hidden">
                        <div className="pb-4 border-bottom border-bottom-dashed">
                            <Row>
                                <Col>
                                    <div className="">
                                        <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email" onClick={toggleRightCanvas}>
                                            <i className="ri-close-fill align-bottom"></i>
                                        </button>
                                    </div>
                                </Col>
                                <Col className="col-auto">
                                    <div className="hstack gap-sm-1 align-items-center flex-wrap email-topbar-link">
                                        <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16 favourite-btn active">
                                            <Rating
                                                stop={1}
                                                emptySymbol="ri-star-fill text-warning align-bottom"
                                                fullSymbol="ri-star-fill text-muted align-bottom"
                                            />
                                        </button>
                                        <button className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-printer-fill align-bottom"></i>
                                        </button>
                                        <button className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-delete-bin-5-fill align-bottom"></i>
                                        </button>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                                <i className="ri-more-2-fill align-bottom"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>Mark as Unread</DropdownItem>
                                                <DropdownItem>Mark as Important</DropdownItem>
                                                <DropdownItem>Add to Tasks</DropdownItem>
                                                <DropdownItem>Add Star</DropdownItem>
                                                <DropdownItem>Mute</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <SimpleBar className="mx-n4 px-4 email-detail-content-scroll" style={{ height: "100vh" }}>
                            <div className="mt-4 mb-3">
                                <h5 className="fw-bold">New updates for Skote Theme</h5>
                            </div>
                            <div className="accordion accordion-flush">
                                <div className="accordion-item border-dashed">
                                    <div className="accordion-header">
                                        <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id="email-collapseOne">
                                            <div className="d-flex align-items-center text-muted">
                                                <div className="flex-shrink-0 avatar-xs me-3">
                                                    <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="fs-14 text-truncate mb-0">Jack Davis</h5>
                                                    <div className="text-truncate fs-12">to: me</div>
                                                </div>
                                                <div className="flex-shrink-0 align-self-start">
                                                    <div className="text-muted fs-12">09 Jan 2022, 11:12 AM</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <UncontrolledCollapse toggler="#email-collapseOne" className="accordion-collapse collapse">
                                        <div className="accordion-body text-body px-0">
                                            <div>
                                                <p>Hi,</p>
                                                <p>Praesent dui ex, dapibus eget mauris ut, finibus vestibulum enim. Quisque arcu leo, facilisis in fringilla id, luctus in tortor.
                                                </p>
                                                <p>Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum orci non tincidunt ultrices.</p>
                                                <p>Sincerly,</p>

                                                <div className="d-flex gap-3">
                                                    <div className="border rounded avatar-xl h-auto">
                                                        <img src={img2} alt="" className="img-fluid rouned-top" />
                                                        <div className="py-2 text-center">
                                                            <a href="/#" className="d-block fw-semibold">Download</a>
                                                        </div>
                                                    </div>
                                                    <div className="border rounded avatar-xl h-auto">
                                                        <img src={img6} alt="" className="img-fluid rouned-top" />
                                                        <div className="py-2 text-center">
                                                            <a href="/#" className="d-block fw-semibold">Download</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </UncontrolledCollapse>
                                </div>


                                <div className="accordion-item border-dashed">
                                    <div className="accordion-header">
                                        <a href='/#' role="button" className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed"
                                            data-bs-toggle="collapse" id="email-collapseTwo"
                                            aria-expanded="true" aria-controls="email-collapseTwo">
                                            <div className="d-flex align-items-center text-muted">
                                                <div className="flex-shrink-0 avatar-xs me-3">
                                                    <img src={avatar1} alt="" className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="fs-14 text-truncate mb-0">Anna Adame</h5>
                                                    <div className="text-truncate fs-12">to: jackdavis@email.com</div>
                                                </div>
                                                <div className="flex-shrink-0 align-self-start">
                                                    <div className="text-muted fs-12">09 Jan 2022, 02:15 PM</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <UncontrolledCollapse toggler="#email-collapseTwo" className="accordion-collapse collapse">
                                        <div className="accordion-body text-body px-0">
                                            <div>
                                                <p>Hi,</p>
                                                <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                                                <p>Thank you</p>
                                            </div>
                                        </div>
                                    </UncontrolledCollapse>
                                </div>

                                <div className="accordion-item border-dashed">
                                    <div className="accordion-header">
                                        <a href='/#' role="button" className="btn w-100 text-start px-0 bg-transparent shadow-none"
                                            data-bs-toggle="collapse" id="email-collapseThree"
                                            aria-expanded="true" aria-controls="email-collapseThree">
                                            <div className="d-flex align-items-center text-muted">
                                                <div className="flex-shrink-0 avatar-xs me-3">
                                                    <img src={avatar3} alt="" className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="fs-14 text-truncate mb-0">Jack Davis</h5>
                                                    <div className="text-truncate fs-12">to: me</div>
                                                </div>
                                                <div className="flex-shrink-0 align-self-start">
                                                    <div className="text-muted fs-12">10 Jan 2022, 10:08 AM</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <UncontrolledCollapse toggler="#email-collapseThree" className="accordion-collapse collapse" defaultOpen>
                                        <div className="accordion-body text-body px-0">
                                            <div>
                                                <p>Hi,</p>
                                                <p>Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar pronunciation.</p>
                                                <p>Thank you</p>
                                            </div>
                                        </div>
                                    </UncontrolledCollapse>
                                </div>

                            </div>
                        </SimpleBar>
                    </OffcanvasBody>
                    <div className="mt-auto p-4">
                        <form className="mt-2">
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Reply :</label>
                                <textarea className="form-control border-bottom-0 rounded-top rounded-0 border" id="exampleFormControlTextarea1" rows="3" placeholder="Enter message"></textarea>
                                <div className="bg-light px-2 py-1 rouned-bottom border">
                                    <Row>
                                        <Col>
                                            <ButtonGroup>
                                                <Button size='sm' color='light' id="Bold1"><i className="ri-bold align-bottom"></i></Button>
                                                <Button size='sm' color='light' id="Italic1"><i className="ri-italic align-bottom"></i></Button>
                                                <Button size='sm' color='light' id="Link1"><i className="ri-link align-bottom"></i></Button>
                                                <Button size='sm' color='light' id="Image1"><i className="ri-image-2-line align-bottom"></i></Button>
                                            </ButtonGroup>
                                            <UncontrolledTooltip placement="top" target="Bold1"> Bold </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Italic1"> Italic </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Link1"> Link </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Image1"> Image </UncontrolledTooltip>
                                        </Col>
                                        <Col className="col-auto">
                                            <UncontrolledButtonDropdown>
                                                <Button color="success" className="btn-sm"><i className="ri-send-plane-2-fill align-bottom" /></Button>
                                                <DropdownToggle tag="button" className="btn btn-success btn-sm" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem><i className="ri-timer-line text-muted me-1 align-bottom" /> Schedule Send</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </div>
                </Offcanvas>
            </div>

        </React.Fragment>
    );
};

export default EmailToolbar;