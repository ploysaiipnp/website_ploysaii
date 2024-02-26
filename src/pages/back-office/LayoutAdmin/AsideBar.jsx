// import _ from "lodash";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const listMenu = [
//   {
//     key: "admin-dashboard",
//     label: "dashboard",
//     icon: "",
//     link: "/admin-dashboard",
//   },
//   {
//     key: "admin-manage-product",
//     label: "จัดการสินค้า",
//     icon: "",
//     link: "/admin-manage-product",
//   },
//   {
//     key: 3,
//     label: "โปรโมชั่น",
//     icon: "",
//     link: "",
//   },
// ];
// const AsideBar = () => {
//   const location = useLocation();
//   const _path = location.pathname.split("/");
//   const currentPath = _path[_.size(_path) - 1];

//   useEffect(() => {
//     window.scrollTo(0, 440);
//   }, [currentPath]);
//   return (
//     <>
//       <aside className="left-sidebar">
//         <div>
//           <div className="brand-logo d-flex align-items-center justify-content-between">
//             <a href="./index.html" className="text-nowrap logo-img">
//               <img src="/admin/images/logos/dark-logo.svg" width="180" alt="" />
//             </a>
//             <div
//               className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
//               id="sidebarCollapse"
//             >
//               <i className="ti ti-x fs-8"></i>
//             </div>
//           </div>

//           <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
//             <ul id="sidebarnav">
//               <li className="nav-small-cap">
//                 <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span className="hide-menu">Home</span>
//               </li>
//               {listMenu.map((menu, index) => (
//                 <li key={index} className="sidebar-item">
//                   <Link
//                     className={`sidebar-link ${
//                       menu.key === currentPath && "active"
//                     }`}
//                     to={menu.link}
//                   >
//                     <span>
//                       <i className="ti ti-layout-dashboard"></i>
//                     </span>
//                     <span className="hide-menu">{menu.label}</span>
//                   </Link>
//                 </li>
//               ))}
//               <li className="nav-small-cap">
//                 <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
//                 <span className="hide-menu">AUTH</span>
//               </li>
//               <li className="sidebar-item">
//                 <a
//                   className="sidebar-link"
//                   href="./authentication-login.html"
//                   aria-expanded="false"
//                 >
//                   <span>
//                     <i className="ti ti-login"></i>
//                   </span>
//                   <span className="hide-menu">Login</span>
//                 </a>
//               </li>
//               <li className="sidebar-item">
//                 <a
//                   className="sidebar-link"
//                   href="./authentication-register.html"
//                   aria-expanded="false"
//                 >
//                   <span>
//                     <i className="ti ti-user-plus"></i>
//                   </span>
//                   <span className="hide-menu">Register</span>
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AsideBar;
