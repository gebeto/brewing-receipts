import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import { ReceiptDefinition } from "./receipts";
import { Step } from "./Step";

const StepperRoot = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  gap: 1em;

  /* background-color: #fff; */
  max-width: 600px;
  width: 600px;
  /* color: #fff; */
  border-radius: 16px;
  /* overflow-x: hidden;
  overflow-y: hidden; */
`;

const StepRoot = styled(motion.div)`
  color: #000;
  /* padding: 2em; */
  /* background-color: red; */
  border-radius: 16px;

  min-height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-width: 100%;
`;

export const Receipt = ({ receipt }: { receipt: ReceiptDefinition }) => {
  const [currentStep, setStep] = React.useState(-1);

  const receiptVolume = React.useMemo(() => {
    return receipt.steps.reduce((acc, step) => {
      if (step.type === "poor") {
        return acc + step.volume;
      }
      return acc;
    }, 0);
  }, [receipt.steps]);

  const receiptBrewingTime = React.useMemo(() => {
    const waitingTime = receipt.steps.reduce((acc, step) => {
      if (step.type === "wait") {
        return acc + step.seconds;
      }
      return acc;
    }, 0);
    const poorTime = receiptVolume / receipt.flowRate;
    const seconds = Math.round(waitingTime + poorTime);
    return `~${Math.floor(seconds / 60)}:${seconds % 60}`;
  }, [receipt, receiptVolume]);

  return (
    <StepperRoot>
      <AnimatePresence mode="popLayout">
        <motion.div>
          <motion.h2>
            {receipt.title}
            <br />
            {receiptBrewingTime}, {receiptVolume}ml
          </motion.h2>
          {currentStep === -1 && (
            <motion.div
              style={{
                minHeight: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <motion.button onClick={() => setStep((count) => count + 1)}>
                START
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {receipt.steps.map((step, index) => {
            if (currentStep > index) {
              return null;
            }

            return (
              <StepRoot
                layout
                key={index}
                exit={{ scale: 0.8, opacity: 0 }}
                variants={{
                  focused: { scale: 1, opacity: 1.0 },
                  unfocused: { scale: 0.8, opacity: 0.9 },
                }}
                initial={currentStep !== index ? "unfocused" : "focused"}
                animate={currentStep !== index ? "unfocused" : "focused"}
              >
                <motion.div>
                  <Step
                    step={step}
                    active={currentStep === index}
                    onNext={() => setStep((count) => count + 1)}
                    onBack={() => setStep((count) => count - 1)}
                  />
                </motion.div>
                {index === currentStep && (
                  <motion.div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    <motion.button
                      onClick={() => setStep((count) => count - 1)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={() => setStep((count) => count + 1)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      Next
                    </motion.button>
                  </motion.div>
                )}
              </StepRoot>
            );
          })}
        </motion.div>
        {currentStep === receipt.steps.length && (
          <motion.div
            style={{
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.h2>Done!</motion.h2>
            <motion.button
              onClick={() => setStep(-1)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              Back to start
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </StepperRoot>
  );
};
