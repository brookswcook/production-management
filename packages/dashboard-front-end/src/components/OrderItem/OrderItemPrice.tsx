import FloatTextField from "../Common/FloatTextField";

export function OrderItemPrice({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: number) => void;
}) {
  return (
    <FloatTextField
      fullWidth
      label="Price per item"
      value={value}
      onChange={({ target: { value } }) => onChange(Number(value))}
      required
      sx={{ mt: 1 }}
    />
  );
}
