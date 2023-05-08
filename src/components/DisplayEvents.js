import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllEvents } from '../redux/actions/eventActionCreators';

import EventCard from './EventCard';

function DisplayEvents() {
    const userId = useSelector(state => state.user.info._id)
    const events = useSelector(state => state.events.all)
    const [filterEvents, setFilterEvents] = useState(events)
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllEvents(userId))
    }, [])

    useEffect(() => {
        setFilterEvents(events)
    }, [events])

    const handleClick = () => {

        if (year && month && day)
            setFilterEvents(
                events.filter(e => new Date(e.start).getFullYear() == year
                    && new Date(e.start).getMonth() + 1 == month
                    && new Date(e.start).getDate() == day)
            )

        else if (year && month)
            setFilterEvents(
                events.filter(e => new Date(e.start).getFullYear() == year
                    && new Date(e.start).getMonth() + 1 == month)
            )

        else if (year && day)
            setFilterEvents(
                events.filter(e => new Date(e.start).getFullYear() == year
                    && new Date(e.start).getDate() == day)
            )

        else if (month && day)
            setFilterEvents(
                events.filter(e => new Date(e.start).getMonth() + 1 == month
                    && new Date(e.start).getDate() == day)
            )

        else if (year)
            setFilterEvents(events.filter(e => new Date(e.start).getFullYear() == year))

        else if (month)
            setFilterEvents(events.filter(e => new Date(e.start).getMonth() + 1 == month))

        else if (day)
            setFilterEvents(events.filter(e => new Date(e.start).getDate() == day))

        else
            setFilterEvents(events)
    }

    return (
        <>
            <Container className="mt-1" >

                <Form.Control name="year" type="number" value={year} placeholder="Enter year.." onChange={(e) => setYear(e.target.value)} />
                <Form.Select onChange={(e) => setMonth(e.target.value)}>
                    <option style={{ fontWeight: "bold" }} value="">Select month..</option>
                    <option value="1" > January </option>
                    <option value="2" > February </option>
                    <option value="3" > March </option>
                    <option value="4" > April </option>
                    <option value="5" > May </option>
                    <option value="6" > June </option>
                    <option value="7" > July </option>
                    <option value="8" > August </option>
                    <option value="9" > September </option>
                    <option value="10" > October </option>
                    <option value="11" > November </option>
                    <option value="12" > December </option>
                </Form.Select>
                <Form.Control name="date" type="number" value={day} placeholder="Enter day.." onChange={(e) => setDay(e.target.value)} />
                <Button onClick={handleClick} className="bt-filter" > Filter </Button>
            </Container >

            <Container className="mt-2">
                <Row>
                    {filterEvents.length > 0 ? (
                        filterEvents.sort(function (a, b) {
                            return new Date(a.start) - new Date(b.start);
                        }).map(event => {
                            return (
                                <EventCard event={event} />
                            )
                        })
                    ) : <Alert variant='info'>No events in this date !</Alert>
                    }
                </Row>
            </Container>
        </>
    )
}
export default DisplayEvents
