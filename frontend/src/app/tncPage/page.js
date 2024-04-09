
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

    return (
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{ color: 'red' }}>I</span>NG</h2>
                <h2 className={styles.ttl}>A hide and seek game</h2>
                <nav className={styles.navigation}>
                    <Link href = "/loginPage">
                        <button className={styles.btnlogin}>Login</button>
                    </Link>
                </nav>
            </header>

            <div className={styles.wrapper}>
                    <h2>Terms and Conditions</h2>
                    <div className={styles.tncText}>
                        1. Consent to Location Tracking<br/>
                        - By agreeing to participate in Ping, you consent to provide access to your precise location and coordinates during the duration of the game.<br/>
                        - This information will only be used for the purpose of gameplay and wll be discarded from the server after the game ends.<br/>
                        2. Boundaries and Safety<br/>
                        - Participants agree that indoor buildings are strictly out of bounds for the game.<br/>
                        - Participants also consent to be responsible for their own safety throughout the game.<br/>
                        3. Traffic and Access Rules<br/>
                        - Participants agree to abide by all traffic rules and general access restriction rules on the university cam pus where the game is taking place.<br/>
                        4. Code of Conduct<br/>
                        - Participants are expected to conduct themselves in a sportsmanlike manner throughout the duration of the game.<br/>
                        5. Liability<br/>
                        - While every effort is made to ensure the safety of participants, the organizers of Ping cannot be held liable for any accidents, <br/>
                        injuries, or damages that may occur during the course of the game.<br/>
                        6. Have fun!<br/>
                    </div>
                    <Link href = "./registrationPage">
                        <button className={styles.btn}>Back</button>
                    </Link>
            </div>
        </body>
    );
}