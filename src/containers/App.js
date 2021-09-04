import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';
import Scroll from '../components/Scroll';
import './App.css'


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })



    }
    render() {
        const filtereredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className='tc' >
                <h1 className='f1' >RoboFriends</h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filtereredRobots} />
                </Scroll>
            </div >
        );
    }
}
export default App;