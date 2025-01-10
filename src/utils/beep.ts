import { Synth } from "tone";

export const beep = (short = true) => {
  const synth = new Synth().toDestination();
  if (short) {
    synth.triggerAttackRelease("C4", "8n");
  } else {
    synth.triggerAttackRelease("C5", "4n");
  }
};
