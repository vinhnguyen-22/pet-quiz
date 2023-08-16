import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Widgets from './Widgets';
import MetaTags from 'react-meta-tags';
import ICO from './ICO';

const ICOList = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>ICO LIST | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="ICO LIST" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <ICO />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ICOList;