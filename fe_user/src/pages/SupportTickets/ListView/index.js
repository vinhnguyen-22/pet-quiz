import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Widgets from './Widgets';
import MetaTags from 'react-meta-tags';
import TicketsData from './TicketsData';

const ListView = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <MetaTags>
                        <title>Tickets List | Velzon - React Admin & Dashboard Template</title>
                    </MetaTags>
                    <BreadCrumb title="Tickets List" pageTitle="Tickets" />
                    <Row>
                        <Widgets />
                    </Row>
                    <TicketsData />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ListView;