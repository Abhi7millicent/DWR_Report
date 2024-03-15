// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Button,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";

// import { Toaster } from "react-hot-toast";
// import { MaterialReactTable } from "material-react-table";
// import { useState } from "react";
// import AddLead from "./AddLead";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import InputField from "../InputField/InputField";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// interface empData {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   // lastName: string;
//   // date: string;
//   // reporting: string;
//   // role: string;
//   // loginId: string;
//   gender: string;
//   yearOfPassing: string;
//   task: string;
//   phone_number: string;
// }
// type FormData = {
//   firstName: string;
//   lastName: string;
//   role: string;
//   contact: string;
//   email: string;
//   eduction: string;
//   yearOfPassing: string;
//   currentCTC: string;
//   expectedCTC: string;
//   experience: string;
//   noticePeriod: string;
//   currentLocation: string;
//   hobbies: string;
//   reference: string;
//   eductionDeatils: {
//     eductionName: string;
//     yearOfPassing: string;
//   }[];
//   experienceDeatils: {
//     orgName: string;
//     role: string;
//     startTime: string;
//     endTime: string;
//     yearOfExperience: string;
//     jobDescription: string;
//   }[];
// };
function LeadTable() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [employeeData, setEmployeeData] = useState<empData[]>([]);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  // const {
  //   formState: { errors },
  //   control,
  //   clearErrors,
  //   register,
  //   handleSubmit,
  //   reset,
  // } = useForm<FormData>({
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //     // role: "",
  //     contact: "",
  //     email: "",
  //     eduction: "",
  //     yearOfPassing: "",
  //     currentCTC: "",
  //     expectedCTC: "",
  //     experience: "",
  //     noticePeriod: "",
  //     currentLocation: "",
  //     hobbies: "",
  //     reference: "",
  //     eductionDeatils: [{ eductionName: "", yearOfPassing: "" }],
  //     experienceDeatils: [
  //       {
  //         orgName: "",
  //         role: "",
  //         startTime: "",
  //         endTime: "",
  //         yearOfExperience: "",
  //         jobDescription: "",
  //       },
  //     ],
  //   },
  // });
  // const [expanded, setExpanded] = useState<string | false>(false);
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "experienceDeatils",
  // });
  // const handleLeadSubmit = (data: any) => {
  //   console.log(data);
  //   reset();
  // };

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  // const taskColumns = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     size: 15,
  //   },
  //   {
  //     accessorKey: "first_name",
  //     header: "Name",
  //     size: 15,
  //   },
  //   {
  //     accessorKey: "phone_number",
  //     header: "Phone Number",
  //     size: 15,
  //   },
  //   {
  //     accessorKey: "email",
  //     header: "Email",
  //     size: 25,
  //   },
  //   {
  //     accessorKey: "gender",
  //     header: "Gender",
  //     size: 15,
  //   },
  //   {
  //     accessorKey: "yearOfPassing",
  //     header: "Year Of Passing",
  //     size: 15,
  //   },
  //   {
  //     accessorKey: "task",
  //     header: "Task",
  //     size: 15,
  //   },
  // ];

  // const mappedData = data.map((item) => ({
  //   id: item.id,
  //   first_name: item.first_name,
  //   phone_number: item.phone_number,
  //   email: item.email,
  //   gender: item.gender,
  //   yearOfPassing: item.yearOfPassing,
  //   task: item.task,
  // }));

  return (
    <></>
    // <div className="mt-4 mb-4 h-[calc(100vh-5rem)]">
    //   <div className="flex items-center justify-center">
    //     <div className="bg-white p-8 shadow-md rounded-md w-full mb-4 ">
    //       <div className="flex justify-between">
    //         <h2 className="text-2xl font-semibold mb-4 px-4">Lead List</h2>
    //         <div>
    //           <a onClick={openModal} className="px-4">
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               sx={{
    //                 "&.MuiButton-root": {
    //                   margin: "0px !important",
    //                 },
    //               }}
    //             >
    //               Add Lead
    //             </Button>
    //           </a>
    //         </div>
    //       </div>
    //       <div className="p-4 ">
    //         <div>
    //           <MaterialReactTable
    //             columns={taskColumns}
    //             data={mappedData}
    //             renderDetailPanel={({ row }) => (
    //               <div style={{ display: "grid" }}>
    //                 <form onSubmit={handleSubmit(handleLeadSubmit)}>
    //                   <Accordion
    //                     expanded={expanded === "panel1"}
    //                     onChange={handleChange("panel1")}
    //                   >
    //                     <AccordionSummary
    //                       expandIcon={<ExpandMoreIcon />}
    //                       aria-controls="edit-details-content"
    //                       id="edit-details-header"
    //                     >
    //                       <Typography>Eduction Deatils</Typography>
    //                     </AccordionSummary>
    //                     <AccordionDetails
    //                       style={{
    //                         maxHeight: "130px",
    //                         overflowY: "auto",
    //                         marginRight: "10px",
    //                       }}
    //                     >
    //                       {fields.map((item, index) => (
    //                         <Grid
    //                           container
    //                           spacing={2}
    //                           key={item?.id}
    //                           className="mb-2"
    //                         >
    //                           <Grid item xs={12} sm={4}>
    //                             <Box sx={{ minWidth: 180 }}>
    //                               <Controller
    //                                 control={control}
    //                                 rules={{
    //                                   required: false,
    //                                 }}
    //                                 {...register(
    //                                   `eductionDeatils.${index}.eductionName`
    //                                 )}
    //                                 render={({
    //                                   field: { onChange, value },
    //                                 }) => (
    //                                   <FormControl
    //                                     fullWidth
    //                                     sx={{
    //                                       "& .MuiInputLabel-root": {
    //                                         color:
    //                                           "var(--primary-color) !important",
    //                                         fontFamily:
    //                                           "var(--font-family) !important",
    //                                       },
    //                                       "& .MuiOutlinedInput-root": {
    //                                         "& fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                           color:
    //                                             "var(--primary-color) !important",
    //                                           fontFamily:
    //                                             "var(--font-family) !important",
    //                                         },
    //                                         "&:hover fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                         },
    //                                         "&.Mui-focused fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                           fontFamily:
    //                                             "var(--font-family) !important",
    //                                         },
    //                                       },
    //                                     }}
    //                                   >
    //                                     <InputLabel id="eduction">
    //                                       Select Eduction
    //                                     </InputLabel>
    //                                     <Select
    //                                       labelId="eduction"
    //                                       id="eduction"
    //                                       value={value}
    //                                       label="Select Eduction"
    //                                       onChange={(e) => {
    //                                         onChange(e);
    //                                         clearErrors("eduction");
    //                                       }}
    //                                     >
    //                                       <MenuItem value="bsc">BSC</MenuItem>
    //                                       <MenuItem value="MSC">MSC </MenuItem>
    //                                       <MenuItem value="BCom">BCom</MenuItem>
    //                                     </Select>
    //                                   </FormControl>
    //                                 )}
    //                               />
    //                               {errors?.eductionDeatils?.[index]
    //                                 ?.eductionName?.type === "required" && (
    //                                 <p className="alert">
    //                                   This field is required
    //                                 </p>
    //                               )}
    //                             </Box>
    //                           </Grid>
    //                           <Grid item xs={12} sm={4}>
    //                             <Box sx={{ minWidth: 180 }}>
    //                               <Controller
    //                                 control={control}
    //                                 rules={{
    //                                   required: false,
    //                                 }}
    //                                 {...register(
    //                                   `eductionDeatils.${index}.yearOfPassing` as const
    //                                 )}
    //                                 render={({
    //                                   field: { onChange, value },
    //                                 }) => (
    //                                   <FormControl
    //                                     fullWidth
    //                                     sx={{
    //                                       "& .MuiInputLabel-root": {
    //                                         color:
    //                                           "var(--primary-color) !important",
    //                                         fontFamily:
    //                                           "var(--font-family) !important",
    //                                       },
    //                                       "& .MuiOutlinedInput-root": {
    //                                         "& fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                           color:
    //                                             "var(--primary-color) !important",
    //                                           fontFamily:
    //                                             "var(--font-family) !important",
    //                                         },
    //                                         "&:hover fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                         },
    //                                         "&.Mui-focused fieldset": {
    //                                           borderColor:
    //                                             "var(--primary-color) !important",
    //                                           fontFamily:
    //                                             "var(--font-family) !important",
    //                                         },
    //                                       },
    //                                     }}
    //                                   >
    //                                     <InputLabel id="yearOfPassing">
    //                                       Select Passing year
    //                                     </InputLabel>
    //                                     <Select
    //                                       labelId="yearOfPassing"
    //                                       id="yearOfPassing"
    //                                       value={value}
    //                                       label=" Select Passing year"
    //                                       onChange={(e) => {
    //                                         onChange(e);
    //                                         clearErrors("yearOfPassing");
    //                                       }}
    //                                     >
    //                                       <MenuItem value="202423">
    //                                         2024-23
    //                                       </MenuItem>
    //                                       <MenuItem value="202322">
    //                                         2023-22{" "}
    //                                       </MenuItem>
    //                                       <MenuItem value="202221">
    //                                         2022-21
    //                                       </MenuItem>
    //                                     </Select>
    //                                   </FormControl>
    //                                 )}
    //                               />
    //                               {errors?.eductionDeatils?.[index]
    //                                 ?.yearOfPassing?.type === "required" && (
    //                                 <p className="alert">
    //                                   This field is required
    //                                 </p>
    //                               )}
    //                             </Box>
    //                           </Grid>
    //                           <Grid item xs={12} sm={4} className="flex gap-3">
    //                             <button
    //                               type="button"
    //                               style={{
    //                                 width: "25px",
    //                                 height: "25px",
    //                                 backgroundColor: "var(--primary-color)",
    //                                 color: "white",
    //                                 borderRadius: "4px",
    //                                 marginTop: "15px",
    //                                 opacity: fields?.length === 1 ? "0.5" : "",
    //                               }}
    //                               onClick={() => {
    //                                 if (fields?.length !== 1) {
    //                                   remove(index);
    //                                 }
    //                               }}
    //                             >
    //                               -
    //                             </button>
    //                             <button
    //                               type="button"
    //                               style={{
    //                                 width: "25px",
    //                                 height: "25px",
    //                                 backgroundColor: "var(--primary-color)",
    //                                 color: "white",
    //                                 borderRadius: "4px",
    //                                 marginTop: "15px",
    //                               }}
    //                               onClick={() =>
    //                                 append({
    //                                   eductionName: "",
    //                                   yearOfPassing: "",
    //                                 })
    //                               }
    //                             >
    //                               +
    //                             </button>
    //                           </Grid>
    //                         </Grid>
    //                       ))}
    //                     </AccordionDetails>
    //                     <div className="flex justify-end">
    //                       {/* <Button
    //                 onClick={onClose}
    //                 variant="contained"
    //                 sx={{ backgroundColor: "#8a878f !important" }}
    //               >
    //                 close
    //               </Button> */}
    //                       <Button
    //                         variant="contained"
    //                         color="primary"
    //                         type="submit"
    //                         sx={{ marginRight: "12px !important" }}
    //                       >
    //                         Edit Eduction
    //                       </Button>
    //                     </div>
    //                   </Accordion>
    //                   <Accordion
    //                     expanded={expanded === "panel2"}
    //                     onChange={handleChange("panel2")}
    //                     sx={{ marginTop: "10px" }}
    //                   >
    //                     <AccordionSummary
    //                       expandIcon={<ExpandMoreIcon />}
    //                       aria-controls="edit-details-content"
    //                       id="edit-details-header"
    //                     >
    //                       <Typography> Job Experience Deatils</Typography>
    //                     </AccordionSummary>
    //                     <AccordionDetails
    //                       style={{
    //                         maxHeight: "230px",
    //                         overflowY: "auto",
    //                         marginRight: "10px",
    //                       }}
    //                     >
    //                       {fields.map((item, index) => (
    //                         <Grid key={index}>
    //                           {/* //Row1 */}
    //                           <Grid container spacing={2} className="mb-3">
    //                             <Grid item xs={12} sm={4}>
    //                               <div className="flex flex-col w-max gap-3">
    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.orgName` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="text"
    //                                         label="Organization Name"
    //                                         placeholder="Organization Name"
    //                                         name="organizationName"
    //                                         aria-invalid={
    //                                           errors.expectedCTC
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.orgName`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]
    //                                     ?.orgName?.type === "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>

    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.startTime` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="date"
    //                                         label=""
    //                                         placeholder="Start Time"
    //                                         name="startTime"
    //                                         aria-invalid={
    //                                           errors?.experienceDeatils?.[index]
    //                                             ?.startTime
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.startTime`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]
    //                                     ?.startTime?.type === "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>
    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.yearOfExperience` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="text"
    //                                         label="Year Of Experience"
    //                                         placeholder="Year Of Experience"
    //                                         name="yearOfExperience"
    //                                         aria-invalid={
    //                                           errors?.experienceDeatils?.[index]
    //                                             ?.yearOfExperience
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.yearOfExperience`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]
    //                                     ?.yearOfExperience?.type ===
    //                                     "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>
    //                               </div>
    //                             </Grid>
    //                             <Grid item xs={12} sm={4}>
    //                               <div className="flex flex-col w-max gap-3">
    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.role` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="text"
    //                                         label="Role"
    //                                         placeholder="Role"
    //                                         name="role"
    //                                         aria-invalid={
    //                                           errors?.experienceDeatils?.[index]
    //                                             ?.role
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.role`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]?.role
    //                                     ?.type === "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>

    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.endTime` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="date"
    //                                         label=""
    //                                         placeholder="End Time"
    //                                         name="endTime"
    //                                         aria-invalid={
    //                                           errors.experienceDeatils?.[index]
    //                                             ?.endTime
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.endTime`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]
    //                                     ?.endTime?.type === "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>
    //                                 <Grid item>
    //                                   <Controller
    //                                     control={control}
    //                                     rules={{
    //                                       required: false,
    //                                     }}
    //                                     {...register(
    //                                       `experienceDeatils.${index}.jobDescription` as const
    //                                     )}
    //                                     render={({
    //                                       field: { onChange, value },
    //                                     }) => (
    //                                       <InputField
    //                                         value={value}
    //                                         type="text"
    //                                         label="Job Description"
    //                                         placeholder="Job Description"
    //                                         name="jobDescription"
    //                                         aria-invalid={
    //                                           errors.expectedCTC
    //                                             ? "true"
    //                                             : "false"
    //                                         }
    //                                         onChange={(e) => {
    //                                           onChange(e);
    //                                           clearErrors(
    //                                             `experienceDeatils.${index}.jobDescription`
    //                                           );
    //                                         }}
    //                                       />
    //                                     )}
    //                                   />
    //                                   {errors?.experienceDeatils?.[index]
    //                                     ?.jobDescription?.type ===
    //                                     "required" && (
    //                                     <p className="alert">
    //                                       This field is required
    //                                     </p>
    //                                   )}
    //                                 </Grid>
    //                               </div>
    //                             </Grid>

    //                             <Grid
    //                               item
    //                               xs={12}
    //                               sm={4}
    //                               className="flex items-center"
    //                             >
    //                               <div className="flex gap-3 w-max">
    //                                 <Grid item xs={12} sm={4}>
    //                                   <button
    //                                     type="button"
    //                                     style={{
    //                                       width: "25px",
    //                                       height: "25px",
    //                                       backgroundColor:
    //                                         "var(--primary-color)",
    //                                       color: "white",
    //                                       borderRadius: "4px",
    //                                       // marginTop: "15px",
    //                                       opacity:
    //                                         fields?.length === 1 ? "0.5" : "",
    //                                     }}
    //                                     onClick={() => {
    //                                       if (fields?.length !== 1) {
    //                                         remove(index);
    //                                       }
    //                                     }}
    //                                   >
    //                                     -
    //                                   </button>
    //                                 </Grid>
    //                                 <Grid item xs={12} sm={4}>
    //                                   <button
    //                                     type="button"
    //                                     style={{
    //                                       width: "25px",
    //                                       height: "25px",
    //                                       backgroundColor:
    //                                         "var(--primary-color)",
    //                                       color: "white",
    //                                       borderRadius: "4px",
    //                                     }}
    //                                     onClick={() =>
    //                                       append({
    //                                         orgName: "",
    //                                         role: "",
    //                                         startTime: "",
    //                                         endTime: "",
    //                                         yearOfExperience: "",
    //                                         jobDescription: "",
    //                                       })
    //                                     }
    //                                   >
    //                                     +
    //                                   </button>
    //                                 </Grid>
    //                               </div>
    //                             </Grid>
    //                           </Grid>
    //                         </Grid>
    //                       ))}
    //                     </AccordionDetails>
    //                     <div className="flex justify-end">
    //                       <Button
    //                         variant="contained"
    //                         color="primary"
    //                         type="submit"
    //                         sx={{ marginRight: "12px !important" }}
    //                       >
    //                         Edit Experience
    //                       </Button>
    //                     </div>
    //                   </Accordion>
    //                 </form>
    //                 {/* Add more details as needed */}
    //               </div>
    //             )}
    //             enableDensityToggle={false}
    //             enableColumnActions={false}
    //           />
    //         </div>
    //       </div>
    //       <div className="w-fit">
    //         <Toaster reverseOrder={false} />
    //         <AddLead isOpen={isModalOpen} onClose={closeModal} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LeadTable;
