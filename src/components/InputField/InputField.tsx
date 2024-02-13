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
          color: "#226d6d8c",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#226d6d8c",
            color: "#226d6d8c",
          },
          "&:hover fieldset": {
            borderColor: "#226d6d8c",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#226d6d8c",
          },
        },
      }}
    />
  );
};

export default InputField;
