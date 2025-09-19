import Card from "../../ui/card/Card";
import { BEST_PERFORMING_COURIERS } from "../../../assets/mocks/couriers";

type BestPerformingCouriersWidgetProps = {
  className?: string;
};

const BestPerformingCouriersWidget = ({
  className,
}: BestPerformingCouriersWidgetProps) => {
  return (
    <Card
      title="10 best performing couriers"
      className={`h-full ${className || ""}`}
    >
      <ul>
        {BEST_PERFORMING_COURIERS.map((courier, index) => (
          <li
            key={index}
            className="flex items-center border-b border-neutral-300/50 gap-5 py-3.5"
          >
            <div className="font-semibold bg-slate-100 w-[50px] h-[50px] flex items-center justify-center rounded-full">
              {index + 1}
            </div>
            <div>
              <span className="font-semibold block">{courier.name}</span>
              <span className="text-sm ">
                <span className="text-neutral-900/50">Success rate: </span>
                <span className="text-neutral-900">{courier.successRate}%</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BestPerformingCouriersWidget;
