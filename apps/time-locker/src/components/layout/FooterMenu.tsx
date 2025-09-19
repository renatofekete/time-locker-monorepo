import { Link } from "react-router-dom";

type FooterMenuProps = {
  title: string;
  items: Array<{ label: string; path: string }>;
};

const FooterMenu = ({ title, items }: FooterMenuProps) => {
  return (
    <div>
      <h4 className="text-sm text-neutral-900 font-semibold mb-2">{title}</h4>
      <nav>
        <ul>
          {items &&
            items.map((item, index) => (
              <li
                key={index}
                className="text-sm text-neutral-900/80 font-light mb-2"
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default FooterMenu;
