import IBrand from '@/types/brand';
import { KeyedMutator } from 'swr/_internal';

interface DetailStepProps {
  profile: IBrand;
  mutate: KeyedMutator<IBrand>;
}

export default DetailStepProps;