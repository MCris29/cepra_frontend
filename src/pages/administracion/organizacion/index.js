import React from "react";
import withAuth from "@/hocs/withAuth";
import OrganizationList from "@/components/OrganizationList";

const Organization = () => {
  return (
    <>
      <OrganizationList />
    </>
  );
};

export default withAuth(Organization);
