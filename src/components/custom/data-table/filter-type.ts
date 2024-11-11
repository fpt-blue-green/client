import { ReactNode } from 'react';

export interface DataTableFilterField<TData> {
  label: string;
  key: string;
  value: keyof TData;
  placeholder?: string;
  options?: FilterOption[];
  multiple?: boolean;
}

export interface FilterOption {
  label: string;
  key: string;
  icon?: ReactNode;
}
