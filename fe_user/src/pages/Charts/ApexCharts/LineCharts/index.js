import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    BasicLineCharts,
    ZoomableTimeseries,
    LinewithDataLabels,
    DashedLine,
    LinewithAnnotations,
    BrushChart,
    BrushChart1,
    SteplineChart,
    GradientCharts,
    MissingData,
} from "./LineCharts";

const LineCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
                    <title>Line Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Line Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Line Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <BasicLineCharts />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Zoomable Timeseries</h4>
                                </CardHeader>
                                <CardBody>
                                    <ZoomableTimeseries />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line with Data Labels</h4>
                                </CardHeader>
                                <CardBody>
                                    <LinewithDataLabels />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Dashed Line</h4>
                                </CardHeader>
                                <CardBody>
                                    <DashedLine />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line with Annotations</h4>
                                </CardHeader>
                                <CardBody>
                                    <LinewithAnnotations />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Brush Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <BrushChart />
                                    </div>
                                    <div>
                                        <BrushChart1 />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stepline Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <SteplineChart />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Brush Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <GradientCharts />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stepline Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <MissingData />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LineCharts;