// var data: empData[] = [
//   {
//     id: 1,
//     first_name: "Kerk",
//     last_name: "Cafe",
//     phone_number: "45678909876",
//     email: "kcafe0@myspace.com",
//     gender: "Male",
//     yearOfPassing: "2023-22",
//     task: "+",
//   },
//   {
//     id: 2,
//     first_name: "Mikol",
//     last_name: "Vallens",
//     phone_number: "9123459876",
//     email: "mvallens1@hhs.gov",
//     gender: "Male",
//     yearOfPassing: "2023-22",
//     task: "+",
//   },
//   {
//     id: 3,
//     first_name: "Henrieta",
//     last_name: "Dies",
//     phone_number: "87658909876",
//     email: "hdies2@cocolog-nifty.com",
//     gender: "Female",
//     yearOfPassing: "2021-22",
//     task: "+",
//   },
//   {
//     id: 4,
//     first_name: "Charyl",
//     last_name: "Wallbridge",
//     phone_number: "98765909876",
//     email: "cwallbridge3@bandcamp.com",
//     gender: "Female",
//     yearOfPassing: "2012-15",
//     task: "+",
//   },
//   // {
//   //   id: 5;
//   //   first_name: "Gratiana";
//   //   last_name: "Guiot";
//   //   email: "gguiot4@diigo.com";
//   //   gender: "Genderfluid";
//   // },
//   // {
//   //   id: 6;
//   //   first_name: "Diego";
//   //   last_name: "Clougher";
//   //   email: "dclougher5@shinystat.com";
//   //   gender: "Male";
//   // },
//   // {
//   //   id: 7;
//   //   first_name: "Prentiss";
//   //   last_name: "Ringsell";
//   //   email: "pringsell6@freewebs.com";
//   //   gender: "Male";
//   // },
//   // {
//   //   id: 8;
//   //   first_name: "Deirdre";
//   //   last_name: "Rigler";
//   //   email: "drigler7@printfriendly.com";
//   //   gender: "Female";
//   // },
//   // {
//   //   id: 9;
//   //   first_name: "Aube";
//   //   last_name: "Haug";
//   //   email: "ahaug8@examiner.com";
//   //   gender: "Male";
//   // },
//   // {
//   //   id: 10;
//   //   first_name: "Brana";
//   //   last_name: "Phythian";
//   //   email: "bphythian9@hostgator.com";
//   //   gender: "Female";
//   // }
// ];
