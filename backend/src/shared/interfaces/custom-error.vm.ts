export interface CustomErrorViewModel {
  generic?: {
    [key: string]: string[];
  };
  fields?: {
    [key: string]: string[] | string;
  };
}
