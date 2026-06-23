import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import AccountBar from "./AccountBar";
import { useAccount } from "../context/AccountContext";
import "./Layout.css";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/messaging", label: "Messaging" },
  { to: "/proof", label: "Proof" },
  { to: "/why-now", label: "Why now" },
  { to: "/discovery", label: "Discovery" },
  { to: "/talk-tracks", label: "Talk tracks" },
  { to: "/objections", label: "Objections" },
];

interface LayoutProps {
  children: ReactNode;
}

function NavLinkWithAccount({ to, label, end }: { to: string; label: string; end?: boolean }) {
  const { accountId } = useAccount();
  const destination = accountId
    ? { pathname: to, search: `?account=${accountId}` }
    : to;

  return (
    <NavLink
      to={destination}
      end={end}
      className={({ isActive }) =>
        isActive ? "nav-link nav-link--active" : "nav-link"
      }
    >
      {label}
    </NavLink>
  );
}

function NavCtaLink() {
  const { accountId } = useAccount();
  const destination = accountId
    ? { pathname: "/tee-up", search: `?account=${accountId}` }
    : "/tee-up";

  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        isActive ? "nav-cta nav-cta--active" : "nav-cta"
      }
    >
      Generate landing page
    </NavLink>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand">
            <span className="nav-brand-mark">
              <span className="nav-brand-dot" aria-hidden />
            </span>
            <span className="nav-brand-text">AI playbook</span>
          </NavLink>
          <nav className="nav-links">
            <div className="nav-links-main">
              {navItems.map((item) => (
                <NavLinkWithAccount
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  end={item.end}
                />
              ))}
            </div>
            <NavLink
              to="/editor"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--editor nav-link--active" : "nav-link nav-link--editor"
              }
            >
              Editor
            </NavLink>
            <NavCtaLink />
          </nav>
        </div>
      </header>
      <AccountBar />
      <main>{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <p>
            Internal use only. Universal playbook library + account personalization
            (Salesforce · Snowflake · Gong).
          </p>
          <span className="footer-status">
            <span className="footer-status-dot" aria-hidden />
            All systems normal
          </span>
        </div>
      </footer>
    </div>
  );
}
