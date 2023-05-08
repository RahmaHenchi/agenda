import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, Container, Button } from "react-bootstrap";

import { requestCreatingEvent } from "../redux/actions/eventActionCreators";

function AddEvent() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [event, setEvent] = useState({
    title: '',
    notes: '',
    start: '',
    end: '',

  })
  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(requestCreatingEvent(event, history))
  }

  function handleChange(e) {
    setEvent(prevEvent => ({ ...prevEvent, [e.target.name]: e.target.value }))
  }
  return (
    <Container className="mt-3">
      <h1>Add Event</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title :</Form.Label>
          <Form.Control name="title" value={event.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes :</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" value={event.notes} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start :</Form.Label>
          <Form.Control name="start" type="datetime-local" value={event.start} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End :</Form.Label>
          <Form.Control name="end" type="datetime-local" value={event.end} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" className="mx-auto d-block w-100"> Add Event <i class="bi bi-plus-circle"></i></Button>
      </Form>

    </Container>
  )
}

export default AddEvent;