import { PatientForm } from "@/components/forms";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen max-h-screen">
      <section className="no-scrollbar container my-auto">
        <div className="max-w-[496px] mx-auto">
          <Image
            src="/assets/Logo.svg"
            height={1000}
            width={1000}
            alt={"care pulse logo"}
            className="w-fit h-10 mb-12"
          />
          <PatientForm />
          <div className="flex justify-between text-[#76828D] mt-1">
            <p>@carepulse copyright</p>
            <Link href={"/admin"} className="text-green-600">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/Illustration.png"
        alt={"image"}
        height={1000}
        width={1000}
        className="max-w-[50%]"
      />
    </div>
  );
}
