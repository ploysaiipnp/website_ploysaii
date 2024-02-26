import React from "react";

const HeaderAdmin = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a
              className="nav-link sidebartoggler nav-icon-hover"
              id="headerCollapse"
              href="#"
            >
              <i className="ti ti-menu-2"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="#">
              <i className="ti ti-bell-ringing"></i>
              <div className="notification bg-primary rounded-circle"></div>
            </a>
          </li>
        </ul>
        <div
          className="navbar-collapse justify-content-end px-0"
          id="navbarNav"
        >
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <a
              href="https://adminmart.com/product/modernize-free-bootstrap-admin-dashboard/"
              target="_blank"
              className="btn btn-primary"
            >
              Admin Name
            </a>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="#"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/admin/images/profile/user-1.jpg"
                  alt=""
                  width="35"
                  height="35"
                  className="rounded-circle"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
