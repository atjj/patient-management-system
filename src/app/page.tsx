import { PatientForm } from "@/components/forms";
import PasskeyModal from "@/components/passkey-modal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const isAdmin = (await searchParams).admin === "true";

  return (
    <div className="flex justify-center min-h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="no-scrollbar container mx-4 my-auto">
        <div className="max-w-[496px] mx-auto my-5">
          <Image
            src="/assets/Logo.svg"
            height={1000}
            width={1000}
            alt={"care pulse logo"}
            className="w-fit h-10 mb-12"
          />
          <PatientForm />
          <div className="flex justify-between text-[#76828D] mt-10">
            <p>@carepulse copyright</p>
            <Link href={"/?admin=true"} className="text-green-600">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
