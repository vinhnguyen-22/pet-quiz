import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    Basic,
    DifferentColor,
    MultiSeries,
    Advanced
} from "./TimelineCharts";

const TimelineCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>TimeLine Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="TimeLine Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic TimeLine Charts</h4>
                                </CardHeader>
                                <CardBody>
                                    <Basic />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Different Color For Each Bar</h4>
                                </CardHeader>
                                <CardBody>
                                    <DifferentColor />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Multi Series Timeline</h4>
                                </CardHeader>
                                <CardBody>
                                    <MultiSeries />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Advanced Timeline (Multiple Range)</h4>
                                </CardHeader>
                                <CardBody>
                                    <Advanced />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TimelineCharts;