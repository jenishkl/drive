import React, {useState} from 'react';
import './sidebarright.css';

const SideBarRightComponent = () => {

    const [rSidebar, setRSidebar] = useState(false)

    let body = document.querySelector('body');
    let home = document.querySelector('main');
    let openLogo = document.querySelector('.open-logo');
    let darkLogo = document.querySelector('.dark-logo');
    let sidebarRight = document.querySelector('#navbar-right');
    let toggleRight = document.querySelector("#toggle-close");
    let toggleOpenRight = document.querySelector("#toggle-open");
    let themeList = document.querySelector(".theme-list");
    let modeText = document.querySelector(".mode-text");


    const sidebarOpen = () => {
        setRSidebar(true)
        console.log(sidebarRight);
        sidebarRight.classList.remove("close");
        toggleRight.classList.add("hidden");
        toggleOpenRight.classList.remove("hidden");
        themeList.classList.remove("hidden");
    }
    const sidebarClose = () => {
        setRSidebar(false)
        sidebarRight.classList.add("close");
        toggleRight.classList.remove("hidden");
        toggleOpenRight.classList.add("hidden");
        themeList.classList.add("hidden");
    }
    const switchMode = () => {
        console.log(openLogo);
        body.classList.remove("dark-pink-theme");
        body.classList.remove("orange-theme");
        body.classList.remove("iris-theme");
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
            if (home.classList.contains("opened-Home")) {
                openLogo.classList.add('hidden');
                darkLogo.classList.remove('hidden');
            }
        } else {
            modeText.innerText = "Dark mode";
            if (home.classList.contains("opened-Home")) {
                openLogo.classList.remove('hidden');
                darkLogo.classList.add('hidden');
            }
        }
    }
    const purpleTheme = () => {
        let body = document.body;
        body.classList.add("purple-theme");
        body.classList.remove("orange-theme");
        body.classList.remove("iris-theme");
        body.classList.remove("pink-theme");
        body.classList.remove("teal-theme");
        body.classList.remove("green-theme");
    }

    const orangeTheme = () => {
        let body = document.body;
        body.classList.add("orange-theme");
        body.classList.remove("purple-theme");
        body.classList.remove("iris-theme");
        body.classList.remove("pink-theme");
        body.classList.remove("teal-theme");
        body.classList.remove("green-theme");
    }

    const irisTheme = () => {
        let body = document.body;
        body.classList.add("iris-theme");
        body.classList.remove("purple-theme");
        body.classList.remove("orange-theme");
        body.classList.remove("pink-theme");
        body.classList.remove("teal-theme");
        body.classList.remove("green-theme");
    }
    const pinkTheme = () => {
        let body = document.body;
        body.classList.remove("iris-theme");
        body.classList.remove("purple-theme");
        body.classList.remove("orange-theme");
        body.classList.add("pink-theme");
        body.classList.remove("teal-theme");
        body.classList.remove("green-theme");
    }
    const tealTheme = () => {
        let body = document.body;
        body.classList.remove("iris-theme");
        body.classList.remove("purple-theme");
        body.classList.remove("orange-theme");
        body.classList.remove("pink-theme");
        body.classList.add("teal-theme");
        body.classList.remove("green-theme");
    }
    const greenTheme = () => {
        let body = document.body;
        body.classList.remove("iris-theme");
        body.classList.remove("purple-theme");
        body.classList.remove("orange-theme");
        body.classList.remove("pink-theme");
        body.classList.remove("teal-theme");
        body.classList.add("green-theme");
    }

    return (
        <nav className="sidebar-right close" id="navbar-right">
            <header>
                <div className="image-text d-flex justify-content-between">
                    <div className="text logo-text">
                        <span className="name">Customize</span>
                    </div>
                    <button type="button" className="btn close-btn" onClick={sidebarClose}>X</button>
                </div>
                {/*<div className="toggle-icon-box">*/}
                {/*    <i className='far fa-cog rotate toggle hidden' id="toggle-open" onClick={sidebarClose}/>*/}
                {/*    <i className='far fa-cog rotate toggle' id="toggle-close" onClick={sidebarOpen}/>*/}
                {/*</div>*/}

                {rSidebar && <div className="toggle-icon-box" onClick={sidebarClose}>
                    <i className='far fa-cog rotate toggle hidden' id="toggle-open"/>
                    <i className='far fa-cog rotate toggle' id="toggle-close"/>
                </div>}
                {!rSidebar && <div className="toggle-icon-box" onClick={sidebarOpen}>
                    <i className='far fa-cog rotate toggle hidden' id="toggle-open"/>
                    <i className='far fa-cog rotate toggle' id="toggle-close"/>
                </div>}

            </header>
            <div className="menu-bar closed-menubar" id="menuBar-right">
                <div className="menu">
                    <ul className="menu-links ps-0">
                        <li className="mode menu-icon">
                            <div className="sun-moon">
                                <i className='bx bx-moon icon moon'/>
                                <i className='bx bx-sun icon sun'/>
                            </div>
                            <span className="mode-text text">Dark mode</span>
                            <div className="toggle-switch">
                                <span className="switch switch1" onClick={switchMode}/>
                            </div>
                        </li>
                        <li className="theme">
                            <a className="mb-2">
                                <i className='bx bx-wallet icon'/>
                                <span className="text nav-text">Themes</span>
                            </a>
                            <div className="d-flex justify-content-around theme-list">
                    <span className="theme-item">
                        <button className="btn purple" onClick={purpleTheme}/>
                            </span>
                                <span className="theme-item">
                        <button className="btn orange" onClick={orangeTheme}/>
                        </span>
                                <span className="theme-item">
                        <button className="btn iris" onClick={irisTheme}/>
                    </span>
                            </div>
                            <div className="d-flex justify-content-around theme-list">
                    <span className="theme-item">
                        <button className="btn pink-medium" onClick={pinkTheme}/>
                </span>
                                <span className="theme-item">
                        <button className="btn teal" onClick={tealTheme}/>
            </span>
                                <span className="theme-item">
                        <button className="btn green-dark" onClick={greenTheme}/>
        </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default SideBarRightComponent;