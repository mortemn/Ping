import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return ( 	
        <body>
            <header>
                <div className={styles.dropdown}>
                    <button className={styles.players}>Players Caught ▾</button>
                    <div className={styles.dropdown_options}>
                        <a>Player1</a>
                        <a>Player2</a>
                        <a>Player3</a>
                    </div>
                </div>
                <div className={styles.countdown}>14:39</div>
            </header>
            <button className={styles.button}>!</button>
        </body>
    );
}