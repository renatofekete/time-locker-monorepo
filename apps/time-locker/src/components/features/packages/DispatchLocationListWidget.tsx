import Card from "../../ui/card/Card";
import { FREQUENT_PACKAGE_DISPATCH_LOCATIONS } from "../../../assets/mocks/packages";
import { useCouriers } from "@/hooks/useCouriers";

type DispatchLocationListWidgetProps = {
  className?: string;
};

const DispatchLocationListWidget = ({
  className,
}: DispatchLocationListWidgetProps) => {
  const { data, isLoading, error } = useCouriers(
    `/courier-company-statistics/frequent-delivery-locations?CourierCompanyId=0d446e31-fe0d-438b-9a7a-b4ee9304f06b`
  );
  return (
    <Card
      title="Frequent package dispatch locations"
      className={`h-full ${className || ""}`}
      isLoading={isLoading}
      error={error}
    >
      <ul>
        {data?.data?.map((location, index) => (
          <li
            key={index}
            className="flex items-center border-b border-neutral-300/50 gap-5 py-3.5"
          >
            <div className="font-semibold bg-slate-100 w-[50px] h-[50px] flex items-center justify-center rounded-full">
              {index + 1}
            </div>
            <div>
              <span className="font-semibold block">
                {location.locationName} ({location.dispatchCount})
              </span>
              <span className="text-sm ">
                <span className="text-neutral-900/50">
                  Delivery concentration rate:{" "}
                </span>
                <span className="text-neutral-900">
                  {location.deliveryConcentrationRate}%
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default DispatchLocationListWidget;
