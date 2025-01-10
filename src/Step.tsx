import { motion } from "motion/react";
import {
  StepDefinitionPoor,
  StepDefinitionWait,
  StepDefinition,
} from "./receipts";
import { Timer } from "./Timer";

export type StepProps<T extends StepDefinition> = T & {
  active: boolean;
  generalVolume: number;
  onNext?: () => void;
  onBack?: () => void;
};

export const StepWait = (props: StepProps<StepDefinitionWait>) => {
  return (
    <div>
      <motion.h2>Wait</motion.h2>
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        <Timer
          seconds={props.seconds}
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
      <motion.h2>Poor {props.volume}ml</motion.h2>
      <motion.h2 style={{ fontSize: 60 }}>
        up to {props.generalVolume + props.volume}ml
      </motion.h2>
      <motion.h2 style={{ fontSize: 60, fontFamily: "monospace" }}>
        <Timer
          seconds={Math.ceil(props.volume / props.flowRate)}
          active={props.active}
        />
      </motion.h2>
    </div>
  );
};

export const Step = ({
  step,
  active,
  generalVolume,
  onNext,
}: {
  step: StepDefinition;
  generalVolume: number;
  active: boolean;
  onNext?: () => void;
  onBack?: () => void;
}) => {
  if (step.type === "poor") {
    return (
      <StepPoor
        {...step}
        active={active}
        onNext={onNext}
        generalVolume={generalVolume}
      />
    );
  }
  if (step.type === "wait") {
    return (
      <StepWait
        {...step}
        active={active}
        onNext={onNext}
        generalVolume={generalVolume}
      />
    );
  }
  return null;
};
