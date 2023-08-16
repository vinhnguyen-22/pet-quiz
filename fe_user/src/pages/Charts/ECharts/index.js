import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import {LineChart,StackedLineChart,AreaChart,StackedAreaChart,StepLineChart,LineYChart,BasicBarChart,
        BarLabelChart,HorizontalBarChart,StackedHorizontalBarChart,PieChart,DoughnutChart,BasicScatterChart,
        CandleStickChart,GraphChart,TreemapChart,SunburstChart,ParallelChart,SankeyChart,FunnelChart,GaugeChart,HeatmapChart
        } from './ECharts'

const Echarts = () => {
    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>E Charts| Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <BreadCrumb title="E Charts" pageTitle="Charts" />
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
                                <h4 className="card-title mb-0">Stacked Line Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <StackedLineChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Area Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <AreaChart />
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Stacked Area Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <StackedAreaChart />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Step Line</h4>
                            </CardHeader>
                            <div className="card-body">
                                <StepLineChart/>
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Line Y Category</h4>
                            </CardHeader>
                            <div className="card-body">
                                <LineYChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Basic Bar</h4>
                            </CardHeader>
                            <div className="card-body">
                                <BasicBarChart/>
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Bar Label</h4>
                            </CardHeader>
                            <div className="card-body">
                                <BarLabelChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Horizontal Bar</h4>
                            </CardHeader>
                            <div className="card-body">
                                <HorizontalBarChart />
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Stacked Horizontal Bar</h4>
                            </CardHeader>
                            <div className="card-body">
                                <StackedHorizontalBarChart />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Pie Charts</h4>
                            </CardHeader>
                            <div className="card-body">
                                <PieChart />
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Doughnut Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <DoughnutChart />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Basic Scatter Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <BasicScatterChart />
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Candlestick Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <CandleStickChart />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Graph Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <GraphChart/>
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Treemap Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <TreemapChart />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Sunburst Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <SunburstChart/>
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Parallel Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <ParallelChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Sankey Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <SankeyChart/>
                            </div>
                        </Card>
                    </Col>


                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Funnel Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <FunnelChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Gauge Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <GaugeChart/>
                            </div>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title mb-0">Heatmap Chart</h4>
                            </CardHeader>
                            <div className="card-body">
                                <HeatmapChart/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Echarts