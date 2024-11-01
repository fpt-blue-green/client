import IInfluencer from './influencer';
import IJob from './job';

interface IInfluencerJobs extends IInfluencer {
  jobs: IJob[];
}

export default IInfluencerJobs;
