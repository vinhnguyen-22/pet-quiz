import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Button, Card, CardBody, Col, Container, Input, Modal, ModalBody, ModalHeader, PopoverBody, PopoverHeader, Row, UncontrolledPopover, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

// Import Content
import UiContent from '../../../Components/Common/UiContent';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { DefaultModalExample, CenteredModalExample, GridsModalExample, StaticBackdropModalExample, TogglebetweenExample, TooltipModalExample, ScrollableModalExample, VaryingModalExample, OptionalModalExample, FullscreenResponsiveExample, AnimationModalExample, PositionModalExample } from './UiModalCode';

const UiModals = () => {

    const [modal_standard, setmodal_standard] = useState(false);
    function tog_standard() {
        setmodal_standard(!modal_standard);
    }

    const [modal_center, setmodal_center] = useState(false);
    function tog_center() {
        setmodal_center(!modal_center);
    }

    const [modal_grid, setmodal_grid] = useState(false);
    function tog_grid() {
        setmodal_grid(!modal_grid);
    }

    const [modal_tooltip, setmodal_tooltip] = useState(false);
    function tog_tooltip() {
        setmodal_tooltip(!modal_tooltip);
    }


    const [modal_fullscreen, setmodal_fullscreen] = useState(false);
    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen);
    }

    const [modal_xlarge, setmodal_xlarge] = useState(false);
    function tog_xlarge() {
        setmodal_xlarge(!modal_xlarge);
    }

    const [modal_large, setmodal_large] = useState(false);
    function tog_large() {
        setmodal_large(!modal_large);
    }

    const [modal_small, setmodal_small] = useState(false);
    function tog_small() {
        setmodal_small(!modal_small);
    }

    const [modal_fullscreen1, setmodal_fullscreen1] = useState(false);
    function tog_fullscreen1() {
        setmodal_fullscreen1(!modal_fullscreen1);
    }

    const [modal_fullscreen_sm, setmodal_fullscreen_sm] = useState(false);
    function tog_fullscreen_sm() {
        setmodal_fullscreen_sm(!modal_fullscreen_sm);
    }

    const [modal_fullscreen_md, setmodal_fullscreen_md] = useState(false);
    function tog_fullscreen_md() {
        setmodal_fullscreen_md(!modal_fullscreen_md);
    }

    const [modal_fullscreen_lg, setmodal_fullscreen_lg] = useState(false);
    function tog_fullscreen_lg() {
        setmodal_fullscreen_lg(!modal_fullscreen_lg);
    }

    const [modal_fullscreen_xl, setmodal_fullscreen_xl] = useState(false);
    function tog_fullscreen_xl() {
        setmodal_fullscreen_xl(!modal_fullscreen_xl);
    }

    const [modal_fullscreen_xxl, setmodal_fullscreen_xxl] = useState(false);
    function tog_fullscreen_xxl() {
        setmodal_fullscreen_xxl(!modal_fullscreen_xxl);
    }

    const [modal_scroll, setmodal_scroll] = useState(false);
    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }

    const [modal_backdrop, setmodal_backdrop] = useState(false);
    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
    }

    const [modal_varying1, setmodal_varying1] = useState(false);
    function tog_varying1() {
        setmodal_varying1(!modal_varying1);
    }

    const [modal_varying2, setmodal_varying2] = useState(false);
    function tog_varying2() {
        setmodal_varying2(!modal_varying2);
    }

    const [modal_varying3, setmodal_varying3] = useState(false);
    function tog_varying3() {
        setmodal_varying3(!modal_varying3);
    }

    const [modal_togFirst, setmodal_togFirst] = useState(false);
    function tog_togFirst() {
        setmodal_togFirst(!modal_togFirst);
    }

    const [modal_togSecond, setmodal_togSecond] = useState(false);
    function tog_togSecond() {
        setmodal_togSecond(!modal_togSecond);
    }

    const [modal_animationRight, setmodal_animationRight] = useState(false);
    function tog_animationRight() {
        setmodal_animationRight(!modal_animationRight);
    }

    const [modal_animationLeft, setmodal_animationLeft] = useState(false);
    function tog_animationLeft() {
        setmodal_animationLeft(!modal_animationLeft);
    }

    const [modal_animationUp, setmodal_animationUp] = useState(false);
    function tog_animationUp() {
        setmodal_animationUp(!modal_animationUp);
    }

    const [modal_animationFlip, setmodal_animationFlip] = useState(false);
    function tog_animationFlip() {
        setmodal_animationFlip(!modal_animationFlip);
    }

    const [modal_animationZoom, setmodal_animationZoom] = useState(false);
    function tog_animationZoom() {
        setmodal_animationZoom(!modal_animationZoom);
    }

    const [modal_positionTop, setmodal_positionTop] = useState(false);
    function tog_positionTop() {
        setmodal_positionTop(!modal_positionTop);
    }

    const [modal_positionTopRight, setmodal_positionTopRight] = useState(false);
    function tog_positionTopRight() {
        setmodal_positionTopRight(!modal_positionTopRight);
    }

    const [modal_positionBottom, setmodal_positionBottom] = useState(false);
    function tog_positionBottom() {
        setmodal_positionBottom(!modal_positionBottom);
    }

    const [modal_positionBottomRight, setmodal_positionBottomRight] = useState(false);
    function tog_positionBottomRight() {
        setmodal_positionBottomRight(!modal_positionBottomRight);
    }

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <MetaTags>
                    <title>Modals | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Modals" pageTitle="Base UI" />
                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Default Modal" />

                                <CardBody>
                                    <p className="text-muted text-muted">A default modal Example.</p>
                                    <div className="live-preview">
                                        <div>
                                            <Button color="primary" onClick={() => tog_standard()}>Standard Modal</Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <DefaultModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Vertically Centered Modal" />

                                <CardBody>
                                    <p className="text-muted">Use <code>modal-dialog-centered</code> class to show vertically center the modal.</p>
                                    <div className="live-preview">
                                        <div>
                                            <Button color="primary" onClick={() => tog_center()}>Center Modal</Button>
                                        </div>
                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <CenteredModalExample />
                                            </code>
                                        </pre>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Grids in Modals" />
                                <CardBody>
                                    <div className="live-preview">
                                        <Button color="primary" onClick={() => tog_grid()}>
                                            Launch Demo Modal
                                        </Button>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <GridsModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Static Backdrop Modal" />
                                <CardBody>
                                    <div className="live-preview">
                                        <div>
                                            <Button color="primary" onClick={() => tog_backdrop()}>
                                                Static Backdrop Modal
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <StaticBackdropModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Toggle Between Modal" />
                                <CardBody>
                                    <div className="live-preview">
                                        <div>
                                            <Button color="primary" onClick={() => tog_togFirst()}>Open First Modal</Button>
                                        </div>

                                    </div>

                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <TogglebetweenExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Tooltips and Popovers" />
                                <CardBody>

                                    <div className="live-preview">
                                        <Button color="primary" onClick={() => tog_tooltip()}>
                                            Launch Demo Modal
                                        </Button>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <TooltipModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Scrollable Modal" />
                                <CardBody>
                                    <div className="live-preview">
                                        <div>
                                            <Button color="primary" onClick={() => tog_scroll()}>Scrollable Modal</Button>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <ScrollableModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xxl={6}>
                            <Card>
                                <PreviewCardHeader title="Varying Modal Content" />
                                <CardBody>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button color="primary" onClick={() => tog_varying1()} >Open Modal for Mary</Button>
                                                <Button color="primary" onClick={() => tog_varying2()} >Open Modal for Jennifer</Button>
                                                <Button color="primary" onClick={() => tog_varying3()}>Open Modal for Roderick</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <VaryingModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Optional Sizes" />
                                <CardBody>
                                    <p className="text-muted">Use <code>modal-fullscreen</code>, <code>modal-xl</code>, <code>modal-lg</code>, or <code>modal-sm</code> class to modal-dialog class to set different size modal respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack flex-wrap gap-2">

                                                {/* <!-- Fullscreen modal --> */}
                                                <Button color="primary" onClick={() => tog_fullscreen(true)}>Fullscreen Modal</Button>


                                                {/* <!-- Extra Large modal --> */}
                                                <Button color="info" onClick={() => tog_xlarge(true)}>Extra large Modal</Button>


                                                {/* <!-- Large modal --> */}
                                                <Button color="success" onClick={() => tog_large(true)}>Large Modal</Button>


                                                {/* <!-- Small modal --> */}
                                                <Button color="danger" onClick={() => tog_small(true)}>Small Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <OptionalModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Fullscreen Responsive Modals" />
                                <CardBody>
                                    <p className="text-muted text-muted">Below mentioned modifier classes are used to show fullscreen modal as per minimum screen requirement.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button color="primary" onClick={() => tog_fullscreen1()}> Fullscreen modal </Button>
                                                <Button color="primary" onClick={() => tog_fullscreen_sm()}>Full Screen Below sm</Button>
                                                <Button color="primary" onClick={() => tog_fullscreen_md()}>Full Screen Below md</Button>
                                                <Button color="primary" onClick={() => tog_fullscreen_lg()}>Full Screen Below lg</Button>
                                                <Button color="primary" onClick={() => tog_fullscreen_xl()}>Full Screen Below xl</Button>
                                                <Button color="primary" onClick={() => tog_fullscreen_xxl()}>Full Screen Below xxl</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <FullscreenResponsiveExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Animation Modals" />
                                <CardBody>
                                    <p className="text-muted">Use <code>fadeInRight</code>, <code>fadeInLeft</code>, <code>fadeInUp</code>, <code>flip</code>, or <code>zoomIn</code> class to modal class to set different modal with animation effect respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button color="primary" onClick={() => tog_animationRight()}>Fade In Right Modal</Button>
                                                <Button color="primary" onClick={() => tog_animationLeft()} >Fade In Left Modal</Button>
                                                <Button color="primary" onClick={() => tog_animationUp()} >Fade In Up Modal</Button>
                                                <Button color="primary" onClick={() => tog_animationFlip()} >Flip Modal</Button>
                                                <Button color="primary" onClick={() => tog_animationZoom()} >Zoom In Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <AnimationModalExample />
                                            </code>
                                        </pre>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Modal Positions" />
                                <CardBody>
                                    <p className="text-muted text-muted">Use <code>modal-dialog-right</code>, <code>modal-dialog-bottom</code>, or <code>modal-dialog-bottom-right</code> class to modal-dialog class to set modal at different positions respectively.</p>
                                    <div className="live-preview">
                                        <div>
                                            <div className="hstack gap-2 flex-wrap">
                                                <Button color="primary" onClick={() => tog_positionTop()}>Top Modal</Button>
                                                <Button color="secondary" onClick={() => tog_positionTopRight()}>Top Right Modal</Button>
                                                <Button color="success" onClick={() => tog_positionBottom()}>Bottom Modal</Button>
                                                <Button color="danger" onClick={() => tog_positionBottomRight()}>Bottom Right Modal</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ height: "275px" }}>
                                            <code>
                                                <PositionModalExample />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Default Modal */}
            <Modal id="myModal"
                isOpen={modal_standard}
                toggle={() => {
                    tog_standard();
                }}
            >
                <ModalHeader className="modal-title"
                    id="myModalLabel" toggle={() => {
                        tog_standard();
                    }}>

                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-15">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                    <p className="text-muted">It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => {
                            tog_standard();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        color="primary"
                    >
                        Save changes
                    </Button>
                </div>
            </Modal>

            {/* Vertically Centered */}
            <Modal
                isOpen={modal_center}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <ModalHeader className="modal-title" />

                <ModalBody className="text-center p-5">
                    <lord-icon src="https://cdn.lordicon.com/hrqwmuhr.json"
                        trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                    </lord-icon>
                    <div className="mt-4">
                        <h4 className="mb-3">Oops something went wrong!</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Button color="light" onClick={() => setmodal_center(false)}>Close</Button>
                            <Link to="#" className="btn btn-danger">Try Again</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Grids in Modals */}
            <Modal
                isOpen={modal_grid}
                toggle={() => {
                    tog_grid();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    tog_grid();
                }}>
                    Grid Modals

                </ModalHeader>
                <ModalBody>
                    <form action="#">
                        <div className="row g-3">
                            <Col xxl={6}>
                                <div>
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <Input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <div>
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <Input type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <label className="form-label">Gender</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                        <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                                    </div>
                                </div>
                            </Col>
                            <Col xxl={6}>
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <Input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                            </Col>
                            <Col xxl={6}>
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <Input type="password" className="form-control" id="passwordInput" value="451326546" readOnly />
                            </Col>
                            <Col lg={12}>
                                <div className="hstack gap-2 justify-content-end">
                                    <Button color="light" onClick={() => setmodal_grid(false)}>Close</Button>
                                    <Button color="primary" >Submit</Button>
                                </div>
                            </Col>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

            {/* Static Backdrop Modal */}
            <Modal
                isOpen={modal_backdrop}
                toggle={() => {
                    tog_backdrop();
                }}
                backdrop={'static'}
                id="staticBackdrop"
                centered
            >
                <ModalHeader className="modal-title" id="staticBackdropLabel" toggle={() => {
                    tog_backdrop();
                }}>
                    Modal title

                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon
                        src="https://cdn.lordicon.com/lupuorrc.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style={{ width: "120px", height: "120px" }}>
                    </lord-icon>

                    <div className="mt-4">
                        <h4 className="mb-3">You've made it!</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_backdrop(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link to="#" className="btn btn-success" onClick={() => setmodal_backdrop(false)}>Completed</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Toggle Between Modal */}

            <Modal
                isOpen={modal_togFirst}
                toggle={() => {
                    tog_togFirst();
                }}
                id="firstmodal"
                centered
            >
                <ModalHeader className="modal-title" id="exampleModalToggleLabel" toggle={() => {
                    tog_togFirst();
                }}>
                    Modal 1

                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon
                        src="https://cdn.lordicon.com/tdrtiskw.json"
                        trigger="loop"
                        colors="primary:#f7b84b,secondary:#405189"
                        style={{ width: "130px", height: "130px" }}>
                    </lord-icon>
                    <div className="mt-4 pt-4">
                        <h4>Uh oh, something went wrong!</h4>
                        <p className="text-muted"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>

                        <Button color="warning" onClick={() => { tog_togSecond(); tog_togFirst(false); }}>
                            Continue
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal
                isOpen={modal_togSecond}
                toggle={() => {
                    tog_togSecond();
                }}
                id="secondmodal"
                centered
            >
                <ModalHeader className="modal-title" id="exampleModalToggleLabel2" toggle={() => {
                    tog_togSecond();
                }}>
                    Modal 2

                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon
                        src="https://cdn.lordicon.com/zpxybbhl.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: "150px", height: "150px" }}>
                    </lord-icon>
                    <div className="mt-4 pt-3">
                        <h4 className="mb-3">Follow-Up Email</h4>
                        <p className="text-muted mb-4">Hide this modal and show the first with the button below Automatically Send your invitees a follow -Up email.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Button color="danger" onClick={() => { tog_togFirst(); tog_togSecond(false); }}>
                                Back to First
                            </Button>
                            <Button color="light" onClick={() => tog_togSecond(false)}>Close</Button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>

            {/* Tooltips and Popovers */}
            <Modal
                isOpen={modal_tooltip}
                toggle={() => {
                    tog_tooltip();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    tog_tooltip();
                }}>
                    Tooltips and Popovers Modal
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">Popover in a Modal</h5>
                    <p className="text-muted">You only need to know a little to make a big
                        {" "}<Link to="#" className="popover-test fw-medium text-decoration-underline link-success" id="UncontrolledPopover">
                            Popover on Click
                        </Link>{" "}
                        you do every day. So let's get started. First, some common types of fonts and what you need to know about them triggers a popover on click.</p>
                    <UncontrolledPopover placement="bottom" target="UncontrolledPopover" >
                        <PopoverHeader> Common Types of Fonts </PopoverHeader>
                        <PopoverBody> They're a good choice for more traditional projects. </PopoverBody>
                    </UncontrolledPopover>

                    <h5 className="fs-16">Tooltips in a Modal</h5>
                    <p className="text-muted">Opposites attract, and that’s a fact. It’s in our
                        {" "}<Link to="#" className="tooltip-test text-decoration-underline fw-medium" id="UncontrolledTooltip1">
                            graphic design
                        </Link>{" "} to be interested in the unusual, and that’s why using
                        {" "}<Link to="#" className="tooltip-test text-decoration-underline" id="UncontrolledTooltip2">
                            design
                        </Link> contrasting colors in Graphic Design is a must.</p>
                    <UncontrolledTooltip placement="top" target="UncontrolledTooltip1" > Morton Bayer </UncontrolledTooltip>
                    <UncontrolledTooltip placement="top" target="UncontrolledTooltip2" > Web Developers </UncontrolledTooltip>
                </ModalBody>
                <div className="modal-footer">
                    <div className="mx-auto">
                        <Link to="#" className="btn btn-link fw-medium">Read More <i className="ri-arrow-right-line ms-1 align-middle"></i></Link>
                    </div>
                </div>
            </Modal>

            {/* Scrollable Modal  */}
            <Modal
                isOpen={modal_scroll}
                toggle={() => {
                    tog_scroll();
                }}
                scrollable={true}
                id="exampleModalScrollable"
            >
                <ModalHeader className="modal-title" id="exampleModalScrollableTitle" toggle={() => {
                    tog_scroll();
                }}>
                    Scrollable modal
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </ModalBody>

                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => setmodal_scroll(false)}
                    >
                        Close
                    </Button>
                    <Button
                        color="primary"
                    >
                        Save changes
                    </Button>
                </div>
            </Modal>


            {/* Full Screen Modal */}
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => {
                    tog_fullscreen();
                }}
                className="modal-fullscreen"
                id="exampleModalFullscreen"
            >
                <ModalHeader className="modal-title"
                    id="exampleModalFullscreenLabel" toggle={() => {
                        tog_fullscreen();
                    }}>
                    Fullscreen Modal Heading

                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to='#'
                        color="light"
                        onClick={() => {
                            tog_fullscreen();
                        }}
                        className="btn btn-link link-success fw-medium"
                    ><i className="ri-close-line me-1 align-middle" />
                        Close
                    </Link>
                    <Button
                        color="primary"
                        className="btn btn-primary "
                    >
                        Save changes
                    </Button>
                </div>
            </Modal>

            {/* Extra Large Modal */}
            <Modal
                size="xl"
                isOpen={modal_xlarge}
                toggle={() => {
                    tog_xlarge();
                }}
            >
                <ModalHeader className="modal-title"
                    id="myExtraLargeModalLabel" toggle={() => {
                        tog_xlarge();
                    }}>

                    Extra large modal

                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_xlarge(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary">Save changes</Button>
                </div>
            </Modal>


            {/* Large Modal */}
            <Modal
                size="lg"
                isOpen={modal_large}
                toggle={() => {
                    tog_large();
                }}
            >
                <ModalHeader className="modal-title"
                    id="myLargeModalLabel" toggle={() => {
                        tog_large();
                    }}>

                    Large Modal

                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Just like in the image where we talked about using multiple fonts, you can see that the background in this graphic design is blurred. Whenever you put text on top of an image, it’s important that your viewers can understand.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_large(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary">Save changes</Button>
                </div>
            </Modal>

            {/* Small Modal */}
            <Modal
                size="sm"
                isOpen={modal_small}
                toggle={() => {
                    tog_small();
                }}
            >
                <ModalHeader className="modal-title"
                    id="mySmallModalLabel" toggle={() => {
                        tog_small();
                    }}>

                    Small Modal

                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_small(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary">Save changes</Button>
                </div>
            </Modal>

            {/* Fullscreen Responsive Modals */}
            <Modal
                size="xl"
                isOpen={modal_fullscreen1}
                toggle={() => {
                    tog_fullscreen1();
                }}
                className="modal-fullscreen"
                id="fullscreeexampleModal"
            >
                <ModalHeader className="modal-title"
                    id="fullscreeexampleModalLabel" toggle={() => {
                        tog_fullscreen1();
                    }}>

                    Full screen modal

                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                        </div>
                    </div>
                    <h6 className="fs-16 my-3">Graphic Design</h6>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Opposites attract, and that’s a fact. It’s in our nature to be interested in the unusual, and that’s why using contrasting colors in Graphic Design is a must. It’s eye-catching, it makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to='#'
                        type="button"
                        onClick={() => {
                            tog_fullscreen1();
                        }}
                        className="btn btn-link link-success fw-medium"
                    ><i className="ri-close-line me-1 align-middle" />
                        Close
                    </Link>
                    <Button
                        color="primary"
                        className="btn btn-primary "
                    >
                        Save changes
                    </Button>
                </div>
            </Modal>

            {/* FullscreenSm */}
            <Modal id="exampleModalFullscreenSm" isOpen={modal_fullscreen_sm} toggle={() => { tog_fullscreen_sm(); }} >
                <ModalHeader className="modal-title" id="exampleModalFullscreenSmLabel" toggle={() => { tog_fullscreen_sm(); }}>
                    Full screen below sm
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_sm(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary"> Save changes </Button>
                </div>
            </Modal>

            {/* FullscreenMd */}
            <Modal id="exampleModalFullscreenMd" isOpen={modal_fullscreen_md} toggle={() => { tog_fullscreen_md(); }} >
                <ModalHeader className="modal-title" id="exampleModalFullscreenMdLabel" toggle={() => { tog_fullscreen_md(); }}>
                    Full screen below md
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_md(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* FullscreenLg */}
            <Modal id="exampleModalFullscreenLg" isOpen={modal_fullscreen_lg} toggle={() => { tog_fullscreen_lg(); }} >
                <ModalHeader className="modal-title" id="exampleModalFullscreenLgLabel" toggle={() => { tog_fullscreen_lg(); }}>
                    Full screen below lg
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_lg(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* FullscreenXl */}
            <Modal id="exampleModalFullscreenXl" isOpen={modal_fullscreen_xl} toggle={() => { tog_fullscreen_xl(); }} >
                <ModalHeader className="modal-title" id="exampleModalFullscreenXlLabel" toggle={() => { tog_fullscreen_xl(); }}>
                    Full screen below xl
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_xl(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* FullscreenXxl */}
            <Modal id="exampleModalFullscreenXxl" isOpen={modal_fullscreen_xxl} toggle={() => { tog_fullscreen_xxl(); }} >
                <ModalHeader className="modal-title" id="exampleModalFullscreenXxlLabel" toggle={() => { tog_fullscreen_xxl(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h6 className="fs-15">Give your text a good structure</h6>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                            <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin.
                                Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div className="flex-shrink-0">
                            <i className="ri-checkbox-circle-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2 ">
                            <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_fullscreen_xxl(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* modal for Mary */}
            <Modal
                isOpen={modal_varying1}
                toggle={() => {
                    tog_varying1();
                }}
                id="exampleModal"
            >
                <ModalHeader toggle={() => {
                    tog_varying1();
                }}>
                    New message to Mary

                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="customer-name" className="col-form-label">Customer Name:</label>
                            <Input type="text" className="form-control" id="customer-name" value="Mary" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Message:</label>
                            <textarea className="form-control" id="message-text" rows="4"></textarea>
                        </div>
                    </form>
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => {
                            setmodal_varying1(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button color="primary">
                        Send message
                    </Button>
                </div>
            </Modal>

            {/* modal for Jennifer */}
            <Modal
                isOpen={modal_varying2}
                toggle={() => {
                    tog_varying2();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    tog_varying2();
                }}>
                    New message to Jennifer

                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="customer-name" className="col-form-label">Customer Name:</label>
                            <Input type="text" className="form-control" id="customer-name" value="Jennifer" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Message:</label>
                            <textarea className="form-control" id="message-text" rows="4"></textarea>
                        </div>
                    </form>
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => {
                            setmodal_varying2(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button color="primary">
                        Send message
                    </Button>
                </div>
            </Modal>;

            {/* modal for Roderick */}
            <Modal
                isOpen={modal_varying3}
                toggle={() => {
                    tog_varying3();
                }}
            >
                <ModalHeader className="modal-title" toggle={() => {
                    tog_varying3();
                }}>
                    New message to Roderick

                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="customer-name" className="col-form-label">Customer Name:</label>
                            <Input type="text" className="form-control" id="customer-name" value="Roderick" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Message:</label>
                            <textarea className="form-control" id="message-text" rows="4"></textarea>
                        </div>
                    </form>
                </ModalBody>
                <div className="modal-footer">
                    <Button
                        color="light"
                        onClick={() => {
                            setmodal_varying3(false);
                        }}
                    >
                        Back
                    </Button>
                    <Button color="primary">
                        Send message
                    </Button>
                </div>
            </Modal>;

            {/* Animation Modals */}

            {/* RightSide Animation */}
            <Modal id="fadeInRightModal" isOpen={modal_animationRight} toggle={() => { tog_animationRight(); }} modalClassName="fadeInRight" centered >
                <ModalHeader className="modal-title" id="fadeInRightModalLabel" toggle={() => { tog_animationRight(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="light" onClick={() => { tog_animationRight(); }}>
                        Close
                    </Button>
                    <Button color="primary"> Save changes </Button>
                </div>
            </Modal>

            {/* LeftSide Animation */}
            <Modal id="fadeInleftModal" isOpen={modal_animationLeft} toggle={() => { tog_animationLeft(); }} modalClassName="fadeInLeft" centered >
                <ModalHeader className="modal-title" id="fadeInleftModalLabel" toggle={() => { tog_animationLeft(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="light" onClick={() => { tog_animationLeft(); }}> Close </Button>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* UpSide Animation */}
            <Modal id="fadeInUpModal" isOpen={modal_animationUp} toggle={() => { tog_animationUp(); }} modalClassName="fadeInUp" centered >
                <ModalHeader className="modal-title" id="fadeInUpModalLabel" toggle={() => { tog_animationUp(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="light" onClick={() => { tog_animationUp(); }}> Close </Button>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* Flip Animation */}
            <Modal id="flipModal" isOpen={modal_animationFlip} toggle={() => { tog_animationFlip(); }} modalClassName="flip" centered >
                <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { tog_animationFlip(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="light" onClick={() => { tog_animationFlip(); }}> Close </Button>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* ZoomIn Animation */}
            <Modal id="flipModal" isOpen={modal_animationZoom} toggle={() => { tog_animationZoom(); }} modalClassName="zoomIn" centered >
                <ModalHeader className="modal-title" id="flipModalLabel" toggle={() => { tog_animationZoom(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody>
                    <h5 className="fs-16">
                        Overflowing text to show scroll behavior
                    </h5>
                    <p className="text-muted">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
                    <p className="text-muted">The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                </ModalBody>
                <div className="modal-footer">
                    <Button color="light" onClick={() => { tog_animationZoom(); }}> Close </Button>
                    <Button color="primary" > Save changes </Button>
                </div>
            </Modal>

            {/* Position Top */}
            <Modal id="topmodal" isOpen={modal_positionTop} toggle={() => { tog_positionTop(); }} >
                <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_positionTop(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon src="https://cdn.lordicon.com/pithnlch.json"
                        trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                    </lord-icon>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_positionTop(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link to="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Position Top Right */}

            <Modal id="top-rightmodal" isOpen={modal_positionTopRight} toggle={() => { tog_positionTopRight(); }} className="modal-dialog-right" >
                <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_positionTopRight(); }} >
                    Modal Heading
                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon src="https://cdn.lordicon.com/pithnlch.json"
                        trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                    </lord-icon>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => { tog_positionTopRight(); }}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link to="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Position Bottom */}

            <Modal id="bottomModal" isOpen={modal_positionBottom} toggle={() => { tog_positionBottom(); }} className="modal-dialog-bottom" >
                <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_positionBottom(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon src="https://cdn.lordicon.com/pithnlch.json"
                        trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                    </lord-icon>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4">The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_positionBottom(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link to="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Position Bottom Right */}

            <Modal id="bottom-rightModal" isOpen={modal_positionBottomRight} toggle={() => { tog_positionBottomRight(); }} className="modal-dialog-bottom-right" >
                <ModalHeader className="modal-title" id="myModalLabel" toggle={() => { tog_positionBottomRight(); }}>
                    Modal Heading
                </ModalHeader>
                <ModalBody className="text-center p-5">
                    <lord-icon src="https://cdn.lordicon.com/pithnlch.json"
                        trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: "120px", height: "120px" }}>
                    </lord-icon>
                    <div className="mt-4">
                        <h4 className="mb-3">Your event has been created.</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                        <div className="hstack gap-2 justify-content-center">
                            <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_positionBottomRight(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link to="#" className="btn btn-success">Completed</Link>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </React.Fragment >
    );
};

export default UiModals;
