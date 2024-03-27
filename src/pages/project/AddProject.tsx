import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../components/InputField/InputField";

import {
  useGetProjectTechnologiesList,
  usePostProject,
  usePostTechnologiesList,
  usePutProjectById,
} from "../../hook/querie/useProjects";
import Select from "react-select";
import CommonModal from "../../layout/commonModal/CommonModal";
import CommonSelectModel from "../../components/commonSelectModel/CommonSelectModel";

import { useGetProjectDevelpoerName } from "../../hook/querie/useEmployeeQueries";
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
  contactName: "";
  emailId: "";
  startDate: "";
  endDate: "";
  technology: "";
  description: "";
  contactNumber: "";
  selectTechnology: "";
  selectDevelpoer: "";
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
      contactName: "",
      emailId: "",
      contactNumber: "",
      startDate: "",
      endDate: "",
      description: "",
      selectTechnology: "",
      selectDevelpoer: "",
    },
  });
  // ---------------------------- State ------------------------//
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------------------------- React Query ------------------------//
  const { mutateAsync: PostProject } = usePostProject();
  const { mutateAsync: PutProjectById } = usePutProjectById();
  const { mutateAsync: PostTechnologiesListMutateAsync } =
    usePostTechnologiesList();
  const {
    data: GetProjectTechnologiesList,
    refetch: GetProjectTechnologiesListRefetch,
  } = useGetProjectTechnologiesList();
  const { data: GetProjectDevelpoerNameData } = useGetProjectDevelpoerName();

  useEffect(() => {
    if (!editProject) {
      setValue("projectName", editProjectIdData?.name);
      setValue("clientName", editProjectIdData?.clientName);
      setValue("clientLocation", editProjectIdData?.clientLocation);
      setValue("contactName", editProjectIdData?.contactName);
      setValue("emailId", editProjectIdData?.emailId);
      setValue("contactNumber", editProjectIdData?.contactNo);
      setValue("startDate", editProjectIdData?.startDate);
      setValue("endDate", editProjectIdData?.endDate);
      setValue("description", editProjectIdData?.description);
      setValue(
        "selectTechnology",
        editProjectIdData?.technology?.map((item) => ({
          value: item.value,
          label: item.label,
        }))
      );
      setValue(
        "selectDevelpoer",
        editProjectIdData?.employeeProjectId?.map((item) => ({
          value: item.value,
          label: item.label,
        }))
      );
    }
  }, [editProjectIdData]);

  const onSubmitProject = async (data: IProjectData) => {
    console.log(data);

    if (
      Array.isArray(data.selectTechnology) &&
      Array.isArray(data.selectDevelpoer)
    ) {
      const projectData = {
        name: data.projectName,
        clientName: data.clientName,
        clientLocation: data.clientLocation,
        contactName: data.contactName,
        contactNo: data.contactNumber,
        emailId: data.emailId,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        technology: data.selectTechnology,
        employeeProjectId: data.selectDevelpoer,
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

          toast.success("Project edited successfully!", {
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
    } else {
      console.error(
        "data.selectTechnology or data.selectDevelpoer is not an array."
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-1">
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
            {errors.clientName?.type === "required" && (
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
            {errors.clientLocation?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("contactName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Contact Name"
                  placeholder="Contact Name"
                  name="contactName"
                  aria-invalid={errors.contactName ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("contactName");
                  }}
                />
              )}
            />
            {errors.contactName?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("contactNumber")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="number"
                  label="Contact Number"
                  placeholder="Contact Number"
                  name="contactNumber"
                  aria-invalid={errors.contactNumber ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("contactNumber");
                  }}
                />
              )}
            />
            {errors.contactNumber?.type === "required" && (
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
          <Grid item xs={12} sm={4} className="flex">
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("selectTechnology")}
              render={({ field: { onChange, value } }) => (
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  closeMenuOnSelect={false}
                  name="colors"
                  options={GetProjectTechnologiesList?.map((item) => ({
                    value: item.id, // Assuming item has an 'id' property as value
                    label: item.name, // Assuming item has a 'name' property as label
                  }))}
                  placeholder="Select Technologies"
                  value={value}
                  className="basic-multi-select w-80"
                  classNamePrefix="select"
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("selectTechnology");
                  }}
                />
              )}
            />
            {errors.selectTechnology?.type === "required" && (
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
              {...register("selectDevelpoer")}
              render={({ field: { onChange, value } }) => (
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  closeMenuOnSelect={false}
                  isMulti
                  name="colors"
                  options={GetProjectDevelpoerNameData?.map((item) => ({
                    value: item.id, // Assuming item has an 'id' property as value
                    label: item.name, // Assuming item has a 'name' property as label
                  }))}
                  placeholder="Select Develpoer"
                  value={value}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("selectDevelpoer");
                  }}
                />
              )}
            />

            {errors.selectDevelpoer?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
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

        <Grid container mb={2}>
          {/* <Grid item xs={12} sm={12} lg={12}>
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
          </Grid> */}
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
              marginLeft: "0px !important",
            }}
          >
            close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editProject === true ? "Add project" : "Edit project"}
          </Button>
        </div>
      </form>
      <CommonModal isOpen={isModalOpen} onClose={closeModal}>
        <CommonSelectModel
          heading="Create Technology"
          inputLabel="Add Technology"
          buttonName="Create Technologies"
          closeModal={closeModal}
          postRequestApi={PostTechnologiesListMutateAsync}
          message="Technologies created successful!!"
          errorMessage="Technologies created failed !!"
          refetch={GetProjectTechnologiesListRefetch}
        />
      </CommonModal>
    </div>
  );
};

export default AddProject;
