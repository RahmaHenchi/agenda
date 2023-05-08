import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

function Loading() {
    const loading = useSelector(state => state.feedback.loading)
    return (
        <div className='global-loading' style={{ display: loading ? 'flex' : 'none' }}>
      <Spinner animation="border" variant="light" />
    </div>
    )
}

export default Loading