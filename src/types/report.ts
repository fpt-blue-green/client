interface IReport {
  id: string;
  reporterId: string;
  reporterName: string;
  influencerName: string;
  influencerId: string;
  reason: number;
  description: string;
  reportStatus: number;
  createdAt: string;
  modifiedAt: string;
}

export default IReport;
