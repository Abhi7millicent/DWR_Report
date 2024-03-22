import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../components/InputField/InputField";
import { usePostTask, usePutTaskById } from "../../hook/querie/useTasks";

interface ModalProps {
  onClose: () => void;
  refetchData: () => void;
  editTaskIdData: any;
  editTaskId: string;
  setEditTask: any;
  editTask: boolean;
}

interface ITaskData {
  TaskName: "";
  startDate: "";
  endDate: "";
  description: "";
}
const AddTask: React.FC<ModalProps> = ({
  onClose,
  refetchData,
  editTaskIdData,
  editTaskId,
  setEditTask,
  editTask,
}: ModalProps) => {
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
      TaskName: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const { mutateAsync: PostTask } = usePostTask();
  const { mutateAsync: PutTaskById } = usePutTaskById();

  useEffect(() => {
    if (!editTask) {
      setValue("TaskName", editTaskIdData?.name);
      setValue("startDate", editTaskIdData?.startDate);
      setValue("endDate", editTaskIdData?.endDate);
      setValue("description", editTaskIdData?.description);
    }
  }, [editTaskIdData]);

  const onSubmitTask = async (data: ITaskData) => {
    const TaskData = {
      name: data.TaskName,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (editTask) {
      try {
        const response = await PostTask(TaskData);

        if (response) {
          toast.success("Task Added successful!", {
            position: "top-center",
            style: {
              fontFamily: "var(--font-family)",
              fontSize: "14px",
            },
            iconTheme: {
              primary: "var(--primary-color)",
              secondary: "#fff",
            },
          });
          onClose();
          setEditTask(false);
          refetchData();
          reset();
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Server Error", {
          position: "top-center",
        });
      }
    } else {
      try {
        await PutTaskById({
          id: editTaskId,
          data: TaskData,
        });

        toast.success("Task edited successful!", {
          position: "top-center",
          style: {
            fontFamily: "var(--font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
        onClose();
        refetchData();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Server Error", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {" "}
        {editTask === true ? "Add Task" : "Edit Task"}
      </h2>
      <form onSubmit={handleSubmit(onSubmitTask)}>
        <Grid container spacing={2} alignItems="center" marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("TaskName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Task Name"
                  placeholder="Task Name"
                  name="TaskName"
                  aria-invalid={errors.TaskName ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("TaskName");
                  }}
                />
              )}
            />
            {errors.TaskName?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("startDate")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="date"
                  label="Start date"
                  placeholder="Start date"
                  name="startDate"
                  aria-invalid={errors.startDate ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("startDate");
                  }}
                />
              )}
            />
            {errors.startDate?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("endDate")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="date"
                  label="End Date"
                  placeholder="End Date"
                  name="endDate"
                  aria-invalid={errors.endDate ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("endDate");
                  }}
                />
              )}
            />
            {errors.endDate?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>

        <Grid container mb={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("description")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Description"
                  placeholder="Description"
                  name="description"
                  aria-invalid={errors.description ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("description");
                  }}
                />
              )}
            />
            {errors.description?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>

        <div className="flex justify-between">
          <Button
            onClick={() => {
              setEditTask(false);
              onClose();
              reset();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#fff !important",
              color: "var( --primary-color) !important",
              border: "2px solid var( --primary-color) !important",
            }}
          >
            close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editTask === true ? "Add Task" : "Edit Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
