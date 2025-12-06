import { motion } from "motion/react";
import {
  StepDefinitionPoor,
  StepDefinitionWait,
  StepDefinition,
  ReceiptDefinition,
} from "../../receipts";
import { Timer } from "../../components/Timer";

import goosneckSrc from "../../assets/goosneck.png";
import waitSrc from "../../assets/wait.png";
import { useWeights } from "../../components/weights";
import { Box, Divider, Typography } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "60px",
      }}
    >
      <Typography
        variant="subtitle2"
        component="div"
        sx={{
          width: "60px",
          lineHeight: "60px",
        }}
      >
        {props.index + 1}/{props.count}
      </Typography>
      <Divider orientation="vertical" sx={{ height: 24 }} />
      <Typography variant="h5" sx={{ px: 2 }}>
        {props.children}
      </Typography>
    </Box>
  );
};

export const StepWait = (props: StepProps<StepDefinitionWait>) => {
  return (
    <div>
      <StepHeader index={props.index} count={10}>
        Wait for {props.step.seconds}
      </StepHeader>
      <Divider />
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
  const { weightGrams } = useWeights();
  return (
    <div>
      <StepHeader index={props.index} count={props.receipt.steps.length}>
        Poor {props.step.volume}ml / {weightGrams}g
      </StepHeader>
      <Divider />
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
