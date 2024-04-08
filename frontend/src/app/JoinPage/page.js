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

            <form className={styles.form}>
                <span className= {styles.title}>Enter Room Code</span>
                <div className= {styles.input_container}>
                    <input type="text" maxlength="1" required />
                    <input type="text" maxlength="1" required />
                    <input type="text" maxlength="1" required />
                    <input type="text" maxlength="1" required />
                </div>
                <button className= {styles.btn} type="submit" disabled>Join</button>
            </form>
        </body>
    );
}