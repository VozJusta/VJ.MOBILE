export interface ISimulationStore {
  simulationId: string;
  setSimulationId: (simulationId: string) => void;
  clearSimulationId: () => void;
}
