import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import KYC from './KYCVerification';
import MetaTags from 'react-meta-tags';


const KYCVerification = () => {
    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
          <title>KYC Application | Velzon - React Admin & Dashboard Template</title>
        </MetaTags>
                <Container fluid>
                    <BreadCrumb title="KYC Application" pageTitle="Crypto" />
                    <Row>
                        <KYC />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default KYCVerification;