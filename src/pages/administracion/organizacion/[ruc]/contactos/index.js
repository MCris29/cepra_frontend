import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Organizations } from "@/lib/organization";

import ContactList from "@/components/ContactList";

export default function Contacts() {
  const router = useRouter();
  const { ruc } = router.query;

  const [organization, setOrganization] = useState("");

  useEffect(() => {
    try {
      Organizations.getById(ruc)
        .then((response) => {
          if (response.data.data) {
            setOrganization(response.data.data.itorg_nombre);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.error("error");
    }
  }, [ruc]);

  return <ContactList ruc={ruc} organization={organization} />;
}
