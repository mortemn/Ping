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
          <Link href="/loginPage">
            <button className={styles["btn"]}>LOG IN</button>
          </Link>
          <Link href = "">
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
          </div>
          <div className={styles["right-panel"]}>
            <Link href="/roomPage">
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
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </body>
  );
};

export default HomePage;
