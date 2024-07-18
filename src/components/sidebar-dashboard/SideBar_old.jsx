import React from 'react';
import './sidebar.css';
import logoIcon from '../assets/images/favicon.png';
import logoLight from '../assets/images/case_drive_logo.svg';
import logoDark from '../assets/images/Logo_dark_casedrive.svg';
import {NavLink} from "react-router-dom";


const SideBarComponent = () => {

    const body = document.querySelector('body');
    const openLogo = document.querySelector('.open-logo');
    const closedLogo = document.querySelector('.closed-logo');
    const darkLogo = document.querySelector('.dark-logo');
    const sidebar = document.querySelector('#navbar');
    const toggle = document.querySelector(".toggle-close");
    const toggleOpen = document.querySelector(".toggle-open");
    const menu = document.querySelector('#menuBar');
    const home = document.querySelector('.Home');
    const headerNav = document.querySelector('#headerNav');
    const catTitles = document.querySelectorAll('.category-titles');

    const handleMouseEnter = () => {
        catTitles.forEach((catTitle) => {
            catTitle.classList.remove('hidden');
        });
        if (body.classList.contains("dark")) {
            darkLogo.classList.remove('hidden');
            closedLogo.classList.add('hidden');
        } else {
            openLogo.classList.remove('hidden');
            closedLogo.classList.add('hidden');
        }
        sidebar.classList.remove('close');
        sidebar.classList.add('fixed-Home');
        home.classList.add('opened-Home');
        headerNav.classList.add('opened-header');
    };
    const handleMouseLeave = () => {
        menu.classList.add('closed-menubar');
        catTitles.forEach((catTitle) => {
            catTitle.classList.add('hidden');
        });
        if (body.classList.contains('dark')) {
            darkLogo.classList.add('hidden');
            closedLogo.classList.remove('hidden');
        } else {
            openLogo.classList.add('hidden');
            closedLogo.classList.remove('hidden');
        }
        sidebar.classList.add('close');
        home.classList.remove('opened-Home');
        sidebar.classList.remove('fixed-Home');
        headerNav.classList.remove('opened-header');
    };


    const sidebarOpen = () => {
        sidebar.classList.remove('close');
        menu.classList.remove('closed-menubar');
        toggle.classList.add('hidden');
        catTitles.forEach((catTitle) => {
            catTitle.classList.remove('hidden');
        });
        if (body.classList.contains("dark")) {
            darkLogo.classList.remove('hidden');
            closedLogo.classList.add('hidden');
        } else {
            openLogo.classList.remove('hidden');
            closedLogo.classList.add('hidden');
        }
        headerNav.classList.add('opened-header');
        toggleOpen.classList.remove('hidden');
        home.classList.add('opened-Home');
        menu.removeEventListener('mouseover', handleMouseEnter, false);
        menu.removeEventListener('mouseout', handleMouseLeave, false);
    };

    const sidebarClose = () => {
        sidebar.classList.add('close');
        menu.classList.add('closed-menubar');
        toggle.classList.remove('hidden');
        catTitles.forEach((catTitle) => {
            catTitle.classList.add('hidden');
        });
        if (body.classList.contains('dark')) {
            darkLogo.classList.add('hidden');
            closedLogo.classList.remove('hidden');
        } else {
            openLogo.classList.add('hidden');
            closedLogo.classList.remove('hidden');
        }
        headerNav.classList.remove('opened-header');
        toggleOpen.classList.add('hidden');
        home.classList.remove('opened-Home');
        menu.addEventListener('mouseover', handleMouseEnter, false);
        menu.addEventListener('mouseout', handleMouseLeave, false);
    };
     return (
            <nav
                className={`sidebar close`}
                id="navbar">
                <header>
                    <div className="image-text">
                    <span className="image">
                        <img
                            src={logoLight}
                            className={`hidden open-logo `}
                            alt="Logo"
                        />
                        <img
                            src={logoDark}
                            className={`hidden dark-logo`}
                            alt="Logo"
                        />
                        <img
                            src={logoIcon}
                            className={`closed-logo`}
                            alt="Logo"
                        />
                    </span>
                    </div>
                    <i
                        className={`far fa-chevron-right  toggle hidden toggle-open`}
                        onClick={sidebarClose}
                    />
                    <i
                        className={`far fa-chevron-right toggle toggle-close`}
                        onClick={sidebarOpen}
                    />
                </header>
                <div className={`menu-bar closed-menubar`}
                     id="menuBar">
                    <div className="menu">
                        <li className="add-button menu-icon nav-link mb-4">
                            <a className="btn" id="addBtn" data-bs-toggle="dropdown" role="button">
                                <i className="far fa-plus icon"/>
                                <span className="text nav-text">Add</span>
                            </a>
                            <ul className="dropdown-menu p-2" aria-labelledby="addBtn" id="addDrop">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className='far fa-plus icon'/>
                                        <span className="text nav-text">Add New Case</span>
                                    </a>
                                </li>
                                <hr/>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className='far fa-file icon'/>
                                        <span className="text nav-text">Add Additional Records</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <ul className="menu-links">
                            <li className="category-titles hidden">HOME</li>
                            <li className="nav-link menu-icon">
                                <NavLink to="/dashboard">
                                    <i className='far fa-home-alt icon'/>
                                    <span className="text nav-text">Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="category-titles hidden">CASE MANAGEMENT</li>
                            <li className="nav-link menu-icon">
                                <a>
                                    <i className='far fa-list icon'/>
                                    <span className="text nav-text">Case List</span>
                                </a>
                            </li>

                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-file icon'/>
                                    <span className="text nav-text">Case Report</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">USER MANAGEMENT</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-user-plus icon'/>
                                    <span className="text nav-text">Users</span>
                                </a>
                            </li>

                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-users icon'/>
                                    <span className="text nav-text">Clients</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">FINANCE</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-file-invoice icon'/>
                                    <span className="text nav-text">Estimate</span>
                                </a>
                            </li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='bx bx-wallet icon'/>
                                    <span className="text nav-text">Generate Billing</span>
                                </a>
                            </li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-file-invoice-dollar icon'/>
                                    <span className="text nav-text">Invoice</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">C DRIVE</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-folder-open icon'/>
                                    <span className="text nav-text">File Manager</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">CONTRACTS</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-file-pdf icon'/>
                                    <span className="text nav-text">Documents</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">Audit</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-shield-check icon'/>
                                    <span className="text nav-text">Quality</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">Rewards</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-hand-pointer icon'/>
                                    <span className="text nav-text">Referral</span>
                                </a>
                            </li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-hand-holding-usd icon'/>
                                    <span className="text nav-text">Loyalty</span>
                                </a>
                            </li>
                            <li className="category-titles hidden">Partner Program</li>
                            <li className="nav-link menu-icon">
                                <a href="#">
                                    <i className='far fa-handshake icon'/>
                                    <span className="text nav-text">Venture</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
}
export default SideBarComponent;
