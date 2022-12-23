import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";

import withAuth from "@/hocs/withAuth";

import { StaticGraphics } from "@/lib/staticGraphic";
import DeleteStaticGraphic from "@/components/DeleteStaticGraphic";
import LoadingInformation from "@/components/LoadingInformation";

const AdminGraphics = () => {
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
  };

  return (
    <>
      {newData ? (
        <div className="main-admin-content">
          {newData.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="paragraph">No existen gráficos estáticos</p>
            </div>
          ) : (
            <div>
              {newData.map((item, index) => (
                <div key={index}>
                  <div>
                    <h5 className="subtitle">{item.itegr_titulo}</h5>
                    <p className="paragraph">{item.itegr_observacion}</p>
                    <img src={item.itegr_url} style={{ width: "100%" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "12px",
                    }}
                  >
                    <div>
                      <DeleteStaticGraphic
                        id={item.itegr_codigo}
                        title={item.itegr_titulo}
                        refresh={handleRefresh}
                      />
                    </div>
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
};

export default withAuth(AdminGraphics);
