import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import {SimpleRadialbar,MultipleRadialbar,CircleRadialbar,GradientCircleRadialbar,StrokedCircleRadial,SemiCircularRadial} from './RadialbarCharts' 

const RadialbarCharts = () => {
  return (
    <div className="page-content">
            <Container fluid>                        
            <MetaTags>
                    <title>Radialbar Charts | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>               
                    <BreadCrumb title="Radialbar Charts" pageTitle="Apexcharts" />
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Simple Radialbar Chart</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <SimpleRadialbar/>
                                    </CardBody>
                                </Card>
                            </Col>                           

                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Multiple Radialbar</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <MultipleRadialbar/>
                                    </CardBody>
                                </Card>
                            </Col>                            
                        </Row>
                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Circle Chart - Custom Angle</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <CircleRadialbar/>
                                    </CardBody>
                                </Card>
                            </Col>                           

                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Gradient Circle Chart</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GradientCircleRadialbar/>
                                    </CardBody>
                                </Card>
                            </Col>                            
                        </Row>

                        <Row>
                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Stroked Circle Chart</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <StrokedCircleRadial/>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0">Semi Circular Chart</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <SemiCircularRadial/>
                                    </CardBody>
                                </Card>
                            </Col>                            
                        </Row>                       
                    </Container>                    
                </div>
  )
}

export default RadialbarCharts