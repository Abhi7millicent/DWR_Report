import TextField from "@mui/material/TextField";

interface InputValue {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder: string;
}

const InputField: React.FC<InputValue> = ({
  label,
  value,
  onChange,
  type,
  name,
  placeholder,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      name={name}
      placeholder={placeholder}
      fullWidth
      sx={{
        "& .MuiInputLabel-root": {
          color: "var(--primary-color) !important",
          fontFamily: "var(--font-family) !important",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "var(--primary-color) !important",
            color: "var(--primary-color) !important",
            fontFamily: "var(--font-family) !important",
          },
          "&:hover fieldset": {
            borderColor: "var(--primary-color) !important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--primary-color) !important",
            fontFamily: "var(--font-family) !important",
          },
        },
      }}
    />
  );
};

export default InputField;
