import React from "react";
import { WeightsContext, WeightsProvider } from "../components/weights";

export const Weights: React.FC = () => {
  return (
    <WeightsProvider>
      <WeightsContext.Consumer>
        {({ weightGrams, setZeroWeights }) => (
          <div>
            <h2>Weights Page</h2>
            <p>This is where weight-related information will be displayed.</p>
            <div>
              value: <h1>{weightGrams}g</h1>
            </div>
            <button onClick={() => setZeroWeights()}>Set Zero Weight</button>
          </div>
        )}
      </WeightsContext.Consumer>
    </WeightsProvider>
  );
};
