import React from "react";
import { useQuery } from "@tanstack/react-query";
import { WeightsContext } from "./WeightsContext";

const useWeightsQuery = () => {
  const isInitialLoadedRef = React.useRef(false);
  const [zeroWeight, setZeroWeight] = React.useState<number>(0);
  const { data } = useQuery({
    queryKey: ["weightsData"],
    queryFn: async () => {
      try {
        const response = await fetch("http://weights.local", {
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

export const WeightsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { weightGrams, setZeroWeights } = useWeightsQuery();

  return (
    <WeightsContext.Provider value={{ weightGrams, setZeroWeights }}>
      {children}
    </WeightsContext.Provider>
  );
};
