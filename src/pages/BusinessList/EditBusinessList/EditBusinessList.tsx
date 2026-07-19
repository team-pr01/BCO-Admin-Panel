/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useGetSingleBusinessQuery,
  useUpdateBusinessMutation,
} from "../../../redux/Features/BusinessList/businessListApi";
import TextInput from "../../../components/reusable/TextInput/TextInput";
import SelectDropdown from "../../../components/reusable/SelectDropdown/SelectDropdown";
import Textarea from "../../../components/reusable/TextArea/TextArea";
import SubmitButton from "../../../components/reusable/SubmitButton/SubmitButton";

export type TFormValues = {
  businessName: string;
  businessType: string;
  customBusinessType?: string;
  businessStage: string;
  askingValuation: string;
  investorPercentage: string;
  currency: string;
  requiredFunding: string;
  pitchDeckType: string;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  location: string;
  file?: FileList;
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

const EditBusinessList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetSingleBusinessQuery(
    id as string,
  );
  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation();

  const businessInfo = data?.data || {};

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      businessName: "",
      businessType: "",
      customBusinessType: "",
      businessStage: "",
      askingValuation: "",
      investorPercentage: "",
      currency: "",
      requiredFunding: "",
      pitchDeckType: "",
      description: "",
      phoneNumber: "",
      email: "",
      website: "",
      location: "",
    },
  });

  const selectedType = watch("businessType");

  // Set default values when data is loaded
  useEffect(() => {
    if (businessInfo && Object.keys(businessInfo).length > 0) {
      reset({
        businessName: businessInfo?.businessName || "",
        businessType: businessInfo?.businessType || "",
        customBusinessType: businessInfo?.customBusinessType || "",
        businessStage: businessInfo?.businessStage || "",
        askingValuation: businessInfo?.askingValuation || "",
        investorPercentage: businessInfo?.investorPercentage || "",
        currency: businessInfo?.currency || "",
        requiredFunding: businessInfo?.requiredFunding || "",
        pitchDeckType: businessInfo?.pitchDeckType || "",
        description: businessInfo?.description || "",
        phoneNumber: businessInfo?.phoneNumber || "",
        email: businessInfo?.email || "",
        website: businessInfo?.website || "",
        location: businessInfo?.location || "",
      });
    }
  }, [businessInfo, reset]);

  const handleUpdateBusiness = async (data: TFormValues) => {
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
        } else if (key !== "customBusinessType" && key !== "file") {
          formData.append(key, value as string);
        }
      });

      const response = await updateBusiness({
        id: id as string,
        data: formData,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Business updated successfully");
        navigate("/dashboard/business-list");
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

  if (isFetching) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateBusiness)}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Edit Business</h2>
        <button
          type="button"
          onClick={() => navigate("/dashboard/business-list")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      {/* Business Name */}
      <TextInput
        label="Business Name"
        placeholder="Enter business name"
        {...register("businessName")}
        error={errors.businessName}
        isRequired={false}
      />

      {/* Type & Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectDropdown
          label="Business Type"
          options={businessTypeOptions}
          {...register("businessType", {
            onChange: () => {
              setValue("customBusinessType", "");
            },
          })}
          error={errors.businessType}
          value={watch("businessType")}
          isRequired={false}
        />

        <SelectDropdown
          label="Business Stage"
          options={businessStageOptions}
          {...register("businessStage")}
          error={errors.businessStage}
          value={watch("businessStage")}
          isRequired={false}
        />
      </div>

      {/* Custom Type (Only if Others) */}
      {selectedType === "Others" && (
        <TextInput
          label="Custom Business Type"
          placeholder="Enter your business type"
          {...register("customBusinessType")}
          error={errors.customBusinessType}
          isRequired={false}
        />
      )}

      {/* Valuation & Pitch Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Asking Valuation"
          type="number"
          placeholder="e.g. 500000"
          {...register("askingValuation")}
          error={errors.askingValuation}
          isRequired={false}
        />
        <TextInput
          label="Investor Percentage"
          placeholder="e.g. 50"
          {...register("investorPercentage")}
          error={errors.investorPercentage}
          isRequired={false}
        />
        <TextInput
          label="Currency"
          placeholder="e.g. USD"
          {...register("currency")}
          error={errors.currency}
          isRequired={false}
        />
        <TextInput
          label="Required Funding"
          placeholder="e.g. 2000"
          {...register("requiredFunding")}
          error={errors.requiredFunding}
          isRequired={false}
        />

        <SelectDropdown
          label="Pitch Deck Type"
          options={["Image", "Pitch Deck"]}
          {...register("pitchDeckType")}
          error={errors.pitchDeckType}
          value={watch("pitchDeckType")}
          isRequired={false}
        />
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Write business description..."
        rows={5}
        {...register("description")}
        error={errors.description}
        isRequired={false}
      />

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber}
          isRequired={false}
        />

        <TextInput
          label="Location"
          placeholder="Full address or area"
          {...register("location")}
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

      {/* Image Upload - Optional */}
      <TextInput
        label="Update Business Image (Optional)"
        type="file"
        {...register("file")}
        error={errors.file as any}
        isRequired={false}
      />

      {businessInfo?.imageUrl && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2">Current Image:</p>
          <img
            src={businessInfo?.imageUrl}
            alt={businessInfo?.businessName}
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/business-list")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <SubmitButton isLoading={isUpdating} />
      </div>
    </form>
  );
};

export default EditBusinessList;
