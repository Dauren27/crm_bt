import React, { useContext } from "react";
import cl from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers";

const Sidebar = () => {
  
  const dispatch = useDispatch();
  const { sidebarOpen, setSidebarOpen } = useContext(GlobalContext);
  const clickHandler = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className={`${cl.sidebar} ${sidebarOpen && cl.sidebar__open}`}>
        <div className={cl.sidebar__dashboard}>
          <h1>Dashboard</h1>
        </div>
        {sidebarOpen && (
          <CloseOutlined
            className={sidebarOpen && cl.sidebar__closeBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        <div className={cl.sidebar__menu}>
          <h2 className={cl.sidebar__menu__title}>MY STORE</h2>
          <ul className={cl.sidebar__menu__links}>
            <li>
              <NavLink
                exact="true"
                to="/documents"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Документы на КК</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                to="/companies"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Компании</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                to="/counterparties"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>ЧП/ИП</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                to="/recipients"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Поручители</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                to="/properties"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Залоговые имущества</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                to="/conversations"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Переговоры</span>
              </NavLink>
            </li>
            <li>
              <a onClick={() => dispatch(logout())}>Выйти</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
