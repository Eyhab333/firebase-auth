import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="myheader">
      <header className="hide-when-mobile ali">
        <h1>
          <Link to="/">AF</Link>
        </h1>
        {/* <button
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="theme-btn"
        >
          {theme}
        </button> */}

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/signin");
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              }}
              className="main-list"
            >
              <button className="main-link sign-out">Sign-out</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/html">
                HTML
              </NavLink>
              <ul className="sub-ul">
                <li>
                  <p>Full Course</p>
                </li>
                <li>
                  <p>Crash Course</p>
                </li>
                <li>
                  <p>learn in 1h</p>
                </li>
              </ul>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                Profile
              </NavLink>
              
            </li>
          )}
        </ul>
      </header>

      <header className="show-when-mobile ali">
        <h1>c4a.dev</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/html">Full Course</NavLink>
              </li>
              <li>
                <p>Crash Course</p>
              </li>
              <li>
                <p>learn in 1h</p>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/css">Full Course</NavLink>
              </li>
              <li>
                <p>CSS Examples</p>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <p>project 1</p>
                  </li>
                  <li>
                    <p>project 2</p>
                  </li>
                  <li>
                    <p>project 3</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/javascript">coming soon🔥</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
