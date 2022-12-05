import {ReactElement, useEffect, useState} from "react";
import {Box} from "@mui/material";
import RoadImage from "../bgs/road.png";
import GrassImage from "../bgs/grass.png";
import MountainImage from "../bgs/mountain.png";
import ForestImage from "../bgs/forest.png";
import WaterImage from "../bgs/water.png";
import PubImage from "../bgs/pub.png";
import ShopImage from "../bgs/shop.png";
import DangerImage from "../bgs/danger.png";
import {SquareTypes} from "../app/Map";

interface Props {
  onClick: () => void;
  type: SquareTypes;
  isCurrent?: boolean;
}

const typeToImage = {
  road: RoadImage,
  grass: GrassImage,
  mountain: MountainImage,
  forest: ForestImage,
  water: WaterImage,
  pub: PubImage,
  shop: ShopImage,
  danger: DangerImage,
};

const GameSquare = ({ isCurrent, onClick, type }: Props): ReactElement => {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    // @ts-ignore
    setImage(typeToImage[type]);
  }, [type]);

  return (
    <Box
      onClick={onClick}
      sx={{
        width: 50,
        height: 50,
        border: 1,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isCurrent && (
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "red",
            borderRadius: 50,
          }}
        />
      )}
    </Box>
  );
};

export default GameSquare;
