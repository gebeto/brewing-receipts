import { Synth } from "tone";

export type BeepType = "short" | "long";

export const beep = (type: BeepType = "short") => {
  const synth = new Synth().toDestination();
  if (type === "short") {
    synth.triggerAttackRelease("C4", "8n");
  } else {
    synth.triggerAttackRelease("C5", "4n");
  }
};
