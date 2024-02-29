import { Button, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function CustomAppointmentLetter() {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,

    handleSubmit,
  } = useForm({
    defaultValues: {
      profileDetails: "",
      jobDetails: "",
      annualCompensation: "",
      officeCodeOfConduct: "",
      leavesAndAttendance: "",
    },
  });

  const handleLetterSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex  mt-3 justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Appointment Letter</h2>
        <form onSubmit={handleSubmit(handleLetterSubmit)}>
          {/* <div className="mt-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            "&.MuiButton-root": {
              margin: "0px !important",
            },
          }}
        >
          Genrate
        </Button>
      </div> */}

          <div className="w-full mt-3">
            <label>Profile Details:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("profileDetails")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="profileDetails"
                    value={value}
                    placeholder="Profile Details"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("profileDetails");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.profileDetails?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Job Details:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("jobDetails")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="jobDetails"
                    value={value}
                    placeholder="Job Details"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("jobDetails");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.jobDetails?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>

          <div className="w-full mt-3">
            <label>Annual compensation:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("annualCompensation")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="annualCompensation,"
                    value={value}
                    placeholder="Annual compensation,Date of joining,Probation,Retirement...."
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("annualCompensation");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.annualCompensation?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Office Code of Conduct:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("officeCodeOfConduct")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="officeCodeOfConduct,"
                    value={value}
                    placeholder="Office Code of Conduct"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("officeCodeOfConduct");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.officeCodeOfConduct?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <label>Leaves and Attendance</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("leavesAndAttendance")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    id="leavesAndAttendance,"
                    value={value}
                    placeholder="Leaves and Attendance"
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("leavesAndAttendance");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.leavesAndAttendance?.type === "required" && (
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

export default CustomAppointmentLetter;
