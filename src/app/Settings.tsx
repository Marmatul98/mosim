import {ReactElement, useEffect, useState} from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";

const availablePlaces = [
  "road",
  "grass",
  "mountain",
  "forest",
  "water",
  "pub",
  "shop",
  "danger",
];

interface Props {
  setCurrentLocation: () => void;
  setSettings: (settings: any) => void;
}

const Settings = ({ setCurrentLocation, setSettings }: Props): ReactElement => {
  const [favoritePlaces, setFavoritePlaces] = useState<string[]>([]);
  const [unfavoredPlaces, setUnfavoredPlaces] = useState<string[]>([]);
  const [health, setHealth] = useState<number | number[]>(100);
  const [energy, setEnergy] = useState<number | number[]>(100);
  const [speed, setSpeed] = useState<number | number[]>(1);

  useEffect(() => {
    confirmSettings()
  },[])

  const handleChange = (event: SelectChangeEvent<typeof favoritePlaces>) => {
    const {
      target: { value },
    } = event;
    setFavoritePlaces(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeUnfavored = (
    event: SelectChangeEvent<typeof unfavoredPlaces>
  ) => {
    const {
      target: { value },
    } = event;
    setUnfavoredPlaces(typeof value === "string" ? value.split(",") : value);
  };

  const confirmSettings = () => {
    const settings = {
      health,
      energy,
      favoritePlaces,
      unfavoredPlaces,
      speed,
    };
    setSettings(settings);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: 1,
        height: 600,
        width: 400,
      }}
    >
      <Typography variant={"h6"} marginBottom={2}>
        Set parameters
      </Typography>
      <Box width={300}>
        Health
        <Slider
          value={health}
          onChange={(_, newValue) => {
            setHealth(newValue);
          }}
          defaultValue={100}
          aria-label="health"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box width={300}>
        Energy
        <Slider
          value={energy}
          onChange={(_, newValue) => {
            setEnergy(newValue);
          }}
          defaultValue={100}
          aria-label="health"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="favoritePlacesLabel">Favorite places</InputLabel>
          <Select
            labelId="favoritePlacesLabel"
            id="favoritePlaces"
            multiple
            value={favoritePlaces}
            onChange={handleChange}
            input={<OutlinedInput label="Favorite places" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {availablePlaces.map((place) => (
              <MenuItem key={place} value={place}>
                <Checkbox checked={favoritePlaces.indexOf(place) > -1} />
                <ListItemText primary={place} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="unfavoredPlacesLabel">Unfavored places</InputLabel>
          <Select
            labelId="unfavoredPlacesLabel"
            id="unfavoredPlaces"
            multiple
            value={unfavoredPlaces}
            onChange={handleChangeUnfavored}
            input={<OutlinedInput label="Unfavored places" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {availablePlaces.map((place) => (
              <MenuItem key={place} value={place}>
                <Checkbox checked={unfavoredPlaces.indexOf(place) > -1} />
                <ListItemText primary={place} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width={300}>
        Speed
        <Slider
          value={speed}
          onChange={(_, newValue) => {
            setSpeed(newValue);
          }}
          defaultValue={1}
          aria-label="health"
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
        />
      </Box>
      <Button
        onClick={setCurrentLocation}
        variant={"outlined"}
        sx={{ width: 300 }}
      >
        Set current location
      </Button>
      <Button variant={"contained"} onClick={confirmSettings}>
        Set settings
      </Button>
    </Grid>
  );
};

export default Settings;
