import React from 'react';

interface CheckBoxProps {
  children: string;
  disabled?: boolean;
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Checkbox({ children, disabled, checked, onChange }: CheckBoxProps) {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
}
