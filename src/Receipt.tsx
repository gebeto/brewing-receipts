import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import { ReceiptDefinition, receipts } from "./receipts";
import { Step } from "./Step";
import { useNavigate, useParams } from "react-router";

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
        backgroundColor: "#fff",
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
      exit={{ scale: 0.8, opacity: 0.4 }}
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
          <StartStep
            key={currentStep}
            onStart={() => setStep((count) => count + 1)}
          />
        )}
        <AnimatePresence mode="popLayout">
          {step && (
            <StepRoot
              layout
              key={currentStep}
              initial={{ scale: 0.96, x: 130, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.96, x: -130, opacity: 0 }}
            >
              <motion.div style={{ padding: 16 }}>
                <Step
                  step={step}
                  active={true}
                  generalVolume={generalVolume}
                  onNext={() => setStep((count) => count + 1)}
                  onBack={() => setStep((count) => count - 1)}
                />
              </motion.div>
              <motion.div style={{ flex: 1 }} />
              <motion.div
                style={{
                  padding: 16,
                  borderTop: "1px solid #ddd",
                }}
              >
                <motion.button
                  onClick={() => setStep((count) => count + 1)}
                  style={{ width: "100%" }}
                >
                  Next
                </motion.button>
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
