import React, { useState, useEffect } from "react";

import { StaticGraphics } from "@/lib/staticGraphic";

const DashboardGraphics = (props) => {
  const [newData, setNewData] = useState();
  const [id, setId] = useState(props.id);

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
  }, []);

  return (
    <>
      {newData ? (
        <div>
          {newData.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No existen gráficos estáticos
            </div>
          ) : (
            <div style={{ paddingLeft: "4em" }}>
              <div>
                {newData.map((item, index) => (
                  <div key={index}>
                    <h5>{item.itegr_titulo}</h5>
                    <p>{item.itegr_observacion}</p>
                    <img src={item.itegr_url} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default DashboardGraphics;
