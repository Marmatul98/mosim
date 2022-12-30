import React, { ReactElement, useState } from "react";
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
            alignItems="center"
            sx={{
                border: 1,
                height: 100,
                width: 200,
                padding: 1,
            }}
        >
            <Box width={300}>
                Health
                <progress id="health" value={props.health} max="100"></progress>
            </Box>
            <Box width={300}>
                Energy
                <progress id="energy" value={props.energy} max="100"></progress>
            </Box>
        </Grid>
    )
};

export default Character;