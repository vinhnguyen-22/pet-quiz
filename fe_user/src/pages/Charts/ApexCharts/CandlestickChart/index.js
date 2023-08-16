import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    Basic,
    ComboCandlestick,
    ComboCandlestick1,
    Category
} from "./CandlestickChart";

const CandlestickChart = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Candlestick Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Candlestick Charts" pageTitle="Apexcharts" />
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
                                    <h4 className="card-title mb-0">Candlestick Synced with Brush Chart (Combo)</h4>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <div id="combo_candlestick">
                                            <ComboCandlestick />
                                        </div>
                                        <div id="combo_candlestick_chart">
                                            <ComboCandlestick1 />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Category X-Axis</h4>
                                </CardHeader>
                                <CardBody>
                                    <Category />
                                </CardBody>
                            </Card>
                        </Col>
                        </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CandlestickChart;