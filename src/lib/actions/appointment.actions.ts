"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_TABLE_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";

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

    return newAppointment.$id;
  } catch (error) {
    console.log(error);
  }
};
