import { useState } from "react";
import { NavLink } from "react-router-dom";
import paths from "../../config/paths";
import Bell from "../../assets/icons/bell.svg?react";
import Logo from "../ui/logo/Logo";
import ProfileCard from "../ui/profile/ProfileCard";
import { useAuth } from "@/lib/auth/auth-provider";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: paths.home.getHref() },
    { name: "Couriers", href: paths.couriers.getHref() },
    { name: "Packages", href: paths.packages.getHref() },
    { name: "Settings", href: paths.settings.getHref() },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="relative flex flex-wrap items-center justify-between py-4 px-6 bg-white my-5 mx-2.5 shadow-md border-gray-500 rounded-lg">
      {/* Logo and Mobile Menu Toggle */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Logo />
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            // Close icon (×)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon (☰)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex flex-grow ml-4">
        <ul className="flex">
          {navItems.map(({ name, href }) => (
            <li key={name}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `py-2 px-5 text-sm ${
                    isActive
                      ? "bg-slate-100 font-semibold text-neutral-900"
                      : "bg-white font-light text-neutral-900/80"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right-side Controls (desktop only) */}
      <div className="hidden lg:flex gap-9 items-center me-14">
        {isAuthenticated && user ? (
          <>
            <button
              className="py-2 px-5 text-sm bg-white font-light text-neutral-900/80"
              onClick={logout}
            >
              Logout
            </button>
            <Bell />
            {user && <ProfileCard profile={user.data} />}
          </>
        ) : (
          <NavLink
            to={paths.login.getHref()}
            className="`py-2 px-5 text-sm bg-white font-light text-neutral-900/80"
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="w-full mt-4 lg:hidden">
          <ul className="flex flex-col space-y-2">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <NavLink
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded text-sm ${
                      isActive
                        ? "bg-slate-100 font-semibold text-neutral-900"
                        : "bg-white font-light text-neutral-900/80"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
            <li className="flex items-center gap-4 mt-4">
              {isAuthenticated && user ? (
                <>
                  <button onClick={logout}>Logout</button>
                  <Bell />
                  {user && <ProfileCard profile={user.data} />}
                </>
              ) : (
                <NavLink
                  to={paths.login.getHref()}
                  className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
