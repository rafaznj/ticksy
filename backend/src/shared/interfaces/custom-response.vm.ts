import { CustomErrorViewModel } from "./custom-error.vm";

export interface CustomResponseViewModel<T> {
  status: number;
  data?: T | null;
  error: CustomErrorViewModel;
}
