import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { Form, Container, Button } from "react-bootstrap";

import { fetchEventById, requestUpdatingEvent } from "../redux/actions/eventActionCreators";


function UpdateEvent() {
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedEvent = useSelector(state => state.events.selected)
  const { id } = useParams()
  const [event, setEvent] = useState({
    title: '',
    notes: '',
    start: '',
    end: ''
  })

  useEffect(() => {
    if (selectedEvent) {
      setEvent(selectedEvent)
    }
  }, [selectedEvent])

  useEffect(() => {
    dispatch(fetchEventById(id))
  }, [dispatch, id])

  function handleSubmit(e) {
    e.preventDefault()
    const { title, notes, start, end } = event
    dispatch(requestUpdatingEvent(id, { title, notes, start, end }, history))
  }

  function handleChange(e) {
    setEvent(prevEvent => ({ ...prevEvent, [e.target.name]: e.target.value }))
  }

  return (
    <Container className="mt-3">
      <h1>Update Event</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={event.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" value={event.notes} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start</Form.Label>
          <Form.Control name="start" type="datetime-local" value={event.start} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End</Form.Label>
          <Form.Control name="end" type="datetime-local" value={event.end} onChange={handleChange} />
        </Form.Group>      
        <Button type="submit" className="mx-auto d-block w-100">Update</Button>
      </Form>
    </Container>
  )
}

export default UpdateEvent;