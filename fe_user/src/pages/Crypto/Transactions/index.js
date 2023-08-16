import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllTransactions from './AllTransactions';
import MetaTags from 'react-meta-tags';
import Widgets from './Widgets';

const Transactions = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Transactions | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Transactions" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <AllTransactions />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Transactions;