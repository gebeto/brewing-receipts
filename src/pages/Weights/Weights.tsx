import React from "react";
import { WeightsContext, WeightsProvider } from "../../components/weights";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { Add, AspectRatio, Remove, Scale } from "@mui/icons-material";

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
  const [aspectRatio, setAspectRatio] = React.useState(16);
  return (
    <WeightsProvider>
      <WeightsContext.Consumer>
        {({ weightGrams, setZeroWeights }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
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
              <InfoCard
                Icon={<Scale fontSize="small" />}
                title="Coffee Weights"
              >
                <Typography fontWeight={"600"} variant="h4">
                  {weightGrams.toFixed(1)}g
                </Typography>
              </InfoCard>
              <InfoCard Icon={<AspectRatio fontSize="small" />} title="Ratio">
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => setAspectRatio((ar) => ar - 1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography fontWeight={"600"} variant="h5">
                    1/{aspectRatio}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setAspectRatio((ar) => ar + 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </InfoCard>
              <InfoCard Icon={<Scale fontSize="small" />} title="Water Weights">
                <Typography fontWeight={"600"} variant="h4">
                  {(weightGrams * aspectRatio).toFixed(1)}g
                </Typography>
              </InfoCard>
              <Button variant="outlined" onClick={() => setZeroWeights()}>
                Set Zero Weight
              </Button>
            </Paper>
          </Box>
        )}
      </WeightsContext.Consumer>
    </WeightsProvider>
  );
};
