import { Component } from 'react';

import { SearchBarHeader, SearchButton, SearchInput } from './SearchBar.styled';




export class Searchbar extends Component {
    state = {
        search:'',
    }

    handleChange = (evt) => {
        const { value, name } = evt.target;
        this.setState({
            [name]: value, 
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { search } = this.state;
        this.props.onSubmit(search.trim());

    }

    render() {
        const {  search } = this.state;

    return (
        <SearchBarHeader>
            <form className="form" onSubmit={this.handleSubmit}>

                <SearchButton
                    type="submit"
                    className="button"><span className="button-label">Search</span></SearchButton>

                <SearchInput
                    onChange={this.handleChange}
                    name='search'
                    value={search}
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </SearchBarHeader>
    )
  }
}
