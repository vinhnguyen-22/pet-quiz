import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import MetaTags from 'react-meta-tags';
import MarketGraph from './MarketGraph';
import MyCurrencies from './MyCurrencies';
import MyPortfolio from './MyPortfolio';
import NewsFeed from './NewsFeed';
import RecentActivity from './RecentActivity';
import TopPerformers from './TopPerformers';
import Trading from './Trading';
import Widgets from './Widgets';
import Widgets1 from './Widgets1';

const DashboardCrypto = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <MetaTags>
                        <title>Crypto Dashboard | Velzon - React Admin & Dashboard Template</title>
                    </MetaTags>
                    <BreadCrumb title="Crypto" pageTitle="Dashboards" />
                    <Row>
                        <MyPortfolio />
                        <Col className="order-xxl-0 order-first">
                            <Row>
                                <Widgets />
                                <MarketGraph />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Widgets1 />
                    </Row>
                    <Row>
                        <MyCurrencies />
                        <Trading />
                    </Row>
                    <Row>
                        <RecentActivity />
                        <TopPerformers />
                        <NewsFeed />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardCrypto;