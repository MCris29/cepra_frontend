import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";

import { StaticGraphics } from "@/lib/staticGraphic";
import DeleteStaticGraphic from "@/components/DeleteStaticGraphic";
import LoadingInformation from "@/components/LoadingInformation";

export default function AdminGraphics() {
  const router = useRouter();
  const { id } = router.query;

  const [newData, setNewData] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      StaticGraphics.getById(id).then((response) => {
        if (response.data.data) {
          // Carga de datos
          setNewData(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [id, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    console.log("cambio", refresh);
  };

  return (
    <>
      {newData ? (
        <div>
          {newData.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No existen gráficos estáticos
            </div>
          ) : (
            <div>
              {newData.map((item, index) => (
                <div key={index}>
                  <div>
                    <DeleteStaticGraphic
                      id={item.itegr_codigo}
                      title={item.itegr_titulo}
                      refresh={handleRefresh}
                    />
                  </div>
                  <div>
                    <h5>{item.itegr_titulo}</h5>
                    <p>{item.itegr_observacion}</p>
                    <img src={item.itegr_url} />
                  </div>
                  <Divider sx={{ margin: "40px 0" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingInformation />
      )}
    </>
  );
}
