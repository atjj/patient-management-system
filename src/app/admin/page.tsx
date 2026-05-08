import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/stat-card";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="flex justify-between items-center py-[24px] px-[16px] md:px-[48px] bg-[#0D0F10] rounded-[20px]">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/Logo.svg"
            height={32}
            width={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p>Admin</p>
      </header>

      <main className="px-4">
        <section className="w-full space-y-4">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Welcome, Admin
          </h1>
          <p className="text-[#ABB8C4] font-medium">
            Start day with managing new appointments
          </p>
        </section>
        <section className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between items-center mt-[42px] mb-[62px]">
          <StatCard
            type="appointments"
            count={Number(appointments?.totalAppointments)}
            label="Scheduled appointments"
            icon={"/assets/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={Number(appointments?.pendingCounts)}
            label="Pending appointments"
            icon={"/assets/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={Number(appointments?.cancelledCounts)}
            label="Cancelled appointments"
            icon={"/assets/cancelled.svg"}
          />
        </section>
        <DataTable
          columns={columns}
          data={appointments?.appointmentsData ?? []}
        />
      </main>
    </div>
  );
};

export default AdminPage;
