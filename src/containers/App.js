import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
/* import { robots } from '../robots'; */
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())

    }
}

function App() {
    /* constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    } */

    const [robots, setRobots] = useState([])
    const [searchField, setSearchField] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
    }, [])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filtereredRobots = robots.filter(robots => {
        return robots.name.toLowerCase().includes(searchField.toLowerCase());
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(App);