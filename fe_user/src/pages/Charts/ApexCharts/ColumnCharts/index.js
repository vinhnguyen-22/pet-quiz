import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';

import {
    BasicColumn,
    ColumnWithLable,
    StackedColumn,
    StackedColumn2,
    ColumnMarker,
    RotateLable,
    NagetiveLable,
    RangeColumn,
    DynamicColumn,
    Quarter,
    DistributedColumn
} from "./ColumnCharts";

const ColumnCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
                    <title>Column Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Column Charts" pageTitle="Apexcharts" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Column Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <BasicColumn />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Column with Data Labels</h4>
                                </CardHeader>
                                <CardBody>
                                    <ColumnWithLable />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stacked Column Charts</h4>
                                </CardHeader>
                                <CardBody>
                                    <StackedColumn />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stacked Column 100</h4>
                                </CardHeader>
                                <CardBody>
                                    <StackedColumn2 />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Column with Markers</h4>
                                </CardHeader>
                                <CardBody>
                                    <ColumnMarker />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Column with Rotated Labels</h4>
                                </CardHeader>
                                <CardBody>
                                    <RotateLable />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Column with Nagetive Values</h4>
                                </CardHeader>
                                <CardBody>
                                    <NagetiveLable />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Range Column Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <RangeColumn />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Dynamic Loaded Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="dynamicloadedchart-wrap" dir="ltr">
                                        <div id="chart-year" className="apex-charts">
                                            <DynamicColumn />
                                        </div>
                                        <div id="chart-quarter" className="apex-charts">
                                            <Quarter />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Distributed Columns Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <DistributedColumn />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ColumnCharts;