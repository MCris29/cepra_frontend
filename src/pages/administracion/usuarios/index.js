import React from "react";
import Routes from "@/constants/routes";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";
import UserList from "@/components/UserList";
import UserForm from "@/components/UserForm";

const Users = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    if (user.roles[0].itrol_codigo == 1) {
      return (
        <>
          <div className="main-admin-content">
            <UserForm />
          </div>
          <Divider sx={{ margin: "40px 0" }} />
          <UserList />
        </>
      );
    } else {
      router.push(Routes.PROFILE);
    }
  }
};

export default withAuth(Users);
