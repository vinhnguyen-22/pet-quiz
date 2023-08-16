import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Watchlist from './Watchlist';
import PortfolioStatistics from './PortfolioStatistics';
import MarketStatus from './MarketStatus';
import Widgets from './Widgets';
import MetaTags from 'react-meta-tags';
import RecentTransaction from './RecentTransaction';

const MyWallet = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>My Wallet | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="My Wallet" pageTitle="Crypto" />
                    <Row>
                        <Col xxl={9}>
                            <PortfolioStatistics />
                            <Watchlist />
                            <MarketStatus />
                        </Col>
                        <Col xxl={3}>
                            <Widgets />
                            <RecentTransaction />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MyWallet;
