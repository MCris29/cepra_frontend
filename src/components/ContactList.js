import React from "react";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const ContactList = () => {
  const { data, error } = useSWR("it/itcontacto/", fetcher);
  console.log("data", data);

  if (error) return <>Error</>;
  if (!data) return <>Cargando...</>;

  return (
    <>
      Contactos
      {data.contactos.map((contact, index) => (
        <div key={index}>
          {contact.itcon_codigo +
            " - " +
            contact.itcon_nombre +
            " - " +
            contact.itcon_email +
            " - " +
            contact.itcon_nivel_decision +
            " - " +
            contact.itcon_nivel_estudios}
        </div>
      ))}
    </>
  );
};

export default ContactList;
