import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/card/Card";
import { useAuth } from "@/lib/auth/auth-provider";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading profile data...</p>
        </div>
      </DashboardLayout>
    );
  }

  const userData = user.data;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Contact Information">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1">
                {userData.firstName} {userData.lastName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Email Address
              </h3>
              <p className="mt-1">{userData.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Phone Number
              </h3>
              <p className="mt-1">{userData.phoneNumber || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Username</h3>
              <p className="mt-1">{userData.userName}</p>
            </div>
          </div>
        </Card>

        <Card title="Location">
          {userData.location ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{userData.location.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1">{userData.location.city}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Region</h3>
                <p className="mt-1">{userData.location.region}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Country</h3>
                <p className="mt-1">{userData.location.country}</p>
              </div>
              {userData.location.floorUnit && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Floor/Unit
                  </h3>
                  <p className="mt-1">{userData.location.floorUnit}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No location information available</p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
