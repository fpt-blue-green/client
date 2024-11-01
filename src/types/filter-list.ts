export interface IFilterList<T> {
  totalCount: number;
  items: T[];
}

export interface IFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  isAscending?: boolean;
}
