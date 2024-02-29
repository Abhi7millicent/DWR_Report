import { Button, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function CustomOfferLetter() {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,

    handleSubmit,
  } = useForm({
    defaultValues: {
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      paragraph5: "",
    },
  });

  const handleLetterSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex  mt-3 justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Offer Letter</h2>
        <form onSubmit={handleSubmit(handleLetterSubmit)}>
          <div className="w-full mt-3">
            <label>Paragraph 1:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("paragraph1")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="paragraph1"
                    value={value}
                    placeholder="Paragraph 1"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("paragraph1");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.paragraph1?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Paragraph 2:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("paragraph2")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="paragraph2"
                    value={value}
                    placeholder="Paragraph 2"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("paragraph2");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.paragraph2?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>

          <div className="w-full mt-3">
            <label>Paragraph 3:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("paragraph3")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="paragraph3"
                    value={value}
                    placeholder="Paragraph 3"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("paragraph3");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.paragraph2?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Paragraph 4:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("paragraph4")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="paragraph4,"
                    value={value}
                    placeholder="Paragraph 4"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("paragraph4");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.paragraph4?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Paragraph 5</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("paragraph5")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="paragraph5,"
                    value={value}
                    placeholder="Paragraph 5"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("paragraph5");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.paragraph5?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomOfferLetter;
