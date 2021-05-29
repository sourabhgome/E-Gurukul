import React, { Component, useContext } from "react";
import {
  MDBNavbar,
  MDBLink,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  console.log("Header : ", userData);
  const logout = () => {
    console.log("Logout user chala");
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };
  return (
    <MDBNavbar className="aqua-gradient" color="info-color" dark expand="md" style={{ marginTop: "0px" }}>
      <MDBNavbarBrand>
        <MDBLink to="/">
          <strong className="white-text">
            <i class="fab fa-audible"></i> E-Gurukul
          </strong>
        </MDBLink>
      </MDBNavbarBrand>
      <MDBNavbarNav right>
        {userData.user ? (
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" className="mr-1" />
                Profile
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <MDBDropdownItem>
                  <MDBIcon icon="user-alt" /> My account
                </MDBDropdownItem>
                <MDBDropdownItem onClick={logout}>
                  <MDBIcon icon="sign-out-alt" /> Log out
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        ) : (
          <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="/login">
              <MDBIcon className="mr-1" />
              Login
            </MDBNavLink>
          </MDBNavItem>
        )}
      </MDBNavbarNav>
    </MDBNavbar>
  );
}
