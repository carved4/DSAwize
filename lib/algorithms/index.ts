import { bubbleSort } from './sorting/bubble-sort';
import { binarySearch } from './searching/binary-search';
import { Algorithm } from '@/lib/types/algorithm';

export const algorithms: Algorithm[] = [
  bubbleSort,
  binarySearch
];