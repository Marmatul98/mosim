import { Box, Typography } from "@mui/material";
// @ts-ignore
import HeatMap from "react-heatmap-grid";
import { Square } from "./Map";
import { useEffect, useState } from "react";

interface Props {
  width: number;
  height: number;
  squares: Square[];
}
export const HeatmapChart = ({ width, height, squares }: Props) => {
  const arrayOfArraysOfZeros = Array.from({ length: width }, () =>
    Array.from({ length: width }, () => 0)
  );
  const [data, setData] = useState<Number[][]>(arrayOfArraysOfZeros);
  const xLabels = new Array(width).fill(0).map((_, i) => `${i}`);
  const xNumbers = xLabels.map(Number);
  const yLabels = new Array(height).fill(0).map((_, i) => `${i}`);

  useEffect(() => {
    setData(
      xNumbers.map((x) =>
        squares.filter((sq) => sq.y === x).map((sq) => sq.numberOfSteps)
      )
    );
  }, [squares]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant={"h3"} sx={{ mb: 3 }}>
        Heatmap
      </Typography>
      <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
    </Box>
  );
};
