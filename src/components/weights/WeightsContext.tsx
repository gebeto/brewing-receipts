import React from "react";

export const WeightsContext = React.createContext<{
  weightGrams: number;
  setZeroWeights: () => void;
}>({
  weightGrams: 0,
  setZeroWeights: () => {},
});

export const useWeights = () => {
  const context = React.useContext(WeightsContext);

  if (!context) {
    throw new Error("useWeights must be used within a WeightsProvider");
  }

  return context;
};
