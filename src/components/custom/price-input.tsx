'use client';

import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '../ui/input';

interface PriceInputProps extends Omit<InputProps, 'onChange'> {
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(({ value, defaultValue, onChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState<string>(formatPrice(formatPrice(value || defaultValue || 0)));
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref && typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
    }
  }, [ref]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const caretPosition = e.target.selectionStart || 0;
    let unformattedValue = unformatPrice(e.target.value);
    if (inputValue === '0' && e.target.value.endsWith('0')) {
      unformattedValue /= 10;
    }

    // Định dạng lại giá trị
    const formattedValue = formatPrice(unformattedValue);
    setInputValue(formattedValue);

    // Cập nhật giá trị đã unformat cho hàm onChange
    onChange?.(unformattedValue);

    // Điều chỉnh lại vị trí con trỏ sau khi cập nhật giá trị
    const newCaretPosition = calculateNewCursorPosition(caretPosition, e.target.value, formattedValue);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCaretPosition, newCaretPosition);
      }
    }, 0);
  };

  const calculateNewCursorPosition = (oldPosition: number, oldValue: string, newValue: string): number => {
    const oldNonNumericCount = oldValue.slice(0, oldPosition).replace(/[0-9]/g, '').length;
    const newNonNumericCount = newValue.slice(0, oldPosition).replace(/[0-9]/g, '').length;
    const offset = newNonNumericCount - oldNonNumericCount;

    return oldPosition + offset;
  };

  return (
    <Input
      endAdornment="₫"
      {...props}
      type="text"
      inputMode="decimal"
      ref={inputRef}
      // defaultValue={defaultValue && formatPrice(defaultValue)}
      value={value ? formatPrice(value) : inputValue}
      onChange={handleChange}
      inputClassName="text-right" // Căn phải cho phù hợp với tiền tệ
    />
  );
});

PriceInput.displayName = 'PriceInput';

const unformatPrice = (value: string) => {
  // Loại bỏ các ký tự không phải số khỏi giá trị
  return parseFloat(value.replace(/[^\d]/g, '')) || 0;
};

const formatPrice = (value: number | string) => {
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
  }).format(Number(value));
};

export default PriceInput;
