export interface IEvidences {
  uri: string;
  index: number;
  fileTypes?: string[];
  removeEvidence: (index: number) => void;
  size: string;
}
