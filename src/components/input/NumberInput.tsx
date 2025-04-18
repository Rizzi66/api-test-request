import { ChangeEvent } from "react";

interface NumberInputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
}

function NumberInput({ label, value, setValue, min }: NumberInputProps) {
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <label>
        {label} :
        <input
          type="number"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
          min={min}
          required
        />
      </label>
    </div>
  );
}

export default NumberInput;
