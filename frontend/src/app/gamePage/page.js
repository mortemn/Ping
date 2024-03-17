import Image from "next/image";
import styles from "./page.module.css";
import { Map } from "@/components/map";

export default function Home() {
    return (            
        <body>
            {/* <Map/> */}
            <header style={{ backgroundColor: 'transparent'}}>
                <div className={styles.header_widgets}>
                    <button className={styles.dropdown}>Players Caught ▾</button>
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