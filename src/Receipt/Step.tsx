import { motion } from "motion/react";
import {
  StepDefinitionPoor,
  StepDefinitionWait,
  StepDefinition,
  ReceiptDefinition,
} from "../receipts";
import { Timer } from "../Timer";

import goosneckSrc from "../assets/goosneck.png";
import waitSrc from "../assets/wait.png";

export type StepProps<T extends StepDefinition> = {
  step: T;
  receipt: ReceiptDefinition;
  index: number;
  active: boolean;
  generalVolume: number;
  onNext?: () => void;
  onBack?: () => void;
};

const StepHeader: React.FC<{
  index: number;
  count: number;
  children: React.ReactNode;
}> = (props) => {
  return (
    <motion.div
      style={{
        borderBottom: "1px solid #ddd",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <motion.h3
        style={{
          padding: 16,
          borderRight: "1px solid #ddd",
          width: 40,
          lineHeight: "40px",
        }}
      >
        {props.index + 1}/{props.count}
      </motion.h3>
      <motion.h2 style={{ padding: 16, lineHeight: "40px" }}>
        {props.children}
      </motion.h2>
    </motion.div>
  );
};

export const StepWait = (props: StepProps<StepDefinitionWait>) => {
  return (
    <div>
      <StepHeader index={props.index} count={10}>
        Wait for {props.step.seconds}
      </StepHeader>
      <motion.img
        src={waitSrc}
        alt="wait"
        width="90px"
        initial={{ scale: 1 }}
        animate={props.active && { scale: 1.1 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 1,
        }}
      />
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        <Timer
          seconds={props.step.seconds}
          active={props.active}
          onDone={props.onNext}
          beeps={{
            3: "short",
            2: "short",
            1: "short",
            0: "long",
          }}
        />
      </motion.h2>
    </div>
  );
};

export const StepPoor = (props: StepProps<StepDefinitionPoor>) => {
  return (
    <div>
      <StepHeader index={props.index} count={props.receipt.steps.length}>
        Poor {props.step.volume}ml
      </StepHeader>
      <motion.img
        src={goosneckSrc}
        alt="poor"
        width="180px"
        initial={{ rotateZ: 10 }}
        animate={props.active && { rotateZ: -10 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 1.4,
        }}
      />
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        <Timer
          seconds={props.step.seconds}
          active={props.active}
          beeps={
            props.step.seconds
              ? {
                  3: "short",
                  2: "short",
                  1: "short",
                  0: "long",
                }
              : {
                  0: "long",
                }
          }
          onDone={props.step.seconds ? props.onNext : undefined}
        />
      </motion.h2>
      <motion.h2 style={{ fontSize: 50, fontWeight: 400 }}>
        up to{" "}
        <motion.strong style={{ fontWeight: 900 }}>
          {props.generalVolume + props.step.volume}ml
        </motion.strong>
      </motion.h2>
    </div>
  );
};

export const Step = ({ step, ...props }: StepProps<StepDefinition>) => {
  if (step.type === "poor") {
    return <StepPoor step={step} {...props} />;
  }
  if (step.type === "wait") {
    return <StepWait step={step} {...props} />;
  }
  return null;
};
