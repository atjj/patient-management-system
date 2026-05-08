import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ userId: string }>;
type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function SuccessPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const userId = params.userId;
  const searchParams = await props.searchParams;
  const appointmentId = searchParams.appointmentId;
  const appointment = await getAppointment(appointmentId as string);
  return (
    <div className="min-h-screen px-[5%] flex flex-col items-center">
      <div className="flex items-center justify-center mt-5">
        <Link href="/">
          <Image
            src="/assets/Logo.svg"
            height={1000}
            width={1000}
            alt="care pulse logo"
            className="w-fit h-10"
          />
        </Link>
      </div>

      <section className="flex flex-col items-center gap-[10px] mt-[100px]">
        <Image
          src="/assets/success.svg"
          height={200}
          width={200}
          alt="success"
          className="w-[100px] h-[100px]"
        />
        <h2 className="text-[26px] md:text-[36px] max-w-[600px] text-center font-bold">
          Your <span className="text-[#4AC97E]">appointment request</span> has
          been successfully submitted!
        </h2>
        <p className="mt-[14px] md:text-lg text-center font-medium text-[#ABB8C4]">
          We&apos;ll be in touch shortly to confirm.
        </p>
      </section>

      <section className="flex flex-col lg:flex-row items-center gap-5 lg:gap-8 mx-auto max-w-[944px] border-y border-[#363A3D99] md:px-[69px] py-[22px] lg:py-[44px] mt-[44px] ">
        <p className="text-[#ABB8C4] text-[16px] md:text-[24px] font-medium">
          Requested appointment details:
        </p>
        <div className="flex items-center gap-3 font-semibold">
          <Image
            src="/assets/Avatar.png"
            height={100}
            width={100}
            alt="doctor"
            className="size-6"
          />
          <p className="whitespace-nowrap">
            {appointment?.rows[0].primaryPhysician}
          </p>
        </div>
        <div className="flex items-center gap-2 text-md md:text-lg text-[#ABB8C4] font-medium">
          <Image
            src="/assets/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
          />
          <p>{formatDate(appointment?.rows[0].schedule)}</p>
        </div>
      </section>
      <Button
        className="mt-10 text-md dark:hover:bg-[#24AE7C] mb-10  text-[#FFFFFF]"
        variant="outline"
        asChild
      >
        <Link href={`/patients/${userId}/new-appointment`}>
          New appointment
        </Link>
      </Button>
    </div>
  );
}
