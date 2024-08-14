'use client';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckboxProps as SCheckboxProps } from '@radix-ui/react-checkbox';
import { Checkbox as SCheckbox } from '../ui/checkbox';

interface CheckboxProps extends SCheckboxProps {
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, label, ...props }) => {
  const checkboxId = id || 'checkbox-' + uuidv4();

  return (
    <div className="flex items-center gap-2">
      <SCheckbox id={checkboxId} {...props} />
      <label htmlFor={checkboxId} className="text-sm leading-none">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
