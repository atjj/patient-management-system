"use server";

import { ID, Query } from "node-appwrite";
import type { Appointment } from "../../../types/appwrite.types";
import {
  APPOINTMENT_TABLE_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { formatDate } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAppointment = async (appointment: any) => {
  try {
    const newAppointment = await databases.createRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_TABLE_ID!,
      rowId: ID.unique(),
      data: {
        ...appointment,
      },
    });

    return JSON.parse(JSON.stringify(newAppointment));
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmendId: string) => {
  try {
    const appointment = await databases.listRows({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_TABLE_ID!,
      queries: [Query.equal("$id", appointmendId)],
    });

    return appointment;
  } catch (error) {
    console.error(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listRows({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_TABLE_ID!,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.select(["*", "patient.*"]),
      ],
    });

    const appointmentsData = JSON.parse(
      JSON.stringify(appointments.rows),
    ) as Appointment[];

    const pendingCounts = appointmentsData.filter(
      (item) => item.status == "pending",
    ).length;
    const cancelledCounts = appointmentsData.filter(
      (item) => item.status == "cancelled",
    ).length;
    return {
      appointmentsData,
      totalAppointments: appointments.total,
      pendingCounts,
      cancelledCounts,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  try {
    const updatedAppointment = await databases.updateRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_TABLE_ID!,
      rowId: appointmentId,
      data: appointment,
    });

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const emailMessage = `
    Hi, it's CarePulse.
    ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${formatDate(appointment.schedule!)} with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
    }
    `;

    await sendEmail(userId, emailMessage);

    revalidatePath("/admin");
    return JSON.parse(JSON.stringify(updatedAppointment));
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (userId: string, content: string) => {
  try {
    const email = await messaging.createEmail({
      messageId: ID.unique(),
      subject: "CarePulse",
      content: content,
      users: [userId],
      html: true,
    });

    return JSON.parse(JSON.stringify(email));
  } catch (error) {
    console.log(error);
  }
};
