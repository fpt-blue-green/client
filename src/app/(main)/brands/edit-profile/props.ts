import IBrand from '@/types/brand';
import { KeyedMutator } from 'swr/_internal';

interface BrandDetailsProps {
  brand: IBrand;
  mutate: KeyedMutator<IBrand>;
}

export default BrandDetailsProps;
