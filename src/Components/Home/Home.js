
import React, { useEffect, useState } from 'react';

import fakeData from '../../Data/Data.json';
import EachRide from '../EachRide/EachRide';
import './Home.css'

const Home = () => {
    const [rides, setRides] = useState([]);
    useEffect(() => {
        setRides(fakeData)
    }, []);

    return (
        <div>
            <div className=" home-component row ">

                {
                    rides.map(ride => <EachRide key={ride.id} ride={ride}></EachRide>)
                }
            </div>
        </div>
    );
};

export default Home;