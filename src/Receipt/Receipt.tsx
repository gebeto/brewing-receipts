import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import { ReceiptDefinition, receipts } from "../receipts";
import { Step } from "./Step";
import { useParams } from "react-router";
import { Header } from "./Header";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const ReceiptRoot = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const StepRoot = styled(motion.div)`
  /* color: #000; */
  /* background-color: #fff; */
  /* border-radius: 16px; */

  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  /* border: 1px solid #ddd; */
`;

const StartStep: React.FC<{
  onStart: () => void;
}> = ({ onStart }) => {
  return (
    <Box
      component={motion.div}
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8, opacity: 0.4 }}
    >
      <Button variant="contained" size="large" onClick={onStart}>
        START
      </Button>
    </Box>
  );
};

const EndStep: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <motion.h2>Enjoy your cup of coffee ❤️</motion.h2>
      <Button
        variant="contained"
        component={motion.button}
        onClick={onEnd}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        Back to start
      </Button>
    </Box>
  );
};

const ReceiptOverview: React.FC<{
  receipt: ReceiptDefinition;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ receipt, setStep }) => {
  return (
    <>
      <StartStep onStart={() => setStep((count) => count + 1)} />
      <Typography sx={{ p: 2, pb: "10px", pt: 0 }} variant="h4">
        Steps overview
      </Typography>
      <List>
        {receipt.steps.map((step, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>{index + 1}</ListItemAvatar>
            {step.type === "poor" && (
              <ListItemText
                primary={
                  <span>
                    Poor <strong>{step.volume}ml</strong>{" "}
                    {step.seconds && (
                      <span>
                        for <strong>{step.seconds} seconds</strong>
                      </span>
                    )}
                  </span>
                }
              />
            )}
            {step.type === "wait" && (
              <ListItemText
                primary={
                  <span>
                    Wait for <strong>${step.seconds} seconds</strong>
                  </span>
                }
              />
            )}
          </ListItem>
        ))}
      </List>
      <StartStep onStart={() => setStep((count) => count + 1)} />
    </>
  );
};

export const Receipt = () => {
  const [currentStep, setStep] = React.useState(-1);
  const receiptId = useParams<string>().id ?? "0";
  const receipt = receipts[parseInt(receiptId)];

  const step = receipt.steps[currentStep];
  const prevSteps = receipt.steps.slice(0, currentStep);
  const generalVolume = prevSteps.reduce((acc, step) => {
    if (step.type === "poor") {
      return acc + step.volume;
    }
    return acc;
  }, 0);

  return (
    <ReceiptRoot>
      <Header receipt={receipt} />
      <Box sx={{ p: 2 }}>
        {currentStep === -1 && (
          <ReceiptOverview receipt={receipt} setStep={setStep} />
        )}
        <AnimatePresence mode="popLayout">
          {step && (
            <Paper
              variant="outlined"
              component={StepRoot}
              layout
              key={currentStep}
              initial={{ scale: 0.9, x: 130, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.9, x: -130, opacity: 0 }}
            >
              <Step
                step={step}
                receipt={receipt}
                index={currentStep}
                active={true}
                generalVolume={generalVolume}
                onNext={() => setStep((count) => count + 1)}
                onBack={() => setStep((count) => count - 1)}
              />
              <Box sx={{ flex: 1 }} />
              <Divider />
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setStep((count) => count + 1)}
                  fullWidth
                  size="large"
                >
                  Next
                </Button>
              </Box>
            </Paper>
          )}
          {currentStep === receipt.steps.length && (
            <EndStep onEnd={() => setStep(-1)} />
          )}
        </AnimatePresence>
      </Box>
    </ReceiptRoot>
  );
};
