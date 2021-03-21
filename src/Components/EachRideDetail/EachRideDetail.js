import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import Map from '../Map/Map';
import './EachRideDetail.css';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserFriends } from '@fortawesome/free-solid-svg-icons'



const EachRideDetail = (props) => {
    const { name, price, img } = props.rideDetails;
    const [rideOption, setRideOption] = useState(true)
    const { register, handleSubmit, errors } = useForm();
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const onSubmit = data => console.log(data);

    const [loggedInUser,] = useContext(UserContext)
     console.log(to,from)
    return (
        <div className="container">
            <div className="userName">
                <h1>Welcome mr. {loggedInUser.name} </h1>
            </div>

            <div className="row">
                <div className="col-sm-4 rideDetails">


                    {
                        rideOption ? <form className="destination-form" onSubmit={handleSubmit(onSubmit)}>

                            <input onBlur={(event) => setTo(event.target.value)} className="from" type="text" name="from" ref={register({ required: true })} placeholder="Start from" />
                            {errors.name && <span className="error">Starting point's name is required</span>}

                            <input onBlur={(event) => setFrom(event.target.value)} className="to" type="text" name="to" ref={register({ required: true })} placeholder="Where to ?" />
                            {errors.to && <span className="error">Destination point's name is required</span>}

                            <input type="date" id="birthday" name="birthday"></input>

                        </form> :
                            <div className="container overflow-hidden">
                                <div className="timeLine">

                                    <Timeline >
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>{to || "No PickUp"}</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                {/* <TimelineConnector /> */}
                                            </TimelineSeparator>
                                            <TimelineContent>{from || "Destination"}</TimelineContent>
                                        </TimelineItem>
                                        
                                    </Timeline>

                                </div>
                                <div className="rideOption ">
                                    <div className="col-md-4">
                                        <img className="rideOptionImg" src={img} alt="" /> <h4>{name}</h4>
                                    </div>
                                    <div className="col-md-4">
                                       <div>
                                       <FontAwesomeIcon icon={faUserFriends} /> <h3 className="passengerNum">  4</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>${price}</h4>
                                    </div>
                                </div>


                                <div className="rideOption ">
                                    <div className="col-md-4">
                                        <img className="rideOptionImg" src={img} alt="" />  <h4>{name}</h4>
                                    </div>
                                    <div className="col-md-4">
                                    <div>
                                       <FontAwesomeIcon icon={faUserFriends} /> <h3 className="passengerNum">  4</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>${price}</h4>
                                    </div>
                                </div>


                                <div className="rideOption ">
                                    <div className="col-md-4">
                                        <img className="rideOptionImg" src={img} alt="" />  <h4>{name}</h4>
                                    </div>
                                    <div className="col-md-4">
                                    <div>
                                       <FontAwesomeIcon icon={faUserFriends} /> <h3 className="passengerNum">  4</h3>
                                       </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>${price}</h4>
                                    </div>
                                </div>
                            </div>
                    }
                    {/* <input onClick={() => setRideOption(!rideOption)} className="submit-btn container" type="submit" /> */}
                    <button onClick={() => setRideOption(!rideOption)} className="submit-btn container">Search</button>

                </div>

                <div className="col-sm-6 map">
                    <Map className="map"></Map>
                </div>
            </div>
        </div>
    );
};

export default EachRideDetail;