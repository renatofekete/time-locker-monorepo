import type { UserType } from "@/types/UserType";
import profileImg from "../../../assets/images/profile_image.png";
import { Link } from "react-router-dom";
import paths from "@/config/paths";

type ProfileCardProps = {
  profile: UserType;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const { firstName, lastName, email } = profile;
  return (
    <Link to={paths.profile.getHref()}>
      <div className="flex gap-4 items-center">
        <img src={profileImg} alt="Profile" className="w-9 h-9 rounded-full" />
        <div>
          <h3 className="text-sm text-neutral-900 font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="text-xs text-neutral-900 font-light">{email}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProfileCard;
