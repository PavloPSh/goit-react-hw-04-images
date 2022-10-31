import { useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FcSearch } from "react-icons/fc";
import { SearchBarHeader, SearchButton, SearchInput } from './SearchBar.styled';


export const Searchbar = ({onSubmit}) => {

    const [search, setSearch] = useState('');

    const handleChange = (evt) => {
        const { value } = evt.target;
        setSearch(value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        if (search.trim() === '') {
            return toast.error('Try to find something...')
        }
        onSubmit(search.trim());
    };

    return (
        <SearchBarHeader>
            <form onSubmit={handleSubmit}>

                <SearchButton type="submit"><FcSearch></FcSearch></SearchButton>

                <SearchInput
                    onChange={handleChange}
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
    );
};


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
