"use client";
import Image from "next/image";

interface StatCardProps {
  count: number | string;
  label: string;
  icon: string;
  type: "appointments" | "pending" | "cancelled";
}
const StatCard = ({ count, label, icon, type }: StatCardProps) => {
  return (
    <div className="py-[32px] px-[24px] border-1 rounded-[12px] w-full max-w-[400px] bg-[#1C2023]">
      <div className="flex items-center  gap-4">
        <Image
          src={icon}
          height={40}
          width={40}
          alt={label}
          className="size-8 w-fit"
        />
        <h2 className="font-bold text-[32px]">{count}</h2>
      </div>
      <p className="mt-[24px]">{label}</p>
    </div>
  );
};

export default StatCard;
