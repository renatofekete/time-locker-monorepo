import { Link } from "react-router-dom";
import ContactBox from "../ui/contact/ContactBox";
import FooterMenu from "./FooterMenu";
import {
  FOOTER_FIRST_MENU,
  FOOTER_SECOND_MENU,
  FOOTER_THIRD_MENU,
  FOOTER_FOURTH_MENU,
} from "../../config/menus";
import Logo from "../ui/logo/Logo";

const Footer = () => {
  const footerContent = (
    <>
      <div className="flex gap-[5.25rem] py-16 border-b-2 border-neutral-200 flex-wrap lg:flex-nowrap flex-col sm:flex-row">
        <div>
          <h3 className="text-lg text-neutral-900/80 ">Homepage</h3>
        </div>
        <div className="flex-grow ">
          <h3 className="text-lg text-neutral-900/80 ">
            Subpages & quick actions
          </h3>
          <div className="flex gap-[5.25rem] flex-col sm:flex-row mt-8">
            <FooterMenu
              title={FOOTER_FIRST_MENU.title}
              items={FOOTER_FIRST_MENU.items}
            />
            <FooterMenu
              title={FOOTER_SECOND_MENU.title}
              items={FOOTER_SECOND_MENU.items}
            />
            <FooterMenu
              title={FOOTER_THIRD_MENU.title}
              items={FOOTER_THIRD_MENU.items}
            />
            <FooterMenu
              title={FOOTER_FOURTH_MENU.title}
              items={FOOTER_FOURTH_MENU.items}
            />
          </div>
        </div>
        <div className="flex-1 lg:flex-auto">
          <ContactBox />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8 mb-16">
        <div>
          <Logo />
        </div>
        <div>
          <nav>
            <ul className="flex gap-9 font-medium text-sm text-neutral-900">
              <li>
                <Link to={"/"}>Terms</Link>
              </li>
              <li>
                <Link to={"/"}>Privacy</Link>
              </li>
              <li>
                <Link to={"/"}>Cookies</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <footer className="max-w-[1720px] w-full mx-auto] px-2.5 2xl:py-0 mx-auto">
      <div className="bg-white px-6 lg:px-12">
        <div className="text-center text-sm text-neutral-600 py-6">
          © {new Date().getFullYear()} Time Locker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
