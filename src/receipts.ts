export type StepDefinitionPoor = {
  type: "poor";
  volume: number;
  flowRate: number;
  title: string;
};

export type StepDefinitionWait = {
  type: "wait";
  seconds: number;
  title: string;
};
export type StepDefinition = StepDefinitionPoor | StepDefinitionWait;

export type ReceiptDefinition = {
  title: string;
  description: string;
  coffeeWeight: number;
  flowRate: number;
  steps: StepDefinition[];
};

export const tiktokPooroverReceipt: ReceiptDefinition = {
  title: "TikTok Poor Over",
  coffeeWeight: 18,
  flowRate: 7,
  description: "Some description",
  steps: [
    {
      type: "wait",
      seconds: 5,
      title: "First wait",
    },
    {
      type: "poor",
      volume: 45,
      title: "Bloom",
      flowRate: 7,
    },
    {
      type: "wait",
      seconds: 45,
      title: "First wait",
    },
    {
      type: "poor",
      volume: 60,
      title: "First poor",
      flowRate: 7,
    },
    {
      type: "wait",
      seconds: 45,
      title: "Second wait",
    },
    {
      type: "poor",
      volume: 60,
      title: "Second poor",
      flowRate: 7,
    },
    {
      type: "wait",
      seconds: 45,
      title: "Third wait",
    },
    {
      type: "poor",
      volume: 60,
      title: "Third poor",
      flowRate: 7,
    },
    {
      type: "wait",
      seconds: 45,
      title: "Forth wait",
    },
  ],
};

export const receipts: ReceiptDefinition[] = [tiktokPooroverReceipt];
