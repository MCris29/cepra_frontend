import React from "react";
import Routes from "@/constants/routes";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";
import UserList from "@/components/UserList";

const Users = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    if (user.roles[0].itrol_codigo == 1) {
      return <UserList />;
    } else {
      router.push(Routes.PROFILE);
    }
  }
};

export default withAuth(Users);
