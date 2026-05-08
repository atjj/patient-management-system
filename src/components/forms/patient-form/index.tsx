"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FieldGroup } from "@/components/ui/field";

import CustomFormField from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "../types";

export function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };
      const userId = await createUser(userData);

      if (userId) router.push(`/patients/${userId}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form id="patient-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mb-10">
        <section>
          <h1 className="text-[36px] font-bold">Hi there...</h1>
          <p className="text-[18px] font-medium text-[#ABB8C4]">
            Schedule your first appointments.
          </p>
        </section>
        <CustomFormField
          id="patient-form"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full name"
          placeholder="John Doe"
          icon="/assets/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          id="patient-form"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          placeholder="example@gmail.com"
          icon="/assets/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          id="patient-form"
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="+996 111 111 111"
        />
      </FieldGroup>

      <SubmitButton
        isLoading={isLoading}
        form="patient-form"
        className="w-full bg-[#24AE7C] hover:bg-[#24AE7C] text-[#FFFFFF] cursor-pointer font-semibold p-3 h-11"
      >
        Get started
      </SubmitButton>
    </form>
  );
}
