import { Button, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputField from "../InputField/InputField";

import toast from "react-hot-toast";

interface ISelectModelData {
  heading: string;
  inputLabel: string;
  message: string;
  errorMessage: string;
  buttonName: string;
  closeModal: () => void;
  refetch: () => void;
  postRequestApi: (requestData: { name: string }) => any;
}
interface IPostData {
  selectName: string;
}
const CommonSelectModel: React.FC<ISelectModelData> = ({
  heading,
  inputLabel,
  buttonName,
  closeModal,
  postRequestApi,
  message,
  errorMessage,
  refetch,
}) => {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      selectName: "",
    },
  });
  const onSubmitSelect = async (data: IPostData) => {
    const requestData = {
      name: data.selectName,
    };

    try {
      const response = await postRequestApi(requestData);
      //   console.log("Log: resposne", response);
      if (response) {
        toast.success(message, {
          position: "top-center",
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
        refetch();
        closeModal();
        reset();
      } else {
        toast.error(errorMessage, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="w-96">
      <h2 className="text-2xl font-semibold mb-2">{heading}</h2>
      <form onSubmit={handleSubmit(onSubmitSelect)} autoComplete="off">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("selectName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label={inputLabel}
                  placeholder={inputLabel}
                  name="selectName"
                  aria-invalid={errors.selectName ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("selectName");
                  }}
                />
              )}
            />
            {errors.selectName?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => {
              closeModal();
              reset();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#fff !important",
              color: "var( --primary-color) !important",
              border: "2px solid var( --primary-color) !important",
              marginLeft: "0px !important",
            }}
          >
            close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {buttonName}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommonSelectModel;
