import React from 'react';
import { Container } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import EmailSidebar from './EmailSidebar';
import EmailToolbar from './EmailToolbar';

const MailInbox = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                <MetaTags>
                    <title>Mailbox | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                    <div className="email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <EmailSidebar />
                        <EmailToolbar />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MailInbox;