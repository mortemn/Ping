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

            <div className={styles.wrapper}>
                <h1 className={styles.title}>Score Board</h1>
                <div className={styles.scoreboard}>
                    <div className={styles.header}>
                        <div className={styles.header_item}>Player Name</div>
                        <div className={styles.header_item}>Score</div>
                    </div>
                    <div className={styles.player_list}>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player1</div>
                            <div className={styles.player_score}>1500</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player2</div>
                            <div className={styles.player_score}>1300</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player3</div>
                            <div className={styles.player_score}>1000</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player4</div>
                            <div className={styles.player_score}>800</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player5</div>
                            <div className={styles.player_score}>700</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player6</div>
                            <div className={styles.player_score}>650</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player7</div>
                            <div className={styles.player_score}>200</div>
                        </div>
                        <div className={styles.player}>
                            <div className={styles.player_name}>Player8</div>
                            <div className={styles.player_score}>50</div>
                        </div>
                    </div>
                </div>
                <button className={styles.btn}>Exit</button>
                <button className={styles.btn}>Continue</button>
            </div>
        </body>
    );
}