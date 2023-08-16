import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import {SimpleRadar,MultipleRadar,PolygonRadar} from './RadarCharts';

const RadarCharts = () => {
    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Radar Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <BreadCrumb title="Radar Charts" pageTitle="Apexcharts" />
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Basic Radar Chart</h4>
                            </CardHeader>

                            <CardBody>
                                <SimpleRadar/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Radar Chart - Multiple series</h4>
                            </CardHeader>
                            <CardBody>
                                <MultipleRadar/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Radar Chart - Polygon Fill</h4>
                            </CardHeader>
                            <CardBody>
                                <PolygonRadar/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RadarCharts