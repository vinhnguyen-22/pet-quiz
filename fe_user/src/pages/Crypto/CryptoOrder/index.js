import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AllOrders from './AllOrders';
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../../../store/actions";
import MetaTags from 'react-meta-tags';


const CryproOrder = () => {
    const dispatch = useDispatch();

    const { orderList } = useSelector((state) => ({
        orderList: state.Crypto.orderList,
    }));

    useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="page-content">
            <MetaTags>
                    <title>Orders | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Orders" pageTitle="Crypto" />
                    <Row>
                        <AllOrders orderList={orderList} />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CryproOrder;