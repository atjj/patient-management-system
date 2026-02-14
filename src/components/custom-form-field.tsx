"use client";

import { Control, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./forms";
import Image from "next/image";
interface CustomProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  childern?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({
  field,
  fieldState,
  props,
}: {
  field: any;
  fieldState: any;
  props: CustomProps;
}) => {
  const { fieldType, icon, iconAlt, placeholder, id } = props;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center p-1 rounded-md border-1 border-[#363A3D] bg-[#1A1D21]">
          {icon && (
            <Image
              src={icon}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <Input
            {...field}
            id={`${id}-title`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            className="border-none dark:bg-inherit rounded-none px-2  shadow-none outline-none focus-visible:border-none focus-visible:ring-0"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          aria-invalid={fieldState.invalid}
          defaultCountry="US"
          placeholder={placeholder}
          international
          value={field.value}
          onChange={field.onChange}
        />
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { name, control, label, fieldType, id } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FieldLabel htmlFor={`${id}-title`} className="text-[#ABB8C4]">
              {label}
            </FieldLabel>
          )}
          <RenderField field={field} fieldState={fieldState} props={props} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CustomFormField;
