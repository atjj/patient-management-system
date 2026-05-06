"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const PasskeyModal = () => {
  const path = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && atob(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptedKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = btoa(passkey);
      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-[#1A1D21F5] p-[40px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full flex items-start justify-between font-semibold text-[24px]">
            Admin Access Verification
            <Image
              src="/assets/close.svg"
              alt="close"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => closeModal()}
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#ABB8C4] text-md font-medium mt-[16px]">
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-[40px]">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="w-full flex justify-between">
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={0}
              />
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={1}
              />
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={2}
              />
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={3}
              />
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={4}
              />
              <InputOTPSlot
                className="border-1 border-white rounded-[8px] p-7 text-[32px] text-[#24AE7C]"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="mt-4 flex justify-center text-[#F24E43]">{error}</p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full cursor-pointer dark:bg-[#24AE7C] h-[48px] dark:text-[#FFFFFF] font-semibold text-[16px]"
            onClick={(e) => validatePasskey(e)}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
