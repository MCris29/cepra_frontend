import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Footer() {
    return (
        <div>
            <div className={styles.container}>
                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Copyright © 2022 Todos los derechos reservados
                        {/*<span className={styles.logo}>*/}
                        {/*    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
                        {/*</span>*/}
                    </a>
                </footer>
            </div>
        </div>
    );
}
