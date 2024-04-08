import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return ( 	
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{color: 'red'}}>I</span>NG</h2>
                <nav className={styles.navigation}>
                    <button className={styles.btnhome}>Home</button>
                </nav>
            </header>

            <div className={styles.container}>
                <p className={styles.text}>Please select room type</p>
                <div className={styles.btns}>
                    <a href="roompage2.html"><button className={styles.btn}>Host a Game</button></a>
                    <button className={styles.btn}>Join a Game</button>
                </div>
            </div>
        </body>
    );
}