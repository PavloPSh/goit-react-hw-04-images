import { Component } from 'react';
import { FcSearch } from "react-icons/fc";

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
            <form onSubmit={this.handleSubmit}>

                <SearchButton type="submit"><FcSearch></FcSearch></SearchButton>

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
