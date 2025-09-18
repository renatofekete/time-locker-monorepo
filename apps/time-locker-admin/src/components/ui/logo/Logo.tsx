import logoImg from "../../../assets/images/logo.png";

const Logo = () => {
  return (
    <div className="flex gap-4 items-center">
      <img src={logoImg} alt="" />
      <span className="font-semibold text-neutral-900">Time Locker</span>
    </div>
  );
};

export default Logo;
