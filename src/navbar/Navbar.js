import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../services/firebase-auth';
import './Navbar.css';

function Navbar() {
  const [isBurgerOpen, handleBurger] = useState(false);
  return (
    <nav
      className="navbar main-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <Brand isBurgerOpen={isBurgerOpen} handleBurger={handleBurger} />
      <NavMenu isBurgerMenu={isBurgerOpen} handleBurger={handleBurger} />
    </nav>
  );
}

function Brand({ isBurgerOpen, handleBurger }) {
  return (
    <div className="navbar-brand">
      <MenuLink to="/" text="Home" />
      <div
        role="button"
        className={`navbar-burger ${isBurgerOpen && 'is-active'}`}
        onClick={() => handleBurger(!isBurgerOpen)}
      >
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function NavMenu({ isBurgerMenu, handleBurger }) {
  return (
    <div
      className={`navbar-menu ${isBurgerMenu && 'is-active'}`}
      style={{ opacity: 0.9 }}
    >
      <div
        className="navbar-end mobile-navbar"
        onClick={() => handleBurger(false)}
      >
        <MenuLink to="/" text="Add" />
        <MenuLink to="/budget" text="Budget" />
        <MenuLink to="/history" text="History" />
        <p className="navbar-item" onClick={signOut}>
          Sign out
        </p>
      </div>
    </div>
  );
}

function MenuLink({ to, text }) {
  return (
    <NavLink
      exact
      to={to}
      className="navbar-item"
      // activeClassName="is-active"
    >
      {text}
    </NavLink>
  );
}

export default Navbar;
