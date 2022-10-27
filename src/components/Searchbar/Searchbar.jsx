import { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        if (search.trim() === '') {
            return toast.error('Try to find something...')
        }
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

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
