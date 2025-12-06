import React from "react";
import { useQuery } from "@tanstack/react-query";
import { WeightsContext } from "./WeightsContext";
import { useControls } from "leva";

const useDummyWeightsValue = () => {
  const { weights } = useControls({
    weights: {
      value: 0,
      min: 0,
      max: 5000,
      step: 1,
    },
  });
  return {
    weightGrams: weights / 10,
    setZeroWeights: () => {},
  };
};

const useWeightsQuery = () => {
  const isInitialLoadedRef = React.useRef(false);
  const [zeroWeight, setZeroWeight] = React.useState<number>(0);
  const { data } = useQuery({
    queryKey: ["weightsData"],
    queryFn: async () => {
      try {
        const response = await fetch("http://weights.local/weights", {
          signal: AbortSignal.timeout(500),
        });
        const data = await response.text();
        const number = parseInt(data, 10);
        if (!isInitialLoadedRef.current) {
          isInitialLoadedRef.current = true;
          setZeroWeight(number);
        }
        return number;
      } catch (error) {
        console.log("Error fetching weights data:", error);
        throw error;
        return 0;
      }
    },
    retry: 2,
    refetchInterval: 100,
  });

  const weightGrams = React.useMemo(() => {
    if (!data) return 0;
    return (data - zeroWeight) / 10;
  }, [data, zeroWeight]);

  return {
    weightGrams,
    setZeroWeights: () => setZeroWeight(data ?? 0),
  };
};

const useWeights = import.meta.env.VITE_DUMMY_WEIGHTS
  ? useDummyWeightsValue
  : useWeightsQuery;

export const WeightsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { weightGrams, setZeroWeights } = useWeights();

  return (
    <WeightsContext.Provider value={{ weightGrams, setZeroWeights }}>
      {children}
    </WeightsContext.Provider>
  );
};
