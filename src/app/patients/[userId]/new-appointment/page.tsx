import { AppointmentForm } from "@/components/forms";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function NewAppointment({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const patient = await getPatient(userId);

  return (
    <div className="flex min-h-screen max-h-screen">
      <section className="no-scrollbar container my-auto">
        <div className="max-w-[860px] mx-auto ">
          <Image
            src="/assets/Logo.svg"
            height={1000}
            width={1000}
            alt={"care pulse logo"}
            className="w-fit h-10 mb-12"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id as string}
          />
          <p className="mt-15 text-[#76828D]">@carepulse copyright</p>
        </div>
      </section>
      <Image
        src="/assets/appointment-img.png"
        alt={"appointment"}
        height={1000}
        width={1000}
        className="max-w-[390px] hidden xl:block"
      />
    </div>
  );
}
