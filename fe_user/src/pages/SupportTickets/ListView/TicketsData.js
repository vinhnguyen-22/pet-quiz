import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../Components/Common/TableContainer';
import { getTicketsList } from "../../../store/actions";
import { TicketsId, Title, Client, AssignedTo, CreateDate, DueDate, Status, Priority } from "./TicketCol";
//Import Flatepicker
import Flatpickr from "react-flatpickr";

const TicketsData = () => {
    const dispatch = useDispatch();

    const [isCreateTicket, setIsCreateTicket] = useState(false);
    const toggleModal = () => {
        setIsCreateTicket(!isCreateTicket);
    };

    const { ticketsList } = useSelector((state) => ({
        ticketsList: state.Tickets.ticketsList,
    }));

    useEffect(() => {
        dispatch(getTicketsList());
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: "#",
                Cell: () => {
                    return <Input type="checkbox" />;
                },
            },
            {
                Header: "ID",
                accessor: "ticketId",
                filterable: false,
                Cell: (cellProps) => {
                    return <TicketsId {...cellProps} />;
                },
            },
            {
                Header: "Title",
                accessor: "title",
                filterable: false,
                Cell: (cellProps) => {
                    return <Title {...cellProps} />;
                },
            },
            {
                Header: "Client",
                accessor: "client",
                filterable: false,
                Cell: (cellProps) => {
                    return <Client {...cellProps} />;
                },
            },
            {
                Header: "Assigned To",
                accessor: "assigned",
                filterable: false,
                Cell: (cellProps) => {
                    return <AssignedTo {...cellProps} />;
                },
            },
            {
                Header: "Create Date",
                accessor: "createDate",
                filterable: false,
                Cell: (cellProps) => {
                    return <CreateDate {...cellProps} />;
                },
            },
            {
                Header: "Due Date",
                accessor: "dueDate",
                filterable: false,
                Cell: (cellProps) => {
                    return <DueDate {...cellProps} />;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                filterable: false,
                Cell: (cellProps) => {
                    return <Status {...cellProps} />;
                },
            },
            {
                Header: "Priority",
                accessor: "priority",
                filterable: false,
                Cell: (cellProps) => {
                    return <Priority {...cellProps} />;
                },
            },
            {
                Header: "Actions",
                Cell: () => {
                    return (
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <li><DropdownItem href="/apps-tickets-details"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem></li>
                                <li><DropdownItem className="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem></li>
                                <li>
                                    <DropdownItem className="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                    </DropdownItem>
                                </li>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            },
        ],
        []
    );
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                                <div className="flex-shrink-0">
                                    <button onClick={toggleModal} className="btn btn-danger add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1"></i> Create Tickets</button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="border border-dashed border-end-0 border-start-0">
                            <form>
                                <Row className="g-3">
                                    <Col xxl={5} sm={12}>
                                        <div className="search-box">
                                            <Input type="text" className="form-control search bg-light border-light" placeholder="Search for ticket details or something..." />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </Col>

                                    <Col xxl={3} sm={4}>
                                        <Flatpickr
                                            className="form-control"
                                            options={{
                                                mode: "range",
                                                dateFormat: "d M, Y"
                                            }}
                                        />
                                    </Col>

                                    <Col xxl={3} sm={4}>
                                        <div className="input-light">
                                            <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                <option value="">Status</option>
                                                <option defaultValue="all">All</option>
                                                <option value="Open">Open</option>
                                                <option value="Inprogress">Inprogress</option>
                                                <option value="Closed">Closed</option>
                                                <option value="New">New</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xxl={1} sm={4}>
                                        <button type="button" className="btn btn-primary w-100"> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                                            Filters
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </CardBody>
                        <CardBody>
                            <TableContainer
                                columns={columns}
                                data={ticketsList}
                                isGlobalFilter={false}
                                isAddUserList={false}
                                customPageSize={8}
                                className="custom-header-css"
                                divClass="table-responsive table-card mb-4"
                                tableClass="align-middle table-nowrap mb-0"
                                theadClass=""
                                thClass=""
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal
                isOpen={isCreateTicket}
                toggle={toggleModal}
                centered
                size="lg"
                className="border-0"
                modalClassName="zoomIn"
            >

                <ModalHeader toggle={toggleModal} className="p-3 bg-soft-info">
                    Add Ticket
                </ModalHeader>
                <form>
                    <ModalBody>
                        <Row className="g-3">
                            <Col lg={12}>
                                <div id="modal-id">
                                    <Label htmlFor="orderId" className="form-label">ID</Label>
                                    <Input type="text" id="orderId" className="form-control" placeholder="ID" value="#VLZ462" readOnly />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <Label htmlFor="tasksTitle-field" className="form-label">Title</Label>
                                    <Input type="text" id="tasksTitle-field" className="form-control" placeholder="Title" required />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Label htmlFor="clientName-field" className="form-label">Client</Label>
                                    <Input type="text" id="clientName-field" className="form-control" placeholder="Client Name" required />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div>
                                    <Label htmlFor="assignedtoName-field" className="form-label">Assigned To</Label>
                                    <Input type="text" id="assignedtoName-field" className="form-control" placeholder="Assigned to" required />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="date-field" className="form-label">Create Date</Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                />
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="duedate-field" className="form-label">Due Date</Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                />
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="ticket-status" className="form-label">Status</Label>
                                <select className="form-control" data-plugin="choices" name="ticket-status" id="ticket-status">
                                    <option value="">Status</option>
                                    <option value="New">New</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Open">Open</option>
                                </select>
                            </Col>
                            <Col lg={6}>
                                <Label htmlFor="priority-field" className="form-label">Priority</Label>
                                <select className="form-control" data-plugin="choices" name="priority-field" id="priority-field">
                                    <option value="">Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </Col>
                        </Row>

                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button onClick={toggleModal} type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Add Ticket</button>
                            <button type="button" className="btn btn-success" id="edit-btn">Update</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default TicketsData;