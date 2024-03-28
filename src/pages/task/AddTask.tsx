import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../components/InputField/InputField";
import { usePostTask, usePutTaskById } from "../../hook/querie/useTasks";
import Select from "react-select";
import { useGetProjectNameList } from "../../hook/querie/useProjects";
import { useGetEmployeeList } from "../../hook/querie/useEmployeeQueries";
import CommonModal from "../../layout/commonModal/CommonModal";
import CommonSelectModel from "../../components/commonSelectModel/CommonSelectModel";
import { useGetTaskType, usePostTaskType } from "../../hook/querie/useDropDown";

interface ModalProps {
  onClose: () => void;
  refetchData: () => void;
  editTaskIdData: any;
  editTaskId: string;
  setEditTask: any;
  editTask: boolean;
}

interface ITaskData {
  TaskName: string;
  startDate: string;
  endDate: string;
  description: string;
  projectName: { value: string; label: string };
  taskType: { value: string; label: string };
  assignTo: { value: string; label: string };
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
      projectName: { value: "", label: "" },
      TaskName: "",
      startDate: "",
      endDate: "",
      description: "",
      taskType: { value: "", label: "" },
      assignTo: { value: "", label: "" },
    },
  });
  // ---------------------------- State ------------------------//
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ---------------------- React query -------------------- //

  const { data: GetProjectNameListData } = useGetProjectNameList();
  const { data: GetEmployeeListData } = useGetEmployeeList();
  const { mutateAsync: PostTask } = usePostTask();
  const { mutateAsync: PutTaskById } = usePutTaskById();
  const { mutateAsync: PostTaskTypeMutateAsync } = usePostTaskType();
  const { data: GetTaskTypeData, refetch: GetTaskTypeRefetch } =
    useGetTaskType();

  useEffect(() => {
    if (!editTask) {
      setValue("TaskName", editTaskIdData?.name);
      // setValue("projectName", 'asdf');
      setValue("projectName", {
        value: editTaskIdData?.projectId?.value,
        label: editTaskIdData?.projectId?.label,
      });
      setValue("taskType", {
        value: editTaskIdData?.taskType?.value,
        label: editTaskIdData?.taskType?.label,
      });
      setValue("assignTo", {
        value: editTaskIdData?.assignTo?.value,
        label: editTaskIdData?.assignTo?.label,
      });

      setValue("startDate", editTaskIdData?.startDate);
      setValue("endDate", editTaskIdData?.endDate);
      setValue("description", editTaskIdData?.description);
    }
  }, [editTaskIdData]);

  const onSubmitTask = async (data: ITaskData) => {
    const TaskData = {
      projectId: data.projectName,
      name: data.TaskName,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      taskType: data.taskType,
      assignTo: data.assignTo,
      taskId: "",
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
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
              {...register("projectName")}
              render={({ field: { onChange, value } }) => (
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  name="Select Project Name"
                  closeMenuOnSelect={false}
                  options={GetProjectNameListData?.map((item) => ({
                    value: item.id, // Assuming item has an 'id' property as value
                    label: item.name, // Assuming item has a 'name' property as label
                  }))}
                  placeholder="Select Project Name"
                  value={
                    value?.value
                      ? {
                          value: value?.value,
                          label: value?.label,
                        }
                      : ""
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("projectName");
                  }}
                />
              )}
            />

            {errors.projectName?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
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
          <Grid item xs={12} sm={4} className="flex">
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("taskType")}
              render={({ field: { onChange, value } }) => (
                <Select
                  name="Select Task Type"
                  closeMenuOnSelect={false}
                  options={GetTaskTypeData?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder="Select Task Type"
                  value={
                    value?.value
                      ? {
                          value: value?.value,
                          label: value?.label,
                        }
                      : ""
                  }
                  className="basic-multi-select  w-80"
                  classNamePrefix="select"
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("taskType");
                  }}
                />
              )}
            />

            {errors.taskType?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
            <div
              className="text-3xl cursor-pointer border-[1px]  border-[var(--primary-color)] rounded"
              onClick={openModal}
            >
              <p className=" h-12 w-14 text-[var(--primary-color)] pt-2 pl-4 ">
                +
              </p>
            </div>
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
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("assignTo")}
              render={({ field: { onChange, value } }) => (
                <Select
                  name="Select Assign name"
                  closeMenuOnSelect={false}
                  options={GetEmployeeListData?.employees?.map((item) => ({
                    value: item.id,
                    label: `${item.firstName} ${item.lastName}`,
                  }))}
                  placeholder="Select Assign Name"
                  value={
                    value?.value
                      ? {
                          value: value?.value,
                          label: value?.label,
                        }
                      : ""
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("assignTo");
                  }}
                />
              )}
            />

            {errors.assignTo?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>

        <Grid container mb={2} mt={2}>
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
              marginLeft: "0px !important",
            }}
          >
            close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editTask === true ? "Add Task" : "Edit Task"}
          </Button>
        </div>
      </form>
      <CommonModal isOpen={isModalOpen} onClose={closeModal}>
        <CommonSelectModel
          heading="Create Task Type"
          inputLabel="Add Task Type"
          buttonName="Create Task Type"
          closeModal={closeModal}
          postRequestApi={PostTaskTypeMutateAsync}
          message="Task type created successful!!"
          errorMessage="Task type created failed !!"
          refetch={GetTaskTypeRefetch}
        />
      </CommonModal>
    </div>
  );
};

export default AddTask;
