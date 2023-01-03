import React, { ReactElement} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Slider,
    Typography,
} from "@mui/material";

const initialState = { count: 0 };
interface Props {
    setCurrentHealth: (health: number) => void;
    setCurrentEnergy: (energy: number) => void;
}

const Character = (props: any): ReactElement => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="left"
            sx={{
                border: 1,
                height: 150,
                width: 300,
                padding: 1,
            }}
        >
            <Box width={300}>
                Health
                <br/>
                <progress id="health" value={props.health} max="100"></progress>
            </Box>
            <Box width={300}>
                Energy
                <br/>
                <progress id="energy" value={props.energy} max="100"></progress>
            </Box>
            <Box width={300}>
                Number of steps: {props.steps}
            </Box>
            <Box width={300}>
                Travel progress
                <br/>
                <progress id="energy" value={props.distance} max="1"></progress>
            </Box>
        </Grid>
    )
};

export default Character;