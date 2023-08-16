import React from 'react';
import { Container } from 'reactstrap';
import Section from './Section';
import MetaTags from 'react-meta-tags';


const ProjectOverview = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Project Overview | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>                    
                <Section />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;