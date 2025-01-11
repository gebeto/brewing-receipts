import { Beep } from "./beeper";

const beeper = new Beep(1, "sine");
beeper.init();

export type BeepType = "short" | "long";

export const beep = (type: BeepType = "short") => {
  // const synth = new Synth().toDestination();
  if (type === "short") {
    beeper.beep([[500, 100]]);
    // synth.triggerAttackRelease("C4", "8n");
  } else {
    beeper.beep([[600, 200]]);
    // synth.triggerAttackRelease("C5", "4n");
  }
};
