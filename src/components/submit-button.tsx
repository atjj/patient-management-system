import React from "react";
import { Button } from "./ui/button";
interface ButtonProps {
  form: string;
  isLoading: boolean;
  className: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  form,
  isLoading,
  className,
  children,
}: ButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      className={className}
      type="submit"
      form={form}
    >
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ): children}
    </Button>
  );
};

export default SubmitButton;
