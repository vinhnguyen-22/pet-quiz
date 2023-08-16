import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    Basic,
    Scatter
} from "./BoxplotCharts";

const BoxplotCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
                    <title>Boxplot Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Boxplot Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Candlestick Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Basic />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Boxplot with Scatter Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Scatter />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BoxplotCharts;