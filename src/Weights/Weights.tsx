import React from "react";
import { WeightsContext, WeightsProvider } from "../components/weights";
import { Box, Button, Paper, Typography } from "@mui/material";
import { AspectRatio, Scale } from "@mui/icons-material";

const InfoCard: React.FC<{
  Icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ Icon, title, children }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: 100,
    }}
  >
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box>{Icon}</Box>
      <Box>{title}</Box>
    </Box>
    <Box>
      <Typography variant="body2" color="textSecondary">
        {children}
      </Typography>
    </Box>
  </Paper>
);

export const Weights: React.FC = () => {
  return (
    <WeightsProvider>
      <WeightsContext.Consumer>
        {({ weightGrams, setZeroWeights }) => (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              width: 400,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <InfoCard Icon={<AspectRatio fontSize="small" />} title="Ratio">
              <Typography fontWeight={"600"} variant="h5">
                1/16
              </Typography>
            </InfoCard>
            <InfoCard Icon={<Scale fontSize="small" />} title="Grams">
              <Typography fontWeight={"600"} variant="h4">
                {weightGrams}g
              </Typography>
            </InfoCard>
            <Button variant="outlined" onClick={() => setZeroWeights()}>
              Set Zero Weight
            </Button>
          </Paper>
        )}
      </WeightsContext.Consumer>
    </WeightsProvider>
  );
};
