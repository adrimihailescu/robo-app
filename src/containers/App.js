import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'


function App() {
    /* constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    } */

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filtereredRobots = robots.filter(robots => {
        return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    console.log(robots, searchfield)
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className='tc' >
                <h1 className='f1' >RoboFriends</h1>
                <SearchBox onSearchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filtereredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div >
        );
}

export default App;