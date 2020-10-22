import React, { Component } from "react";
import UserList from "../userComponents/UserList";
export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <UserList />
      </React.Fragment>
    );
  }
}
