export type StepDefinitionPoor = {
  type: "poor";
  volume: number;
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
      type: "poor",
      volume: 45,
      title: "Bloom",
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
    },
    {
      type: "wait",
      seconds: 45,
      title: "Forth wait",
    },
  ],
};

export const receipts: ReceiptDefinition[] = [tiktokPooroverReceipt];
