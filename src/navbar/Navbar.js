import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function Navbar() {
  const [isBurgerOpen, handleBurger] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Brand isBurgerOpen={isBurgerOpen} handleBurger={handleBurger} />
      <NavMenu isBurgerMenu={isBurgerOpen} />
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

function NavMenu({ isBurgerMenu }) {
  return (
    <div
      className={`navbar-menu ${isBurgerMenu && 'is-active'}`}
      style={{ opacity: 0.9 }}
    >
      <div className="navbar-end mobile-navbar">
        <MenuLink to="/" text="Home" />
        <MenuLink to="/" text="Monthly" />
        <MenuLink to="/" text="History" />
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
