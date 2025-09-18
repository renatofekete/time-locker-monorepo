import { Card } from "time-locker-ui";
import MapView from "@/components/ui/map/MapView";
import { useParcelMachines } from "@/hooks/useParcelMachines";

const DeliveriesMapWidget = () => {
  const { data } = useParcelMachines("/parcel-machines");
  return (
    <Card>
      <MapView />
    </Card>
  );
};

export default DeliveriesMapWidget;
