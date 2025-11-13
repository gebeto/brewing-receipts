import React from "react";
import { useQuery } from "@tanstack/react-query";

export const Weights: React.FC = () => {
  const [zeroWeight, setZeroWeight] = React.useState<number>(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["weightsData"],
    queryFn: async () => {
      try {
        const response = await fetch("http://weights.local", {
          signal: AbortSignal.timeout(500),
        });
        const data = await response.text();
        const number = parseInt(data, 10);
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
  React.useEffect(() => {
    if (!isLoading) {
      setZeroWeight(data ?? 0);
    }
  }, [isLoading]);

  const weightGrams = React.useMemo(() => {
    if (!data) return 0;
    return Math.round(((data - zeroWeight) / 10177) * 100) / 10;
  }, [data, zeroWeight]);

  return (
    <div>
      <h2>Weights Page</h2>
      <p>This is where weight-related information will be displayed.</p>
      <div>
        value: <h1>{weightGrams}g</h1>
      </div>
      <button onClick={() => setZeroWeight(data ?? 0)}>Set Zero Weight</button>
    </div>
  );
};
