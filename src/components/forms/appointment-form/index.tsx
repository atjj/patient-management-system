"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FieldGroup } from "@/components/ui/field";

import CustomFormField from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import { AppointmentFormValidation } from "@/lib/validation";
import { FormFieldType } from "../types";
import Image from "next/image";
import { doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";

import { createAppointment } from "@/lib/actions/appointment.actions";
export function AppointmentForm({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation) as unknown as Resolver<
      z.infer<typeof AppointmentFormValidation>
    >,
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.notes,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        console.log(appointment);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment}`,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel appointment";
      break;
    case "create":
      buttonLabel = "Create appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule appointment";
      break;
    default:
      break;
  }

  return (
    <form id="appointment-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mb-10">
        <section>
          <h1 className="text-[36px] font-bold">New appointment</h1>
          <p className="text-[18px] font-medium text-[#ABB8C4]">
            Request a new appointment in 10 seconds
          </p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomFormField
              id="appointment-form"
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
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
            <CustomFormField
              id="appointment-form"
              showTimeSelect
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              placeholder="Select your appointment date"
              label="Expected appointment date"
              dateFormat="MM/dd/yyyy -h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                id="appointment-form"
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                placeholder="ex: Annual montly check-up"
                label="Reason for appointment"
              />
              <CustomFormField
                id="appointment-form"
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="notes"
                placeholder="ex: Prefer afternoon appointments, if possible"
                label="Additional comments/notes"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            id="appointment-form"
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            placeholder="Reason for cancellation"
            label="Enter reason for cancellation"
          />
        )}
      </FieldGroup>

      <SubmitButton
        isLoading={isLoading}
        form="appointment-form"
        className="w-full bg-[#24AE7C] hover:bg-[#24AE7C] text-[#FFFFFF] cursor-pointer font-semibold p-3 h-11"
      >
        {buttonLabel}
      </SubmitButton>
    </form>
  );
}
