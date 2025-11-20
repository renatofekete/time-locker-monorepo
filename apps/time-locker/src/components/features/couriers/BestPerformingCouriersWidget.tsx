import Card from "../../ui/card/Card";
import { useCouriers } from "@/hooks/useCouriers";

type BestPerformingCouriersWidgetProps = {
  className?: string;
};

const BestPerformingCouriersWidget = ({
  className,
}: BestPerformingCouriersWidgetProps) => {
  const { data, isLoading, error } = useCouriers(
    `/courier-company-statistics/top-performing?CourierCompanyId=0d446e31-fe0d-438b-9a7a-b4ee9304f06b`
  );

  return (
    <Card
      title="10 best performing couriers"
      className={`h-full ${className || ""}`}
      isLoading={isLoading}
      error={error}
    >
      <ul>
        {(data?.data.items ?? []).map((courier, index) => (
          <li
            key={index}
            className="flex items-center border-b border-neutral-300/50 gap-5 py-3.5"
          >
            <div className="font-semibold bg-slate-100 w-[50px] h-[50px] flex items-center justify-center rounded-full">
              {index + 1}
            </div>
            <div>
              <span className="font-semibold block">{courier.fullName}</span>
              <span className="text-sm ">
                <span className="text-neutral-900/50">Success rate: </span>
                <span className="text-neutral-900">
                  {courier.successRatePercentage}%
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BestPerformingCouriersWidget;
