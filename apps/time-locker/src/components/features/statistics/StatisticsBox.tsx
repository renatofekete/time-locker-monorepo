import UserRounded from "../../../assets/icons/UserRounded.svg?react";
import ArrowRightUp from "../../../assets/icons/ArrowRightUp.svg?react";
import ArrowRightDown from "../../../assets/icons/ArrowRightDown.svg?react";
import Alert from "../../ui/alert/Alert";

type StatisticsBoxProps = {
  title: string;
  value: string;
  unit: string;
  percentage: number;
};

const StatisticsBox = ({
  title,
  value,
  unit,
  percentage,
}: StatisticsBoxProps) => {
  const alertType = percentage > 0 ? "success" : "error";

  return (
    <div className="flex justify-between px-5 py-4 border-1 border-neutral-300/50">
      <div>
        <h4 className="font-medium text-neutral-900/50 text-sm mb-1">
          {title}
        </h4>
        <div>
          <span className="font-semibold text-neutral-900 text-2xl">
            {value}
          </span>{" "}
          <span className="text-neutral-900 text-xs">{unit}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span>vs. Last week</span>
          <Alert
            type={alertType}
            text={
              percentage > 0
                ? `+${percentage.toString()}%`
                : `${percentage.toString()}%`
            }
            icon={
              alertType === "success" ? (
                <ArrowRightUp className="text-green-700" />
              ) : (
                <ArrowRightDown className="text-red-700" />
              )
            }
          />
        </div>
      </div>
      <div>
        <div className="p-1.5 border-1 border-neutral-300/50">
          <UserRounded />
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;
