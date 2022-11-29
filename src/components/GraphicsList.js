import React, { useState, useEffect } from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { StaticGraphics } from "@/lib/staticGraphic";
import LoadingInformation from "@/components/LoadingInformation";

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
            <div className={styles.container_static_graphic}>
              <div>
                {newData.map((item, index) => (
                  <div key={index}>
                    <div className="subtitle">{item.itegr_titulo}</div>
                    <p className="paragraph">{item.itegr_observacion}</p>
                    <img src={item.itegr_url} className={styles.img_graphic} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingInformation />
      )}
    </>
  );
};

export default DashboardGraphics;
