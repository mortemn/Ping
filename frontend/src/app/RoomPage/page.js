import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
    return ( 	
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{color: 'red'}}>I</span>NG</h2>
                <nav className={styles.navigation}>
                    <Link href = "./">
                        <button className={styles.btnhome}>Home</button>
                    </Link>
                </nav>
            </header>

            <div className={styles.container}>
                <p className={styles.text}>Please select room type</p>
                <div className={styles.btns}>
                    <Link href = "/HostPage">
                        <button className={styles.btn}>Host a Game</button>
                    </Link>
                    <Link href = "/JoinPage">
                        <button className={styles.btn}>Join a Game</button>
                    </Link>
                </div>
            </div>
        </body>
    );
}