/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import TextInput from "../../reusable/TextInput/TextInput";
import Textarea from "../../reusable/TextArea/TextArea";
import SubmitButton from "../../reusable/SubmitButton/SubmitButton";
import { useAddBusinessMutation } from "../../../redux/Features/BusinessList/businessListApi";

export type TFormValues = {
  businessName: string;
  businessType: string;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  location: string;
  file: FileList;
};

const AddBusinessListForm = () => {
  const user = useSelector(useCurrentUser) as any;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormValues>();

  const [addBusiness, { isLoading }] = useAddBusinessMutation();
  const handleAddBusiness = async (data: TFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "file" && value instanceof FileList && value.length > 0) {
          formData.append("file", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      // Creator ID
      formData.append("createdBy", user?._id);

      const response = await addBusiness(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Business added successfully");
        window.location.reload();
      }
      reset();
    } catch (error) {
      const errMsg =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as any).data?.message === "string"
          ? (error as any).data.message
          : "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    <form
  onSubmit={handleSubmit(handleAddBusiness)}
  className="bg-white rounded-lg shadow p-6 space-y-6"
>
  <h2 className="text-xl font-semibold text-gray-900 ">
    Add New Business
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <TextInput
      label="Business Name"
      placeholder="Enter business name"
      {...register("businessName", { required: "Business name is required" })}
      error={errors.businessName}
    />

    <TextInput
      label="Business Type"
      placeholder="e.g. Restaurant, Temple, Shop"
      {...register("businessType", { required: "Business type is required" })}
      error={errors.businessType}
    />
  </div>

  <Textarea
    label="Description"
    placeholder="Write business description..."
    rows={5}
    {...register("description", { required: "Description is required" })}
    error={errors.description}
  />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <TextInput
      label="Phone Number"
      placeholder="Enter phone number"
      {...register("phoneNumber", {
        required: "Phone number is required",
      })}
      error={errors.phoneNumber}
    />

    <TextInput
      label="Location"
      placeholder="Full address or area"
      {...register("location", { required: "Location is required" })}
      error={errors.location}
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <TextInput
      label="Email (Optional)"
      type="email"
      placeholder="Enter email"
      {...register("email")}
      error={errors.email}
    />

    <TextInput
      label="Website (Optional)"
      placeholder="https://example.com"
      {...register("website")}
      error={errors.website}
    />
  </div>

  <TextInput
    label="Business Image"
    type="file"
    {...register("file", { required: "Business image is required" })}
    error={errors.file as any}
  />

  <div className="flex justify-end">
    <SubmitButton isLoading={isLoading} />
  </div>
</form>
  );
};

export default AddBusinessListForm;
