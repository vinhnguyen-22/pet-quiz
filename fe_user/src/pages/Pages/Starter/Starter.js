import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import MetaTags from "react-meta-tags";
import BreadCrumb from '../../../Components/Common/BreadCrumb';

const Starter = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Starter | Velzon - React Admin & Dashboard Template</title>
      </MetaTags>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row>
            <Col xs={12}>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;