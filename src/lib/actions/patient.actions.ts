"use server";

import { ID, Query, AppwriteException } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_TABLE_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { InputFile } from "node-appwrite/file";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      name: user.name,
    });
    return newUser.$id;
  } catch (error: unknown) {
    if (error && error instanceof AppwriteException && error?.code === 409) {
      const documents = await users.list({
        queries: [Query.equal("email", [user.email])],
      });

      return documents?.users[0].$id;
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string,
      );

      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
      });
    }
    const newPatient = await databases.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_TABLE_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      },
    });
    return newPatient.$id;
  } catch (error) {
    console.log(error);
  }
};
