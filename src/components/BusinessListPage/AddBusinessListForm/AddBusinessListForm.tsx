/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import TextInput from "../../reusable/TextInput/TextInput";
import Textarea from "../../reusable/TextArea/TextArea";
import SubmitButton from "../../reusable/SubmitButton/SubmitButton";
import { useAddBusinessMutation } from "../../../redux/Features/BusinessList/businessListApi";
import SelectDropdown from "../../reusable/SelectDropdown/SelectDropdown";

export type TFormValues = {
  businessName: string;
  businessType: string;
  customBusinessType?: string;
  businessStage: string;
  askingValuation: string;
  pitchDeckType: string;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  location: string;
  file: FileList;
};

const businessTypeOptions = [
  "AI / SaaS",
  "Fintech",
  "Real Estate",
  "E-commerce",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Logistics",
  "Others",
];

const businessStageOptions = [
  "New Idea",
  "Startup",
  "Seed",
  "MVP",
  "Operational",
  "Scaling",
];

const AddBusinessListForm = () => {
  const user = useSelector(useCurrentUser) as any;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TFormValues>();

  const [addBusiness, { isLoading }] = useAddBusinessMutation();

  const selectedType = watch("businessType");

  const handleAddBusiness = async (data: TFormValues) => {
    try {
      // Normalize business type
      const finalBusinessType =
        data.businessType === "Others"
          ? data.customBusinessType
          : data.businessType;

      const formData = new FormData();

      Object.entries({
        ...data,
        businessType: finalBusinessType,
      }).forEach(([key, value]) => {
        if (key === "file" && value instanceof FileList && value.length > 0) {
          formData.append("file", value[0]);
        } else if (key !== "customBusinessType") {
          formData.append(key, value as string);
        }
      });

      formData.append("createdBy", user?._id);

      const response = await addBusiness(formData).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Business added successfully");
        reset();
      }
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
      <h2 className="text-xl font-semibold text-gray-900">
        Add New Business
      </h2>

      {/* Business Name */}
      <TextInput
        label="Business Name"
        placeholder="Enter business name"
        {...register("businessName", {
          required: "Business name is required",
        })}
        error={errors.businessName}
      />

      {/* Type & Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectDropdown
          label="Business Type"
          options={businessTypeOptions}
          {...register("businessType", {
            required: "Business type is required",
            onChange: () => {
              // Clear custom type when switching away
              setValue("customBusinessType", "");
            },
          })}
          error={errors.businessType}
        />

        <SelectDropdown
          label="Business Stage"
          options={businessStageOptions}
          {...register("businessStage", {
            required: "Business stage is required",
          })}
          error={errors.businessStage}
        />
      </div>

      {/* Custom Type (Only if Others) */}
      {selectedType === "Others" && (
        <TextInput
          label="Custom Business Type"
          placeholder="Enter your business type"
          {...register("customBusinessType", {
            required: "Please specify business type",
          })}
          error={errors.customBusinessType}
        />
      )}

      {/* Valuation & Pitch Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Asking Valuation"
          type="number"
          placeholder="e.g. 500000"
          {...register("askingValuation", {
            required: "Asking valuation is required",
          })}
          error={errors.askingValuation}
        />

        <SelectDropdown
          label="Pitch Deck Type"
          options={["Image", "Pitch Deck"]}
          {...register("pitchDeckType", {
            required: "Pitch deck type is required",
          })}
          error={errors.pitchDeckType}
        />
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Write business description..."
        rows={5}
        {...register("description", {
          required: "Description is required",
        })}
        error={errors.description}
      />

      {/* Contact Info */}
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
          {...register("location", {
            required: "Location is required",
          })}
          error={errors.location}
          isRequired={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Email (Optional)"
          type="email"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email}
          isRequired={false}
        />

        <TextInput
          label="Website (Optional)"
          placeholder="https://example.com"
          {...register("website")}
          error={errors.website}
          isRequired={false}
        />
      </div>

      {/* Image */}
      <TextInput
        label="Business Image"
        type="file"
        {...register("file", {
          required: "Business image is required",
        })}
        error={errors.file as any}
      />

      <div className="flex justify-end">
        <SubmitButton isLoading={isLoading} />
      </div>
    </form>
  );
};

export default AddBusinessListForm;