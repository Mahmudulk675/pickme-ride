import React from 'react';
import {  Card } from 'react-bootstrap'
import { useHistory } from 'react-router';
import './EachRide.css'


const EachRide = (props) => {
    const { name,img,price,id} = props.ride;
    const history = useHistory()

    const handleRideOption = () => {
        history.push(`/destination/${id}`)
    }

    return (
        <div className="card-container">
        <div onClick={handleRideOption} className="col-md-3">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Cost: ${price}
                    </Card.Text>
                    {/* <Button variant="primary">Take Ride</Button> */}
                </Card.Body>
            </Card>
        </div>
        </div>
    );
};

export default EachRide;