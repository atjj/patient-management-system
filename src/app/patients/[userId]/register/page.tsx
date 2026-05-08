import { RegisterForm } from "@/components/forms";
import { getUser } from "@/lib/actions/patient.actions";

import Image from "next/image";
import Link from "next/link";

export default async function Registration({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex min-h-screen max-h-screen">
      <section className="no-scrollbar container my-auto">
        <div className="max-w-[860px] my-5 mx-4 xl:mx-10">
          <Link href={"/"}>
            <Image
              src="/assets/Logo.svg"
              height={1000}
              width={1000}
              alt={"care pulse logo"}
              className="w-fit h-10 mb-12"
            />
          </Link>
          <RegisterForm userId={user?.$id as string} />
          <p className="mt-15 text-[#76828D]">@carepulse copyright</p>
        </div>
      </section>
      <Image
        src="/assets/register-img.png"
        alt={"register"}
        height={1000}
        width={1000}
        className="max-w-[390px] hidden xl:block"
      />
    </div>
  );
}
