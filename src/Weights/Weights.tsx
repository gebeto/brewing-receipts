import React from "react";
import { WeightsContext, WeightsProvider } from "../components/weights";
import { Button, Paper } from "@mui/material";

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
            <Paper variant="outlined" sx={{ p: 2 }}>
              <h2>Weights Page</h2>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <p>This is where weight-related information will be displayed.</p>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <h1>{weightGrams}g</h1>
            </Paper>
            <Button variant="outlined" onClick={() => setZeroWeights()}>
              Set Zero Weight
            </Button>
          </Paper>
        )}
      </WeightsContext.Consumer>
    </WeightsProvider>
  );
};
