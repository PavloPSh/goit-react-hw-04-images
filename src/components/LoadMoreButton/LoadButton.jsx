import { Button } from "./Button.styled"
import { Box } from "components/Box"

export const LoadMoreButton = ({text,onClick}) => {
    return (
        <Box display='flex' justifyContent='center' >
            <Button onClick={onClick} > {text} </Button>
        </Box>
    )
}