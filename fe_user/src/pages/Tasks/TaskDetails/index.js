import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Comments from './Comments';
import Summary from './Summary';
import TimeTracking from "./TimeTracking";
import MetaTags from 'react-meta-tags';

const TaskDetails = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Tasks Details | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Tasks Details" pageTitle="Tasks" />
                    <Row>
                        <Col xxl={3}>
                            <TimeTracking />
                        </Col>
                        <Col xxl={9}>
                            <Summary />
                            <Comments />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskDetails;