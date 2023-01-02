import React, { ReactElement, useEffect, useState } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import GameSquare from "../shapes/GameSquare";
import RoadImage from "../bgs/road.png";
import GrassImage from "../bgs/grass.png";
import MountainImage from "../bgs/mountain.png";
import ForestImage from "../bgs/forest.png";
import WaterImage from "../bgs/water.png";
import PubImage from "../bgs/pub.png";
import ShopImage from "../bgs/shop.png";
import DangerImage from "../bgs/danger.png";
import Settings from "./Settings";
import Character from "./Character";
// @ts-ignore
import rouletteWheelSelection from "roulette-wheel-selection";

interface Square {
  x: number;
  y: number;
  numberOfSteps: Number;
  isCurrent: boolean;
  type: SquareTypes;
}

interface ISettings {
  energy: number;
  favoritePlaces: string[];
  health: number;
  speed: number;
  unfavoredPlaces: string[];
}

export enum SquareTypes {
  undefined = "undefined",
  location = "location",
  road = "road",
  grass = "grass",
  mountain = "mountain",
  forest = "forest",
  water = "water",
  pub = "pub",
  shop = "shop",
  danger = "danger",
}

export const kek = {
  "road": {
    speed: 1.2,
    danger: 0.5,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  "grass": {
    speed: 1,
    danger: 0.5,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  "mountain": {
    speed: 0.6,
    danger: 0.9,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  "forest": {
    speed: 0.8,
    danger: 0.8,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  "water": {
    speed: 0,
    danger: 1,
    healthLost: 1,
    rest: 0,
    factor: 1,
  },
  "pub": {
    speed: 1,
    danger: 0.2,
    healthLost: 0,
    rest: 1,
    factor: 1,
  },
  "shop": {
    speed: 1,
    danger: 0.2,
    healthLost: 0,
    rest: 1,
    factor: 1,
  },
  "danger": {
    speed: 1,
    danger: 1,
    healthLost: 1,
    rest: 0,
    factor: 1,
  },
  "undefined": {
    speed: 1,
    danger: 1,
    healthLost: 1,
    rest: 1,
    factor: 1,
  },
};

const Map = (): ReactElement => {
  const width = 9;
  const height = 9;
  const totalWidth = width * 55;
  const totalHeight = height * 55;
  const [squares, setSquares] = useState<Square[]>([]);
  const [type, setType] = useState<SquareTypes>(SquareTypes.undefined);
  const [mapSettings, setMapSettings] = useState<ISettings>();
  const [currentHealth, setCurrentHealth] = useState(100);
  const [currentEnergy, setCurrentEnergy] = useState(100);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const generatedSquares: Square[] = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        generatedSquares.push({
          x: j,
          y: i,
          numberOfSteps: 0,
          isCurrent: i === 0 && j === 0,
          type: SquareTypes.undefined,
        });
      }
    }
    setSquares(generatedSquares);
  }, []);

  const handleSelection = (type: SquareTypes) => {
    setType(type);
  };

  const setCurrentLocation = () => {
    handleSelection(SquareTypes.location);
  };

  const setSettings = (settings: any) => {
    setCurrentCharacter(settings);
    setMapSettings(settings);
  };
  
  const setCurrentCharacter = (settings: ISettings) => {
    setCurrentEnergy(settings.energy);
    setCurrentHealth(settings.health);
  }
  const handleOkButton = () => {
    setOpen(false);
  }

  const onSquareClick = (square: Square) => {
    const newSquare: Square = {
      ...square,
      isCurrent: type === SquareTypes.location ? true : square.isCurrent,
      type: type === SquareTypes.location ? square.type : type,
    };
    const newSquares = squares.map((sq) => {
      if (sq.x === square.x && sq.y === square.y) {
        return newSquare;
      } else {
        if (type === SquareTypes.location) {
          return {
            ...sq,
            isCurrent: false,
          };
        } else return sq;
      }
    });
    setSquares(newSquares);
  };

  const getAvailableSquares = (): Square[] => {
    const currentLocation = squares.find((s) => s.isCurrent);
    const availableSquares: Square[] = [];
    if (currentLocation) {
      if (currentLocation.y !== 0) {
        const up = squares.find(
          (s) => s.x === currentLocation.x && s.y === currentLocation.y - 1
        );
        if (up) {
          availableSquares.push(up);
        }
      }
      if (currentLocation.x !== 0) {
        const left = squares.find(
          (s) => s.x === currentLocation.x - 1 && s.y === currentLocation.y
        );
        if (left) {
          availableSquares.push(left);
        }
      }
      if (currentLocation.y !== height - 1) {
        const down = squares.find(
          (s) => s.x === currentLocation.x && s.y === currentLocation.y + 1
        );
        if (down) {
          availableSquares.push(down);
        }
      }
      if (currentLocation.x !== width - 1) {
        const right = squares.find(
          (s) => s.x === currentLocation.x + 1 && s.y === currentLocation.y
        );
        if (right) {
          availableSquares.push(right);
        }
      }
    }

    return availableSquares;
  };

  const getNextSquare = () => {
    const availableSquares = getAvailableSquares();
    const favoriteAvailableSquares = availableSquares.filter((square) =>
      mapSettings?.favoritePlaces.includes(square.type)
    );
    const unfavoredAvailableSquares = availableSquares.filter((square) =>
      mapSettings?.unfavoredPlaces.includes(square.type)
    );
    const otherSquares = availableSquares.filter(
      (square) =>
        !mapSettings?.favoritePlaces.includes(square.type) &&
        !mapSettings?.unfavoredPlaces.includes(square.type)
    );

    const squares = [
      ...favoriteAvailableSquares.map((square) => ({ square, weight: 40 })),
      ...unfavoredAvailableSquares.map((square) => ({ square, weight: 20 })),
      ...otherSquares.map((square) => ({ square, weight: 30 })),
    ];

    const rouletteSelection = rouletteWheelSelection(squares, "weight");
    return rouletteSelection.square;
  };

  const movePlayer = (square: Square) => {
    const newSquare: Square = {
      ...square,
      isCurrent: true,
    };
    const newSquares = squares.map((sq) => {
      if (sq.x === square.x && sq.y === square.y) {
        return newSquare;
      } else {
        return {
          ...sq,
          isCurrent: false,
        };
      }
    });

    setSquares(newSquares);
  };

  const takeAction = (square: Square) => {
    // @ts-ignore 
    const it = kek[SquareTypes[square.type]];

    setCurrentEnergy(currentEnergy - 1);
    setCurrentHealth(currentHealth - it.healthLost);
  }

  const makeStep = () => {
    // //@ts-ignore
    // while (mapSettings.energy !== 0 && mapSettings.health !== 0) {
    //   getNextSquare()
    // }

    if(currentHealth <= 0 || currentEnergy <= 0)
    {
      setOpen(true);
    }
    
    const nextSquare = getNextSquare();
    nextSquare.numberOfSteps++;

    takeAction(nextSquare);
    movePlayer(nextSquare);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
      <Character
      health={currentHealth}
      energy={currentEnergy}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          To change game squares select type, then click on game square
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            onClick={() => handleSelection(SquareTypes.road)}
            src={RoadImage}
            width={60}
            height={60}
            alt={"road"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.grass)}
            src={GrassImage}
            width={60}
            height={60}
            alt={"grass"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.mountain)}
            src={MountainImage}
            width={60}
            height={60}
            alt={"mountain"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.forest)}
            src={ForestImage}
            width={60}
            height={60}
            alt={"forest"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.water)}
            src={WaterImage}
            width={60}
            height={60}
            alt={"water"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.pub)}
            src={PubImage}
            width={60}
            height={60}
            alt={"pub"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.shop)}
            src={ShopImage}
            width={60}
            height={60}
            alt={"shop"}
          />
          <img
            onClick={() => handleSelection(SquareTypes.danger)}
            src={DangerImage}
            width={60}
            height={60}
            alt={"danger"}
          />
        </Box>
        <Typography>Selected: {type}</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: totalWidth,
            height: totalHeight,
          }}
        >
          {squares.map((sq, i) => (
            <GameSquare
              onClick={() => onSquareClick(sq)}
              isCurrent={sq.isCurrent}
              type={sq.type}
              key={i}
            />
          ))}
        </Box>
        <Box>
          <Button variant={"contained"} onClick={makeStep}>
            Next step
          </Button>
        </Box>
      </Box>
      <Settings
        setCurrentLocation={setCurrentLocation}
        setSettings={setSettings}
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Simulace ukončena"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vypršelo zdraví nebo energie.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkButton} autoFocus >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Map;
