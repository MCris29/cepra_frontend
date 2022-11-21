import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src="/Logo propuestavf-02.png" height={150} width={560} />
    </div>
  );
}
