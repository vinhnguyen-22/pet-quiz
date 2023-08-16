import React from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MarketGraph from './MarketGraph';
import Widgets from './Widgets';
import BuySellCoin from './BuySellCoin';
import Market from './Market';
import MetaTags from 'react-meta-tags';


const BuySell = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Buy & Sell | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Buy & Sell" pageTitle="Crypto" />
                    <Row>
                        <Widgets />
                    </Row>
                    <Row>
                        <MarketGraph />
                        <BuySellCoin />
                    </Row>
                    <Market />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BuySell;