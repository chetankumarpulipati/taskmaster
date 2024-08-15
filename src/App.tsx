import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const logo = require('./assets/images/logo.png');

function App() {
    return (
        <div className="app-container">
            <div className="header">
                <img src={logo} alt="TaskMaster Logo" className="app-logo"/>
                <h1>TaskMaster</h1>
            </div>
            <TaskList /> {/* The TaskList component now handles input and adding tasks */}
        </div>
    );
}

export default App;