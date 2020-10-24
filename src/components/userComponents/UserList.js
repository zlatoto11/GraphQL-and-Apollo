import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import * as Constants from "../../constants";
import "../CSSFiles/UserList.css";

//Filtering the users to only display people who have the right
//permissions to create a customer
const filterUsersByPermissions = (users, createCustomer) => {
  return users.filter(
    (user) => user.permissions.createCustomer === createCustomer
  );
};

// Formatting of User Roles.
const capitalizeLetters = (userRole) => {
  var lowercasedRoles = userRole
    .toString()
    .toLowerCase()
    .split(",");
  lowercasedRoles = lowercasedRoles.map((role) => {
    return role[0].toUpperCase() + role.substring(1);
  });
  var finalizedRoles = lowercasedRoles.join(", ");
  return finalizedRoles;
};

export default class userList extends Component {
  state = {
    users: [],
  };

  //fetching initial data of all users on page mount
  async componentDidMount() {
    const res = await axios.post(Constants.GRAPHQL_API, {
      query: Constants.GET_ALL_USERS_QUERY,
    });
    console.log(res);

    this.setState({ users: res.data.data.users });
    console.log(this.state.users);
  }

  //changing data based on user role select
  async changeData() {
    var userRole = document.getElementById("selectUserRole").value;
    const res = await axios.post(Constants.GRAPHQL_API, {
      query: Constants.FILTER_USERS_BY_ROLE,
      variables: { userRole: userRole },
    });
    this.setState({ users: res.data.data.users });
    var isItChecked = document.getElementById("checkbox");
    isItChecked.checked = false;
  }

  //toggling permissions based filtering
  async permissionToggle() {
    //get toggle state
    var isItChecked = document.getElementById("checkbox").checked;
    if (isItChecked) {
      this.setState({
        users: filterUsersByPermissions(this.state.users, true),
      });
    } else {
      this.changeData();
    }
    console.log(isItChecked);
  }

  render() {
    return (
      <div className="UserList__container">
        <h1 className="UserList__containerTitle">User Management</h1>
        <div className="UserList__selectContainer">
          <div className="UserList__UserSelect">
            {/* Choosing a user using the select options */}
            <label htmlFor="selectUserRole">User Role: </label>
            <select
              className="UserList__selectButton"
              id="selectUserRole"
              onChange={() => this.changeData()}
            >
              <option value="">All Users</option>
              <option value="ADMIN">Admin</option>
              <option value="BROKER">Broker</option>
              <option value="ADVISOR">Advisor</option>
            </select>
          </div>

          {/* Switch to determine filtering for permissions*/}
          <div className="UserList__permissionSelect">
            <label htmlFor="checkbox">Filter by permissions: </label>
            <label className="switch">
              <input
                type="checkbox"
                id="checkbox"
                value="true"
                onClick={() => this.permissionToggle()}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>

        {/* Displaying the table  */}
        <div className="UserList__tableContainer">
          <div className="UserList__tableTitle">
            <h2>
              User <b>Database</b>
            </h2>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>User Role</th>
                <th>Created at</th>
                <th>User Permissions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) =>
                user.name ? (
                  <tr key={user.name}>
                    <td>{user.name}</td>
                    <td>{capitalizeLetters(user.role)}</td>
                    <td>
                      {user.createdAt ? user.createdAt : "Date not available."}
                    </td>
                    <td>
                      {user.permissions.createCustomer && (
                        <button type="button">
                          <span className="UserList__buttonStyle">
                            Create Customer
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  " "
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
