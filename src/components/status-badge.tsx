import { statusIcon } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600/30": status === "scheduled",
        "bg-blue-600/30": status === "pending",
        "bg-red-600/30": status === "cancelled",
      })}
    >
      <Image
        src={statusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={cn("text-[12px] font-semibold capitalize", {
          "text-green-300": status === "scheduled",
          "text-blue-300": status === "pending",
          "text-red-300": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
