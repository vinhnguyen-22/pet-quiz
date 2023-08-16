import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import {
    Basic,
    CustomDataLabel,
    Stacked,
    Stacked2,
    Negative,
    Markers,
    Reversed,
    Patterned,
    Groupes,
    BarwithImages
} from "./BarCharts";

const BarCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
                    <title>Bar Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Bar Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Bar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Basic />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Custom DataLabels Bar</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomDataLabel />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stacked Bar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Stacked />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stacked Bars 100</h4>
                                </CardHeader>
                                <CardBody>
                                    <Stacked2 />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Bar with Negative Values</h4>
                                </CardHeader>
                                <CardBody>
                                    <Negative />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Bar with Markers</h4>
                                </CardHeader>
                                <CardBody>
                                    <Markers />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Reversed Bar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Reversed />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Patterned Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Patterned />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Grouped Bar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Groupes />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Bar with Images</h4>
                                </CardHeader>
                                <CardBody>
                                    <BarwithImages />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BarCharts;