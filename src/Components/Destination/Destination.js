import React, {} from 'react';
import { useParams } from 'react-router';
import fakeData from '../../Data/Data.json'
import EachRideDetail from '../EachRideDetail/EachRideDetail';

const Destination = () => {
    const {id} = useParams();
    // const [ride, setRide] =useState([]);
    const rideDetails = fakeData.find(rideDetails => rideDetails.id == id )
    // useEffect(() => {

    // })
    console.log(rideDetails);
    return (
        <div>
            
            <EachRideDetail rideDetails={rideDetails}></EachRideDetail>
        </div>
    );
};

export default Destination;