import React from "react";
import styles from "@/styles/Contacs.module.css";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import ErrorInformation from "./ErrorInformation";
import LoadingInformation from "./LoadingInformation";

const ContactList = (props) => {
  const { data, error } = useSWR(
    `it/contactosOrganizacion/${props.ruc}`,
    fetcher
  );

  if (error) return <ErrorInformation />;
  if (!data) return <LoadingInformation />;

  return (
    <>
      <h4>Contactos de {props.organization}</h4>

      <div className={styles.contacts}>
        {data.data.map((contact, index) => (
          <div key={index} className={styles.card}>
            <div>
              <strong>{contact.itcon_nombre}</strong>
              <div>
                <span>{contact.itcon_nivel_estudios}</span>
              </div>
            </div>
            <div>
              <div>
                <strong>correo: </strong>
                {contact.itcon_email}
              </div>
              <div>
                <strong>Nivel de decisión: </strong>
                {contact.itcon_nivel_decision}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactList;
