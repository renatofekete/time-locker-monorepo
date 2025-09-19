import { capitalizeFirstLetter } from "../../../utils/strings";

type TabNavigationProps = {
  activeTab: string;
  tabs: string[];
  onTabChange: (tab: string) => void;
  className?: string;
};

const TabNavigation = ({
  className,
  tabs,
  onTabChange,
  activeTab,
}: TabNavigationProps) => {
  return (
    <nav
      className={`flex items-center justify-between p-1.5 bg-gray-100 rounded-lg shadow ${className}`}
    >
      <ul className="flex space-x-4">
        {tabs.map((tab, index) => (
          <li
            key={tab}
            className={`${
              tab === activeTab
                ? "bg-white text-neutral-900"
                : "text-neutral-900/50"
            } py-1.5 text-sm px-14 cursor-pointer rounded-sm`}
            onClick={() => onTabChange(tab)}
            role="button"
            tabIndex={0}
          >
            {capitalizeFirstLetter(tab)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;
