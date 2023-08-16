import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import {
    Simple,
    ThreeDBubble
} from './BubbleChart';

const BubbleChart = () => {
    return (
        <React.Fragment> 
            <div className="page-content">
                <MetaTags>
                    <title>Bubble Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Bubble Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Candlestick Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Simple />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">3D Bubble Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <ThreeDBubble />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BubbleChart;