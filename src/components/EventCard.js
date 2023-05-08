import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

import DeleteEvent from './DeleteEvent';

function EventCard({ event }) {
    const start = new Date(event.start)
    const end = new Date(event.end)
    const formatedStart = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} ${start.getHours()}:${start.getMinutes()}`;
    const formatedEnd = `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`;
    return (
        <div key={event._id} className='col-12 col-sm-6 col-md-4 col-lg-3 p-2' >
            <Card>
                <Card.Body>
                    <Card.Title>
                        Title: {event.title}
                    </Card.Title>
                    <Card.Text>
                        Notes: {event.notes}
                    </Card.Text>
                    <Card.Text>
                        Start: {formatedStart}
                    </Card.Text>
                    <Card.Text>
                        End: {formatedEnd}
                    </Card.Text>
                    <Link to={`/updateEvent/${event._id}`}>
                        <Button variant="warning" className='mx-1'><i className="bi bi-pencil-square"></i></Button>
                    </Link>
                    <DeleteEvent event={event} />
                </Card.Body>
            </Card>
        </div>
    )

}
export default EventCard