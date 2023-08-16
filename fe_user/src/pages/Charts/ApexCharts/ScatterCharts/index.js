import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    Basic,
    Datetime,
    ImagesChart
} from "./ScatterCharts";

const ScatterCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Scatter Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Scatter Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Scatter Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Basic />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Scatter - Datetime Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Datetime />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>        
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Scatter Images Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <ImagesChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ScatterCharts;