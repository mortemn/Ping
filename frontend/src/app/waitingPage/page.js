import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return ( 	
        <body>
            <header>
                <h2 className={styles.logo}>
                    <span>P</span>
                    <span style={{color: 'red'}}>I</span>
                    <span>N</span>
                    <span>G</span>
                </h2>
            </header>
            {/* <ion-icon
                name="location"
                className={styles["location-icon"]}
            ></ion-icon> */}

            <div className={styles.text_container}>
                <span className= {styles.title}>Players Joining, Please Wait.</span>
                <span className= {styles.title}>Game Starting Soon...</span>
                <button className= {styles.btn} type="submit" disabled>display number of players joined</button>
            </div>
            {/* <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> */}
        </body>
    );
}