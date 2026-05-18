export interface ISimulationStore {
  simulationId: string;
  simulationReportId: string;
  setSimulationId: (simulationId: string) => void;
  setSimulationReportId: (simulationReportId: string) => void;
  clearSimulationId: () => void;
  clearSimulationReportId: () => void;
}
