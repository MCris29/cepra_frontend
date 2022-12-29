import React from "react";

import { Divider } from "@mui/material";

import withAuth from "@/hocs/withAuth";
import ProfileForm from "@/components/ProfileForm";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const Profile = () => {
  return (
    <div className="main-admin-content">
      <ProfileForm />
      <Divider sx={{ margin: "40px 0" }} />
      <ResetPasswordForm />
    </div>
  );
};

export default withAuth(Profile);
