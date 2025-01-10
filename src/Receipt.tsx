import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import { ReceiptDefinition } from "./receipts";
import { Step } from "./Step";
import { useNavigate } from "react-router";

const StepperRoot = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 16px;
`;

const StepRoot = styled(motion.div)`
  color: #000;
  border-radius: 16px;

  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  border: 1px solid #ddd;
`;

const Header: React.FC<{ receipt: ReceiptDefinition }> = ({ receipt }) => {
  const navigate = useNavigate();
  const receiptVolume = React.useMemo(() => {
    return receipt.steps.reduce((acc, step) => {
      if (step.type === "poor") {
        return acc + step.volume;
      }
      return acc;
    }, 0);
  }, [receipt.steps]);

  const receiptBrewingTime = React.useMemo(() => {
    const seconds = receipt.steps.reduce((acc, step) => {
      if (step.type === "wait") {
        return acc + step.seconds;
      }
      if (step.type === "poor") {
        return acc + step.seconds;
      }
      return acc;
    }, 0);
    return `~${Math.floor(seconds / 60)}:${seconds % 60}`;
  }, [receipt]);

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderBottom: "1px solid #ddd",
        padding: 16,
      }}
    >
      <motion.button onClick={() => navigate("/")}>{"<"}</motion.button>
      <motion.div>
        <motion.h3>{receipt.title}</motion.h3>
        <motion.h6>
          Time: {receiptBrewingTime}, {receiptVolume}ml
        </motion.h6>
        <motion.h6>Volume: {receiptVolume}ml</motion.h6>
      </motion.div>
    </motion.div>
  );
};

const StartStep: React.FC<{
  onStart: () => void;
}> = ({ onStart }) => {
  return (
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
      <motion.button onClick={onStart}>START</motion.button>
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
      <motion.button
        onClick={onEnd}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        Back to start
      </motion.button>
    </motion.div>
  );
};

export const Receipt = ({ receipt }: { receipt: ReceiptDefinition }) => {
  const [currentStep, setStep] = React.useState(-1);

  return (
    <StepperRoot>
      <Header receipt={receipt} />
      <AnimatePresence mode="popLayout">
        {currentStep === -1 && (
          <StartStep onStart={() => setStep((count) => count + 1)} />
        )}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 16,
          }}
        >
          {receipt.steps.map((step, index, arr) => {
            if (currentStep > index) {
              return null;
            }

            const prevSteps = arr.slice(0, index);
            const generalVolume = prevSteps.reduce((acc, step) => {
              if (step.type === "poor") {
                return acc + step.volume;
              }
              return acc;
            }, 0);

            return (
              <StepRoot
                layout
                key={index}
                exit={{ scale: 0.8, opacity: 0 }}
                variants={{
                  focused: { scale: 1, opacity: 1.0 },
                  unfocused: { scale: 0.8, opacity: 0.4 },
                }}
                initial={currentStep === index ? "focused" : "unfocused"}
                animate={currentStep === index ? "focused" : "unfocused"}
              >
                <motion.div style={{ padding: 16 }}>
                  <Step
                    step={step}
                    active={currentStep === index}
                    generalVolume={generalVolume}
                    onNext={() => setStep((count) => count + 1)}
                    onBack={() => setStep((count) => count - 1)}
                  />
                </motion.div>
                <motion.div style={{ flex: 1 }} />
                {index === currentStep && (
                  <motion.div
                    style={{
                      padding: 16,
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    <motion.button
                      onClick={() => setStep((count) => count + 1)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ width: "100%" }}
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
          <EndStep onEnd={() => setStep(-1)} />
        )}
      </AnimatePresence>
    </StepperRoot>
  );
};
