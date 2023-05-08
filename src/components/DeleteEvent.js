import { useState } from "react";
import {Modal, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";

import { requestDeletingEvent } from "../redux/actions/eventActionCreators";

function DeleteEvent(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    return (
        <>
            <Button variant="danger" className='mx-1' onClick={handleShow}>
                <i class="bi bi-trash"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete this event <span className="fw-bold"> {props.event.title} </span>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => dispatch(requestDeletingEvent(props.event._id, handleClose))}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteEvent