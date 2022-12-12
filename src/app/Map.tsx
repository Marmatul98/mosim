import React, {ReactElement, useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
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

interface Square {
  x: number;
  y: number;
  isCurrent: boolean;
  type: SquareTypes;
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
  road: {
    speed: 1.2,
    danger: 0.5,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  grass: {
    speed: 1,
    danger: 0.5,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  mountain: {
    speed: 0.6,
    danger: 0.9,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  forest: {
    speed: 0.8,
    danger: 0.8,
    healthLost: 0,
    rest: 0,
    factor: 1,
  },
  water: {
    speed: 0,
    danger: 1,
    healthLost: 1,
    rest: 0,
    factor: 1,
  },
  pub: {
    speed: 1,
    danger: 0.2,
    healthLost: 0,
    rest: 1,
    factor: 1,
  },
  shop: {
    speed: 1,
    danger: 0.2,
    healthLost: 0,
    rest: 1,
    factor: 1,
  },
  danger: {
    speed: 1,
    danger: 1,
    healthLost: 1,
    rest: 0,
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

  useEffect(() => {
    const generatedSquares: Square[] = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        generatedSquares.push({
          x: i,
          y: j,
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

  const setSettings = (settings:any) => {
    console.log(settings)
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
      }}
    >
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
      </Box>
      <Settings setCurrentLocation={setCurrentLocation} setSettings={setSettings} />
    </Box>
  );
};
export default Map;