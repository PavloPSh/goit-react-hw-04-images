import PropTypes from 'prop-types';

import { Button } from "./Button.styled";
import { Box } from "components/Box";

export const LoadMoreButton = ({text,onClick}) => {
    return (
        <Box display='flex' justifyContent='center' >
            <Button onClick={onClick} > {text} </Button>
        </Box>
    )
}

LoadMoreButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}