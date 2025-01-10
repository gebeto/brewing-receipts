import React from "react";
import { motion } from "motion/react";
import {
  StepDefinitionPoor,
  StepDefinitionWait,
  StepDefinition,
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

export type StepProps<T extends StepDefinition> = T & {
  active: boolean;
  onNext?: () => void;
  onBack?: () => void;
};

export const StepWait = (props: StepProps<StepDefinitionWait>) => {
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

export const StepPoor = (props: StepProps<StepDefinitionPoor>) => {
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

export const Step = ({
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
