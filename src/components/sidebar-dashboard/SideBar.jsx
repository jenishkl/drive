import React, {useState} from 'react';
import './sidebar.css';
import logoIcon from '../../assets/images/favicon.png';
import logoLight from '../../assets/images/case_drive_logo.svg';
import logoDark from '../../assets/images/Logo_dark_casedrive.svg';
import {NavLink} from "react-router-dom";


const SideBarComponent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarManuallyToggled, setSidebarManuallyToggled] = useState(false);

    const handleMouseEnter = () => {
        if (!sidebarManuallyToggled) {
            setSidebarOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!sidebarManuallyToggled) {
            setSidebarOpen(false);
            accordBtns.forEach((accordBtn) => {
                if (!accordBtn.classList.contains('collapsed')) {
                    accordBtn.classList.add('collapsed');
                }
            });
            accordDrops.forEach((accordDrop) => {
                accordDrop.classList.remove('show');
            });
        }
        ;
    }
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setSidebarManuallyToggled(!sidebarOpen);
        accordBtns.forEach((accordBtn) => {
            if (!accordBtn.classList.contains('collapsed')) {
                accordBtn.classList.add('collapsed');
            }
        });
        accordDrops.forEach((accordDrop) => {
            accordDrop.classList.remove('show');
        });
    };

    const sidebar = document.querySelector('.sidebar');
    const menu = document.querySelector('#menuBar');
    const accordBtns = document.querySelectorAll('.accordion-button')
    const accordDrops = document.querySelectorAll('.accordion-collapse')
    const catTitles = document.querySelectorAll('.category-titles');
    //
    // const handleMouseEnter = (event) => {
    //
    //     sidebar.classList.remove('close');
    //     catTitles.forEach((catTitle) => {
    //         catTitle.classList.remove('hidden');
    //     });
    // };
    // const handleMouseLeave = (event) => {
    //
    //     sidebar.classList.add('close');
    //     catTitles.forEach((catTitle) => {
    //         catTitle.classList.add('hidden');
    //     });
    //     if (sidebar.classList.contains('close')) {
    //         accordBtns.forEach((accordBtn) => {
    //             if (!accordBtn.classList.contains('collapsed')) {
    //                 accordBtn.classList.add('collapsed');
    //             }
    //         });
    //         accordDrops.forEach((accordDrop) => {
    //             accordDrop.classList.remove('show');
    //         });
    //     }
    //
    //
    // };
    //
    // const handleAccordionItemMouseEnter = (event) => {
    //     event.stopPropagation();
    //     // Handle your mouse enter logic for the accordion item
    // };
    //
    // const handleAccordionItemMouseLeave = (event) => {
    //     event.stopPropagation();
    //     // Handle your mouse leave logic for the accordion item
    // };
    // const sidebarOpen = () => {
    //     sidebar.classList.toggle('close');
    //     // toggle.classList.toggle('hidden');
    //     catTitles.forEach((catTitle) => {
    //         catTitle.classList.toggle('hidden');
    //     });
    //     accordBtns.forEach((accordBtn) => {
    //         if (!accordBtn.classList.contains('collapsed')) {
    //             accordBtn.classList.add('collapsed');
    //         }
    //     });
    //     accordDrops.forEach((accordDrop) => {
    //         accordDrop.classList.remove('show');
    //     });
    //     if (sidebar.classList.contains('close')) {
    //         // toggleOpen.classList.toggle('hidden');
    //         menu.addEventListener('mouseover', handleMouseEnter, false);
    //         menu.addEventListener('mouseout', handleMouseLeave, false);
    //     } else {
    //         // toggleOpen.classList.toggle('hidden');
    //         menu.removeEventListener('mouseover', handleMouseEnter, false);
    //         menu.removeEventListener('mouseout', handleMouseLeave, false);
    //     }
    //
    // };
    //

    return (
        <nav
            className={`sidebar ${sidebarOpen ? '' : 'close'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <header>
                <i
                    className={`far fa-sliders-h toggle ${sidebarOpen ? 'toggle-close' : 'toggle-open'}`}
                    onClick={toggleSidebar}

                />
            </header>
            <div className={`menu-bar closed-menubar`}
                 id="menuBar"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
            >
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
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/dashboard">
                                <i className='far fa-home-alt icon'/>
                                <span className="accordion-header text">DASHBOARD</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-file-archive icon'/>
                                <span className="accordion-header text">CASES</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='bx bx-wallet icon'/>
                                <span className="accordion-header text">BILLING</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-folders icon'/>
                                <span className="accordion-header text">DRIVE</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-users-medical icon'/>
                                <span className="accordion-header text">TEAMS</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-file-contract icon'/>
                                <span className="accordion-header text">CONTRACTS</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-list icon'/>
                                <span className="accordion-header text">TASKS</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-file-search icon'/>
                                <span className="accordion-header text">SAMPLES</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-sticky-note icon'/>
                                <span className="accordion-header text">NOTES</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-comment icon'/>
                                <span className="accordion-header text">MESSAGES</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-hand-holding-usd icon'/>
                                <span className="accordion-header text">LOYALTY</span>
                            </NavLink>
                        </li>
                        <li className="nav-link menu-icon">
                            <NavLink to="/admin/addcase">
                                <i className='far fa-file-pdf icon'/>
                                <span className="accordion-header text">REPORTS</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default SideBarComponent;
