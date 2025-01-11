import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import { receipts } from "../receipts";
import { Step } from "./Step";
import { useParams } from "react-router";
import { Header } from "./Header";
import { Button } from "../components/Button";

const ReceiptRoot = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 16px;
  overflow-x: hidden;
`;

const StepRoot = styled(motion.div)`
  color: #000;
  background-color: #fff;
  border-radius: 16px;

  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  border: 1px solid #ddd;
`;

const StartStep: React.FC<{
  onStart: () => void;
}> = ({ onStart }) => {
  return (
    <motion.div
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
      <Button onClick={onStart}>START</Button>
    </motion.div>
  );
};

const EndStep: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  return (
    <motion.div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <motion.h2>Enjoy your cup of coffee ❤️</motion.h2>
      <Button
        onClick={onEnd}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        Back to start
      </Button>
    </motion.div>
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
      <motion.div style={{ padding: 16 }}>
        {currentStep === -1 && (
          <>
            <StartStep onStart={() => setStep((count) => count + 1)} />
            <motion.div
              style={{
                padding: 16,
                paddingBottom: 10,
                paddingTop: 0,
              }}
            >
              <motion.h3>Steps overview</motion.h3>
            </motion.div>
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: 16,
                border: "1px solid #ddd",
                overflow: "hidden",
              }}
            >
              {receipt.steps.map((step, index) => (
                <motion.div
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                    flex: 1,
                  }}
                >
                  {step.type === "poor" && (
                    <motion.div style={{ display: "flex" }}>
                      <motion.div
                        style={{
                          padding: 16,
                          width: 20,
                          fontWeight: 700,
                          textAlign: "center",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      <motion.div style={{ padding: 16 }}>
                        Poor <strong>{step.volume}ml</strong>{" "}
                        {step.seconds && (
                          <span>
                            for <strong>{step.seconds} seconds</strong>
                          </span>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                  {step.type === "wait" && (
                    <motion.div style={{ display: "flex" }}>
                      <motion.div
                        style={{
                          padding: 16,
                          width: 20,
                          fontWeight: 700,
                          textAlign: "center",
                          borderRight: "1px solid #ddd",
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      <motion.div style={{ padding: 16 }}>
                        Wait for <strong>{step.seconds} seconds</strong>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            <StartStep onStart={() => setStep((count) => count + 1)} />
          </>
        )}
        <AnimatePresence mode="popLayout">
          {step && (
            <StepRoot
              layout
              key={currentStep}
              initial={{ scale: 0.9, x: 130, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.9, x: -130, opacity: 0 }}
            >
              <Step
                step={step}
                index={currentStep}
                active={true}
                generalVolume={generalVolume}
                onNext={() => setStep((count) => count + 1)}
                onBack={() => setStep((count) => count - 1)}
              />
              <motion.div style={{ flex: 1 }} />
              <motion.div
                style={{
                  padding: 16,
                  borderTop: "1px solid #ddd",
                }}
              >
                <Button
                  onClick={() => setStep((count) => count + 1)}
                  style={{ width: "100%" }}
                >
                  Next
                </Button>
              </motion.div>
            </StepRoot>
          )}
          {currentStep === receipt.steps.length && (
            <EndStep onEnd={() => setStep(-1)} />
          )}
        </AnimatePresence>
      </motion.div>
    </ReceiptRoot>
  );
};
