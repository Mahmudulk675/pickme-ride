
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import Destination from './Components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Header from './Components/Header/Header';

export const UserContext = createContext()

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log('fdsgs' ,loggedInUser);
  return (
    
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        
        
       <Router>

         <Header></Header>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination/:id">
            <Destination />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>    
    </Router>
    </UserContext.Provider>
  );
}

export default App;
