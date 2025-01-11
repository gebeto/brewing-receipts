import { ReceiptDefinition } from "../receipts";

export const calcReceiptVolume = (receipt: ReceiptDefinition) => {
  return receipt.steps.reduce((acc, step) => {
    if (step.type === "poor") {
      return acc + step.volume;
    }
    return acc;
  }, 0);
};

export const calcReceiptBrewingTime = (receipt: ReceiptDefinition) => {
  const seconds = receipt.steps.reduce((acc, step) => {
    if (step.type === "wait") {
      return acc + step.seconds;
    }
    if (step.type === "poor") {
      return acc + step.seconds;
    }
    return acc;
  }, 0);
  return `${Math.floor(seconds / 60)}:${seconds % 60}`;
};
