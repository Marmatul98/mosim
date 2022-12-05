import {ReactElement, useState} from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
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
  setCurrentLocation: () => void
}

const Settings = ({setCurrentLocation}: Props): ReactElement => {
  const [favoritePlaces, setFavoritePlaces] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof favoritePlaces>) => {
    const {
      target: { value },
    } = event;
    setFavoritePlaces(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        border: 1,
        height: 600,
        width: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h6"} marginBottom={2}>
        Set parameters
      </Typography>
      <Box width={300}>
        Health
        <Slider
          defaultValue={100}
          aria-label="health"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box width={300}>
        Energy
        <Slider
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
              value={favoritePlaces}
              onChange={handleChange}
              input={<OutlinedInput label="Unfavored places" />}
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
      <Box width={300}>
        Speed
        <Slider
            defaultValue={1}
            aria-label="health"
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
        />
      </Box>
      <Button onClick={setCurrentLocation} variant={'outlined'} sx={{width: 300}}>Set current location</Button>
    </Box>
  );
};

export default Settings;
