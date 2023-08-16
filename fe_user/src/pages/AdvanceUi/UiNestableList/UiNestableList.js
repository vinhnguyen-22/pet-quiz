import React from 'react';
import MetaTags from 'react-meta-tags';
import { Container, Row } from 'reactstrap';
//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import Nestable Lists
import Uinestable1 from './uinestable1';
import Uinestable2 from './uinestable2';
import Uinestable3 from './uinestable3';
import Uinestable4 from './uinestable4';
import Uinestable5 from './uinestable5';

const UiNestableList = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Nestable List | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Nestable List" pageTitle="Advance UI" />
                    <Row>
                        <Uinestable1 />

                        <Uinestable2 />
                    </Row>

                    <Row>
                        <Uinestable3 />

                        <Uinestable4 />
                    </Row>

                    <Row>
                        <Uinestable5 />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default UiNestableList;
