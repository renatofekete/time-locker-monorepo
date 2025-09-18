import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "time-locker-ui";
import { useAuth } from "@/lib/auth/auth-provider";

const Profile = () => {
  const { userProfileData } = useAuth();

  if (!userProfileData || !userProfileData.data) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading profile data...</p>
        </div>
      </DashboardLayout>
    );
  }

  const user = userProfileData.data;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Contact Information">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Email Address
              </h3>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Phone Number
              </h3>
              <p className="mt-1">{user.phoneNumber || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Username</h3>
              <p className="mt-1">{user.username}</p>
            </div>
          </div>
        </Card>

        <Card title="Location">
          {user.location ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{user.location.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1">{user.location.city}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Region</h3>
                <p className="mt-1">{user.location.region}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Country</h3>
                <p className="mt-1">{user.location.country}</p>
              </div>
              {user.location.floorUnit && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Floor/Unit
                  </h3>
                  <p className="mt-1">{user.location.floorUnit}</p>
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
