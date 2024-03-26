import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../components/InputField/InputField";
import MultiSelect from "multiselect-react-dropdown";
import {
  usePostProject,
  usePutProjectById,
} from "../../hook/querie/useProjects";

interface ModalProps {
  onClose: () => void;
  refetchData: () => void;
  editProjectIdData: any;
  editProjectId: string;
  setEditProject: any;
  editProject: boolean;
}

interface IProjectData {
  projectName: "";
  clientName: "";
  clientLocation: "";
  contact: "";
  emailId: "";
  startDate: "";
  endDate: "";
  technology: "";
  description: "";
}
const AddProject: React.FC<ModalProps> = ({
  onClose,
  refetchData,
  editProjectIdData,
  editProjectId,
  setEditProject,
  editProject,
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
      projectName: "",
      clientName: "",
      clientLocation: "",
      contact: "",
      emailId: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const { mutateAsync: PostProject } = usePostProject();
  const { mutateAsync: PutProjectById } = usePutProjectById();

  useEffect(() => {
    if (!editProject) {
      setValue("projectName", editProjectIdData?.name);
      setValue("startDate", editProjectIdData?.startDate);
      setValue("endDate", editProjectIdData?.endDate);
      setValue("description", editProjectIdData?.description);
    }
  }, [editProjectIdData]);

  const onSubmitProject = async (data: IProjectData) => {
    const projectData = {
      name: data.projectName,
      clientName: data.clientName,
      clientLocation: data.clientLocation,
      contact: data.contact,
      emailId: data.emailId,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (editProject) {
      try {
        const response = await PostProject(projectData);

        if (response) {
          toast.success("Project Added successful!", {
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
          setEditProject(false);
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
        await PutProjectById({
          id: editProjectId,
          data: projectData,
        });

        toast.success("Project edited successful!", {
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
        {editProject === true ? "Create Project" : "Edit Project"}
      </h2>
      <form onSubmit={handleSubmit(onSubmitProject)}>
        <Grid container spacing={2} alignItems="center" marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("projectName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Project Name"
                  placeholder="Project Name"
                  name="projectName"
                  aria-invalid={errors.projectName ? "true" : "false"}
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
              {...register("clientName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Client Name"
                  placeholder="Client Name"
                  name="clientName"
                  aria-invalid={errors.clientName ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("clientName");
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
              {...register("clientLocation")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Client Location"
                  placeholder="Client Location"
                  name="clientLocation"
                  aria-invalid={errors.clientLocation ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("clientLocation");
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
              {...register("contact")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Contact"
                  placeholder="Contact"
                  name="contact"
                  aria-invalid={errors.contact ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("contact");
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
              {...register("emailId")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="email"
                  label="Email Id"
                  placeholder="Email Id"
                  name="emailId"
                  aria-invalid={errors.emailId ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("emailId");
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
              setEditProject(false);
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
            {editProject === true ? "Add project" : "Edit project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
