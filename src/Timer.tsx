import React from "react";
import { beep, BeepType } from "./utils/beep";

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

export const Timer = ({
  seconds,
  active,
  onDone,
  beeps,
}: {
  seconds: number;
  active: boolean;
  onDone?: () => void;
  beeps?: Record<number, BeepType>;
}) => {
  const timer = useTimer(seconds, active, onDone);
  React.useEffect(() => {
    if (!beeps) {
      return;
    }
    if (beeps[timer]) {
      beep(beeps[timer]);
    }
  }, [timer, beeps]);
  return <span>{timer.toFixed(1)}</span>;
};
