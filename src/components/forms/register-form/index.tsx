"use client";

import CustomFormField from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";
import { FormFieldType } from "../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { doctors, genderOptions, identificationTypes } from "@/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "@/components/file-uploader";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";

export function RegisterForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation) as unknown as Resolver<
      z.infer<typeof PatientFormValidation>
    >,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(),
      gender: "female" as Gender,
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      identificationDocument: undefined,
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    console.dir(values);
    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      const patient = await registerPatient(patientData);
      if (patient) router.push(`/patients/${userId}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mb-10">
        <section>
          <h1 className="text-[36px] font-bold">Hi there...</h1>
          <p className="text-[18px] font-medium text-[#ABB8C4]">Welcome 👋</p>
        </section>

        <section>
          <h2 className="text-[30px] font-bold">Personal Information</h2>
        </section>
        <CustomFormField
          id="register-form"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          icon="/assets/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email address"
            placeholder="example@gmail.com"
            icon="/assets/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone number"
            placeholder="+996 111 111 111"
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            placeholder="Select your birthdate"
            label="Date of birth"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FieldGroup>
                <RadioGroup
                  className="flex items-center h-11 justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div
                      className="flex items-center hover:bg-[#1A1D21] text-[#CDCECF] gap-[8px] border border-[#363A3D] border-dashed px-3 lg:px-7 h-full rounded-[5px]"
                      key={option}
                    >
                      <RadioGroupItem
                        className="cursor-pointer"
                        value={option}
                        id={option}
                      />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FieldGroup>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="ex: 14 street, New York, NY - 5101"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian`s name"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Phone number"
            placeholder="ex: +1 (868) 579-9831"
          />
        </div>
        <section>
          <h2 className="text-[30px] font-bold">Medical Information</h2>
        </section>
        <CustomFormField
          id="register-form"
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {doctors.map((doctor) => (
            <SelectItem
              className="cursor-pointer"
              key={doctor.name}
              value={doctor.name}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="ex: BlueCross"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ex: ABC1234567"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="ex: Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current medications"
            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family medical history (if relevant)"
            placeholder="ex: Mother had breast cancer"
          />
          <CustomFormField
            id="register-form"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="ex: Asthma diagnosis in childhood"
          />
        </div>
        <section>
          <h2 className="text-[30px] font-bold">
            Identification and Verfication
          </h2>
        </section>
        <CustomFormField
          id="register-form"
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
        >
          {identificationTypes.map((type) => (
            <SelectItem className="bg-[#1A1D21]" key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          id="register-form"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="ex 1234567"
        />

        <CustomFormField
          id="register-form"
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FieldGroup>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FieldGroup>
          )}
        />
        <section>
          <h2 className="text-[30px] font-bold">Consent and Privacy</h2>
        </section>

        <CustomFormField
          id="register-form"
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />
        <CustomFormField
          id="register-form"
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health information for treatment purposes."
        />
        <CustomFormField
          id="register-form"
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the privacy policy"
        />
      </FieldGroup>

      <SubmitButton
        isLoading={isLoading}
        form="register-form"
        className="w-full bg-[#24AE7C] hover:bg-[#24AE7C] text-[#FFFFFF] cursor-pointer font-semibold p-3 h-11"
      >
        Submit and continue
      </SubmitButton>
    </form>
  );
}
