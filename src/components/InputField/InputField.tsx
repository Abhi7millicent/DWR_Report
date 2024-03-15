import TextField, { TextFieldProps } from "@mui/material/TextField";
import { InputLabelProps } from "@mui/material/InputLabel";

interface InputValue extends Omit<TextFieldProps, "InputLabelProps"> {
  label: string;
  type: string;
  InputLabelProps?: InputLabelProps; // Making InputLabelProps optional
}

const InputField: React.FC<InputValue> = ({
  label,
  value,
  onChange,
  type,
  name,
  placeholder,
  InputLabelProps,
}) => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
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
      inputProps={{ min: type === "date" ? getCurrentDate() : undefined }}
      InputLabelProps={type === "date" ? { shrink: true } : undefined} // Conditionally apply shrink
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
