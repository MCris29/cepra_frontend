import React from "react";
import { useRouter } from "next/router";
import withAuth from "@/hocs/withAuth";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import LoadingInformation from "@/components/LoadingInformation";
import OrganizationForm from "@/components/OrganizationForm";
import ErrorInformation from "@/components/ErrorInformation";

const OrganizationId = () => {
  const router = useRouter();
  const { ruc } = router.query;

  const { data, error } = useSWR(`it/itorganizacion/${ruc}`, fetcher);

  if (!data) return <LoadingInformation />;
  if (error) return <ErrorInformation />;

  return (
    <>
      <OrganizationForm data={data.data} id={ruc} />
    </>
  );
};

export default withAuth(OrganizationId);
