import React from 'react';
import { Router, Switch, Link } from 'react-router-dom'; // Importing wrong components
import Login from './Login';
import UserList from './UserList';

function App() {
    return (
        <Router>
            <Switch> {/* Using 'Switch' instead of 'Routes' */}
                <Route path="/" component={Login}
                <Route path="/users" component={UserList} 
            </Switch>
        </Router>
    );
}

export default App;
