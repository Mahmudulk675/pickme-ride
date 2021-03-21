import React, { useContext } from 'react';
import {  Nav, Navbar, Button } from 'react-bootstrap';

// import { useParams } from 'react-router';
import { UserContext } from '../../App';
// import  fakeData from '../../Data/Data.json'
// 
const Header = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    // const [ride, setRide] =useState([]);
    // const {id} = useParams();
    // useEffect(() => {

    //     const getId = fakeData.find(rideDetails => rideDetails.id == id );
    //     setRide(getId)

    //     },id)

    //  console.log(ride);
    
    return (
        <>
        <Navbar style={{width:'100%'}} bg="dark" variant="dark">
            <Navbar.Brand href="home">Pick Me</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href={`destination/2`}>Destination</Nav.Link>
                <Nav.Link href="login">login</Nav.Link>
                <Button onClick={() =>setLoggedInUser({})} variant="outline-info">Sign Out</Button>
            </Nav>
            <h3 style={{color:'white'}}>{loggedInUser.name}</h3>
            {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                
            </Form> */}
        </Navbar>

    </>
    );
};

export default Header;