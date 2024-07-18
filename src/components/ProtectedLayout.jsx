import React, { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import SideBarComponent from "./sidebar-dashboard/SideBar";
import "./layout.css";
import whatsNew from "../assets/images/whats_new_icon.gif";
import referIcon from "../assets/images/refer_icon.gif";
import demoPic from "../assets/images/demo_pic.jpg";
import seriesIcon from "../assets/images/series.svg";
import SideBarRightComponent from "./sidebar-dashboard/SideBarRight";
import logoDark from "../assets/images/Logo_dark_casedrive.svg";
import logoIcon from "../assets/images/favicon.png";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_USER } from "../store/auth/authSlice";
import Logo from "../pages/auth/signup/Logo";

export default function DefaultLayout() {
  // const {user, logoutUser} = useAuth();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    // if (user === null || !userFromLocal.user.role_id) {
    if (user === null) {
      return navigate("/");
    } 
    // else {
    //   return navigate("/admin/dashboard");
    // }
    console.log(userFromLocal);
  }, [navigate]);

  console.log(Boolean(user));

  let body = document.querySelector("body");
  let home = document.querySelector("main");
  let openLogo = document.querySelector(".open-logo");
  let darkLogo = document.querySelector(".dark-logo");
  let sunMoon = document.querySelector(".sun-moon");
  const switchMode = () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      sunMoon.classList.remove("fa-moon-star");
      sunMoon.classList.add("fa-sun");
      if (home.classList.contains("opened-Home")) {
        openLogo.classList.add("hidden");
        darkLogo.classList.remove("hidden");
      }
    } else {
      sunMoon.classList.add("fa-moon-star");
      sunMoon.classList.remove("fa-sun");
      if (home.classList.contains("opened-Home")) {
        openLogo.classList.remove("hidden");
        darkLogo.classList.add("hidden");
      }
    }
  };
  // logout user
  const handleLogout = async () => {
    // try {
    //     const resp = await axios.post('/logout');
    //     if (resp.status === 200) {
    //         localStorage.removeItem('user');
    //         window.location.href = '/';
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    dispatch(LOG_OUT_USER());
    // logoutUser();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light" id="headerNav">
        <div className="image-text navbar-brand">
         <Logo/>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <li className="navbar-nav mb-2 mb-lg-0 ms-4">
          <Link className="nav-link" to="">
            <img src={seriesIcon} width="40" height="40" />
          </Link>
        </li>
        <li className="container-fluid">
          <form>
            <div className="d-flex search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit" id="searchBtn">
                <i className="far fa-search" />
              </button>
            </div>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="navbar-nav mb-2 mb-lg-0 me-2">
              <select className={"division-select"}>
                <option>All Locations</option>
                <option>Salem</option>
                <option>Kulasekharam</option>
              </select>
            </li>
            <li className="navbar-nav mb-2 mb-lg-0">
              <select className={"division-select"}>
                <option>All Divisions</option>
                <option>MedLegal</option>
                <option>Retrieval</option>
                <option>Insurance</option>
                <option>SortDex</option>
              </select>
            </li>
            <li className="nav-item mt-auto mb-auto d-flex">
              <a
                className="nav-link refer pe-0"
                aria-current="page"
                type="button"
              >
                Refer & Earn
              </a>
              <img
                src={referIcon}
                className="refer-icon-light"
                width="40"
                height="40"
              />
            </li>
          </ul>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <Form className="mode-switch-form">
                  <Form.Check // prettier-ignore
                    className="mode-switch"
                    type="switch"
                    id="custom-switch"
                    onClick={switchMode}
                  />
                </Form>
              </li>
              <li className="nav-item mt-auto mb-auto d-flex">
                <img src={whatsNew} width="30" height="30" />
                <a
                  className="nav-link what-new ps-0"
                  aria-current="page"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  What's New
                </a>
              </li>

              {/*<li className="nav-item mt-auto mb-auto">*/}
              {/*    <a className="nav-link mode-switch-light" type="button" onClick={switchMode}>*/}
              {/*        <i className='fas fa-moon-stars icon sun-moon'/>*/}
              {/*    </a>*/}
              {/*</li>*/}
              <li className="nav-item mt-auto mx-2 mb-auto dropstart">
                <a
                  className="nav-link message-icon"
                  aria-current="page"
                  id="messageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="far fa-comment-alt-dots icon" />
                  <span className="badge">2</span>
                </a>
                <ul
                  className="dropdown-menu notify-drop"
                  aria-labelledby="messageDropdown"
                >
                  <div className="p-3 d-flex justify-content-between">
                    <h4 className="msg-title">Messages</h4>
                    <i className="fas fa-times" />
                  </div>

                  <Tabs
                    defaultActiveKey="all"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                  >
                    <Tab eventKey="all" title="All">
                      <li className="dropdown-item">
                        <Link className="d-flex justify-content-start" href="#">
                          <div className="notify-image">
                            <img
                              src={demoPic}
                              className=""
                              width="40"
                              height="40"
                            />
                          </div>
                          <div>
                            <h5>New client</h5>
                            <h6>New client has been added</h6>
                          </div>
                        </Link>
                      </li>
                      <hr />
                      <li className="dropdown-item">
                        <Link className="d-flex" href="">
                          <div className="notify-image">
                            <img
                              src={demoPic}
                              className=""
                              width="40"
                              height="40"
                            />
                          </div>
                          <div>
                            <h5>Payment</h5>
                            <h6>Dwayne Johnson has paid the invoice</h6>
                          </div>
                        </Link>
                      </li>
                    </Tab>
                    <Tab eventKey="unread" title="Unread">
                      <li className="dropdown-item">
                        <a className="d-flex justify-content-start" href="#">
                          <div className="notify-image">
                            <img
                              src={demoPic}
                              className=""
                              width="40"
                              height="40"
                            />
                          </div>
                          <div>
                            <h5>New client</h5>
                            <h6>New client has been added</h6>
                          </div>
                        </a>
                      </li>
                      <hr />
                      <li className="dropdown-item">
                        <a className="d-flex" href="">
                          <div className="notify-image">
                            <img
                              src={demoPic}
                              className=""
                              width="40"
                              height="40"
                            />
                          </div>
                          <div>
                            <h5>Payment</h5>
                            <h6>Dwayne Johnson has paid the invoice</h6>
                          </div>
                        </a>
                      </li>
                    </Tab>
                  </Tabs>
                </ul>
              </li>
              <li className="nav-item mt-auto mx-2 mb-auto dropstart">
                <a
                  className="nav-link notification-icon"
                  id="notificationDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell icon" />
                  <span className="badge">3</span>
                </a>
                <ul
                  className="dropdown-menu notify-drop"
                  aria-labelledby="notificationDropdown"
                >
                  <li className="dropdown-item">
                    <a className="d-flex justify-content-start" href="#">
                      <div className="notify-image">
                        <img
                          src={demoPic}
                          className=""
                          width="40"
                          height="40"
                        />
                      </div>
                      <div>
                        <h5>New client</h5>
                        <h6>New client has been added</h6>
                      </div>
                    </a>
                  </li>
                  <hr />
                  <li className="dropdown-item">
                    <a className="d-flex" href="">
                      <div className="notify-image">
                        <img
                          src={demoPic}
                          className=""
                          width="40"
                          height="40"
                        />
                      </div>
                      <div>
                        <h5>Payment</h5>
                        <h6>Dwayne Johnson has paid the invoice</h6>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mt-auto mx-2 mb-auto">
                <Link className="nav-link" to="/admin/setting/company-detail">
                  <i className="far fa-envelope icon" />
                </Link>
              </li>
              <li className="nav-item mt-auto mx-2 mb-auto">
                <Link className="nav-link" to="/admin/setting/company-detail">
                  <i className="far fa-cog icon" />
                </Link>
              </li>
              <li className="nav-item mx-2 dropstart">
                <a
                  className="nav-link"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={demoPic}
                    width="40"
                    height="40"
                    className="profile-image-navbar"
                  />
                </a>
                <ul
                  className="dropdown-menu p-3 profile-drop"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="text-center">
                    <img
                      src={demoPic}
                      width="70"
                      height="70"
                      className="profile-image-navbar"
                    />
                  </li>
                  <li className="text-center">
                    <h5 className="nav-text mb-1 mt-1">{user?.user?.name}</h5>
                    <span className="text nav-text">{user?.user?.email}</span>
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account">
                      <i className="bx bx-user icon" />
                      <span className="text nav-text">Account</span>
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/setting/company-detail"
                    >
                      <i className="bx bx-cog icon" />
                      <span className="text nav-text">Settings</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="#"
                      onClick={handleLogout}
                    >
                      <i className="bx bx-log-out icon" />
                      <span className="text nav-text">Logout</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </nav>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">What's New</h5>
          <button
            type="button"
            className="btn text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="far fa-times" />
          </button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <li>
              <a href="#">
                <h5>June 26, 2023</h5>
                <p>Checkout the CaseDrive update V2.0</p>
              </a>
            </li>
            <hr />
            <li>
              <a href="">
                <h5>May 15, 2022</h5>
                <p>New update has been released V1.2</p>
              </a>
            </li>
            <hr />
          </ul>
        </div>
      </div>
      <SideBarComponent />
      <main className="bg-white" >
        <Outlet />
      </main>
      <SideBarRightComponent />
    </>
  );
}
