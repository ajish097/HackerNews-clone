export interface Item {
  postId: number;
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parent: number;
  score: number;
  time: number;
  text: string;
  title: string;
  comments: Array<Item>;
  type: string;
  url: string;
}
