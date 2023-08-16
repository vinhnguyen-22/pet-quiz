import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import { LineChart ,BarChart,PieChart,DonutChart,PolarChart,RadarChart} from './ChartsJs';

const ChartsJs = () => {
    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Charts Js| Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <BreadCrumb title="Charts Js" pageTitle="Charts" />
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Line Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <LineChart />
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Bar Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <BarChart/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Pie Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <PieChart/>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Donut Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <DonutChart/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Polar Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <PolarChart/>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Radar Chart</h4>
                            </CardHeader>
                            <CardBody>
                                <RadarChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>

        </div>
    )
}

export default ChartsJs