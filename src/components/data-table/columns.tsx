"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Appointment } from "../../../types/appwrite.types";
import StatusBadge from "../status-badge";
import { formatDate } from "@/lib/utils";
import { doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../appointment-modal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-sm font-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-sm font-medium">{appointment.patient.name}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p className="">{formatDate(row.original.schedule)}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = doctors.find(
        (doc) => doc.name === row.original.primaryPhysician,
      );
      return (
        <div className="flex items-center gap-3 pr-5 md:pr-0">
          <Image
            src={doctor?.image || ""}
            alt={doctor?.name || ""}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
          <AppointmentModal
            type="cancel"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
        </div>
      );
    },
  },
];
