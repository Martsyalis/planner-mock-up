import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = () => {
  const [isBurgerOpen, handleBurger] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Brand isBurgerOpen={isBurgerOpen} handleBurger={handleBurger} />
      <NavMenu isBurgerMenu={isBurgerOpen} />
    </nav>
  );
};

const Brand = ({ isBurgerOpen, handleBurger }) => (
  <div className="navbar-brand">
    <MenuLink to="/" text="Home" />
    <div
      role="button"
      className={`navbar-burger ${active && 'is-active'}`}
      onClick={() => handleBurger(!isBurgerOpen)}
    >
      <span />
      <span />
      <span />
    </div>
  </div>
);

const NavMenu = ({ isBurgerMenu }) => (
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

const MenuLink = ({ to, text }) => (
  <NavLink
    exact
    to={to}
    className="navbar-item"
    // activeClassName="is-active"
  >
    {text}
  </NavLink>
);

export default Navbar;