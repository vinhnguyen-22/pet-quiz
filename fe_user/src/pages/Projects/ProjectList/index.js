import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import { getProjectList } from "../../../store/actions";


import List from './List';

const ProjectList = () => {
    const dispatch = useDispatch();

    const { projectList } = useSelector((state) => ({
        projectList: state.Projects.projectList,
    }));

    useEffect(() => {
        dispatch(getProjectList());
    }, [dispatch]);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Project List | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Project List" pageTitle="Projects" />
                    <List projectList={projectList} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectList;