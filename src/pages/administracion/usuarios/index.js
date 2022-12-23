import React from "react";
import withAuth from "@/hocs/withAuth";
import UserList from "@/components/UserList";

const Users = () => {
  return (
    <>
      <UserList />
    </>
  );
};

export default withAuth(Users);
