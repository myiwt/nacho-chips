import { Redirect } from "react-router-dom";
import axios from 'axios';
import React from 'react';

class SearchBar extends React.Component {    
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const query = this.state.value;
        axios.get('http://localhost:8080/api/repo/query/' + query)
        .then((response) => {
            this.setState({redirect: "/search"});
        }, (error) => {
            alert(error);
        })
        event.preventDefault();
    }

    render() {
        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
        <form 
            autoComplete="off"
            onSubmit={this.handleSubmit}
        >
            <label htmlFor="header-search">
                <span className="visually-hidden">Search repository</span>
            </label>
            <input 
                value={this.state.value}
                type="text"
                id="header-search"
                placeholder="Search for evidence (strong, agree, against, etc.)"
                name="s"
                size="50"
                onChange={this.handleChange}
            />
            <button type="submit">Search</button>
        </form>
        );
    }
};

export default SearchBar;