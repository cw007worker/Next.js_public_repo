import { Pagenation } from './common/pagenation';
import { Recommendation } from './common/recommendations';

export type RecommendationList = {
  recommendations: Recommendation[];
  pagenation: Pagenation;
};
