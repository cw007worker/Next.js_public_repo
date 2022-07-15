//productとunitを抽象化した名前をitemと名付けた
import { Item } from './item';

export type ListItem = {
  id: number;
  name: string;
  description: string | undefined;
  image:
    | {
        src: string;
        alt: string;
      }
    | undefined;
  items: Item[];
};
