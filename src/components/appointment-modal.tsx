import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Appointment } from "../../types/appwrite.types";
import { AppointmentForm } from "./forms";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => {
            setOpen(true);
          }}
          className={`capitalize dark:hover:bg-transparent cursor-pointer ${type === "schedule" && "text-green-500 hover:text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      {open && (
        <DialogContent className="bg-[#1A1D21F5] border-black sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
            <DialogDescription>
              Please fill in the following details to {type} an appointment
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            userId={userId}
            patientId={patientId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AppointmentModal;
