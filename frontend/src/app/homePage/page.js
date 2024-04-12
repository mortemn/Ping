import Head from "next/head";
import styles from "./page.module.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <body>
      <header className={styles["header"]}>
        <h2 className={styles["logo"]}>
          P<span className={styles["red-letter"]}>I</span>NG
        </h2>
        <nav className={styles["navigation"]}>
          <Link href="/LoginPage">
            <button className={styles["btn"]}>LOG IN</button>
          </Link>
          <Link href = "/profilePage">
            <button className={styles["btn"]}>ACCOUNT</button>
          </Link>
        </nav>
      </header>
      <div className={styles.container}>
        <div className={styles["top-container"]}>
          <div className={styles["left-panel"]}>
            <p>
              P<span className={styles["red-letter-2"]}>I</span>NG, a large area
              game
              <br />
              of hide and seek in the
              <br />
              University of Manchester
            </p>
            <div className={styles["how-to-pair"]}>
              <ion-icon
                name="location"
                className={styles["location-icon"]}
              ></ion-icon>
              <div className={styles["how-to-play"]}>HOW TO PLAY PING</div>
            </div>
            <div className={styles["instructions"]}>
              1. Host or Join a room with your friends.<br/>
              2. Hiders will hide while seekers will seek.<br/>
              3. When hiders are caught, they will be switched over to the<br/> seekers team and continue the game as seekers.<br/>
              4. The game ends when the time is up or all hiders have been caught.<br/>
              5. Hide longer to accumulate more scores;<br/> Catch more hiders to accumulate more scores.<br/>
              6. Have fun! <br/>Remember: you can run but you can&apos;t hide...<br/>
            </div>
          </div>
          <div className={styles["right-panel"]}>
            <Link href="/RoomPage">
              <button className={styles["start-game-btn"]}>START GAME</button>
            </Link>
          </div>
        </div>
        <div className={styles["bottom-container"]}>
          <div className={styles["leaderboards-title"]}>LEADERBOARDS</div>
          <div className={styles["leaderboards-body"]}>
            <div>TOP SEEKRS</div>
            <div>TOTAL WINS</div>
            <div>TOP HIDERS</div>
          </div>
        </div>
      </div>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </body>
  );
};

export default HomePage;
