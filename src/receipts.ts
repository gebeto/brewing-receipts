export type StepDefinitionPoor = {
  type: "poor";
  seconds: number;
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
  poorOver: ("kalita" | "v60" | "chemex")[];
  description: string;
  coffeeWeight: number;
  flowRate: number;
  steps: StepDefinition[];
};

export const best21Receipt: ReceiptDefinition = {
  title: "Best 21g 375ml",
  poorOver: ["kalita"],
  coffeeWeight: 21,
  flowRate: 7,
  description: "Some description",
  steps: [
    {
      type: "poor",
      seconds: 40,
      volume: 60,
      title: "Bloom",
    },
    {
      type: "poor",
      seconds: 20,
      volume: 140,
      title: "First poor",
    },
    {
      type: "wait",
      seconds: 10,
      title: "Second wait",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Second poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Third poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Forth poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Fifth poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Sixth poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Seventh poor",
    },
    {
      type: "poor",
      volume: 25,
      seconds: 10,
      title: "Eighth poor",
    },
    {
      type: "wait",
      seconds: 40,
      title: "wait",
    },
  ],
};

export const tiktokPooroverReceipt: ReceiptDefinition = {
  title: "TikTok Poor Over",
  poorOver: ["kalita", "v60", "chemex"],
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
      seconds: 45,
      title: "Bloom",
    },
    {
      type: "poor",
      volume: 60,
      seconds: 45,
      title: "First poor",
    },
    {
      type: "poor",
      volume: 60,
      seconds: 45,
      title: "Second poor",
    },
    {
      type: "poor",
      volume: 60,
      seconds: 45,
      title: "Third poor",
    },
    {
      type: "poor",
      volume: 60,
      seconds: 45,
      title: "Forth poor",
    },
  ],
};

export const simplyGood18300Receipt: ReceiptDefinition = {
  title: "Simply Good 18g 300ml",
  poorOver: ["kalita", "v60"],
  coffeeWeight: 18,
  flowRate: 7,
  description: "Some description",
  steps: [
    {
      type: "poor",
      volume: 50,
      seconds: 30,
      title: "Bloom",
    },
    {
      type: "poor",
      volume: 100,
      seconds: 60,
      title: "First poor",
    },
    {
      type: "poor",
      volume: 150,
      seconds: 90,
      title: "Second poor",
    },
  ],
};

export const receipts: ReceiptDefinition[] = [
  best21Receipt,
  simplyGood18300Receipt,
  tiktokPooroverReceipt,
];
