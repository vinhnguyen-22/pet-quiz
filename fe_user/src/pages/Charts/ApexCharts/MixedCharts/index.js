import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';


import {
    Line,
    YAxis,
    Area,
    LineColumnArea
} from "./MixedCharts";

const MixedCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Mixed Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Mixed Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line & Column Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Line />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Multiple Y-Axis Charts</h4>
                                </CardHeader>
                                <CardBody>
                                    <YAxis />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line & Area Charts</h4>
                                </CardHeader>
                                <CardBody>
                                    <Area />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line, Column & Area Charts</h4>
                                </CardHeader>
                                <CardBody>
                                    <LineColumnArea />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MixedCharts;