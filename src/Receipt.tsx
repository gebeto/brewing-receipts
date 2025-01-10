import React from "react";

import { AnimatePresence, motion } from "motion/react";

import {
  StepDefinitionPoor,
  StepDefinitionWait,
  StepDefinition,
  ReceiptDefinition,
} from "./receipts";
import { beep } from "./utils/beep";

const useTimer = (seconds: number, active: boolean, onDone?: () => void) => {
  const [time, setTime] = React.useState(seconds);

  const timeRef = React.useRef(time);
  timeRef.current = time;

  const onDoneRef = React.useRef(onDone);
  onDoneRef.current = onDone;

  React.useEffect(() => {
    if (!active) {
      setTime(seconds);
      return;
    }

    const interval = setInterval(() => {
      const v = Math.round((timeRef.current - 0.1) * 100) / 100;

      if (v < 0) {
        clearInterval(interval);
        onDoneRef.current?.();
        return;
      }

      setTime(v);
      return;
    }, 100);

    return () => clearInterval(interval);
  }, [active, seconds]);

  return time;
};

type StepProps<T extends StepDefinition> = T & {
  active: boolean;
  onNext?: () => void;
  onBack?: () => void;
};

const StepWait = (props: StepProps<StepDefinitionWait>) => {
  const timer = useTimer(props.seconds, props.active, props.onNext);

  React.useEffect(() => {
    switch (timer) {
      case 3:
        beep();
        break;
      case 2:
        beep();
        break;
      case 1:
        beep();
        break;
      case 0:
        beep(false);
        break;
    }
  }, [timer]);
  return (
    <div>
      <motion.h2>Wait</motion.h2>
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        {timer.toFixed(1)}
      </motion.h2>
    </div>
  );
};

const StepPoor = (props: StepProps<StepDefinitionPoor>) => {
  const timer = useTimer(
    Math.ceil(props.volume / props.flowRate),
    props.active
  );
  return (
    <div>
      <motion.h2>Poor</motion.h2>
      <motion.h2 style={{ fontSize: 60 }}>{props.volume}ml</motion.h2>
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        {timer.toFixed(1)}
      </motion.h2>
    </div>
  );
};

const StepRenderer = ({
  step,
  active,
  onNext,
}: {
  step: StepDefinition;
  active: boolean;
  onNext?: () => void;
  onBack?: () => void;
}) => {
  if (step.type === "poor") {
    return <StepPoor {...step} active={active} onNext={onNext} />;
  }
  if (step.type === "wait") {
    return <StepWait {...step} active={active} onNext={onNext} />;
  }
  return null;
};

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
    <div className="stepper">
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
        {receipt.steps.map((step, index) => {
          if (currentStep > index) {
            return null;
          }

          return (
            <motion.div
              layout
              className="step"
              key={index}
              style={{
                minHeight: "45vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              variants={{
                focused: { scale: 1, opacity: 1.0 },
                unfocused: { scale: 0.8, opacity: 0.9 },
              }}
              initial={currentStep !== index ? "unfocused" : "focused"}
              animate={currentStep !== index ? "unfocused" : "focused"}
            >
              <motion.div>
                <StepRenderer
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
            </motion.div>
          );
        })}
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
    </div>
  );
};
