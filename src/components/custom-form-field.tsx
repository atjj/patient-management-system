"use client";

import { Control, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./forms/types";
import Image from "next/image";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
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
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  fieldState,
  props,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldState: any;
  props: CustomProps;
}) => {
  const {
    fieldType,
    icon,
    iconAlt,
    placeholder,
    id,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
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
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center p-1 h-11 rounded-md border-1 border-[#363A3D] bg-[#1A1D21]">
          <Image
            src="/assets/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <DatePicker
            selected={field.value}
            placeholderText={placeholder}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(date: any) => field.onChange(date)}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time:"
            className="border-none rounded-none px-2 outline-none focus-visible:border-none focus-visible:ring-0"
          />
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="dark:bg-[#1A1D21] dark:h-11 dark:hover:bg-[#1A1D21]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1D21]">
            {props.children}
          </SelectContent>
        </Select>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          disabled={props.disabled}
          className="dark:bg-[#1A1D21]"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="text-[#ABB8C4] text-lg">
            {props.label}
          </label>
        </div>
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
