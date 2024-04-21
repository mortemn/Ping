import styles from "./page.module.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <body>
      <header>
        <h2 className={styles["logo"]}>
          P<span className={styles["red-letter"]}>I</span>NG
        </h2>
        <nav className={styles["navigation"]}>
          <button className={styles["btn"]}>LOG OUT</button>
          <button className={styles["btn"]}>ACCOUNT</button>
        </nav>
      </header>
      <main>
        <div className={styles["top-container"]}>
          <div className={styles["left-panel"]}>
            <p>
              P<span className={styles["red-letter-2"]}>I</span>NG, a large area
              game
              <br />
              of hide and seek in the
              <br />
              University of <br />
              Manchester
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
            <Link href="/roomPage1">
              <button className={styles["start-game-btn"]}>START GAME</button>
            </Link>
          </div>
        </div>
        <div className={styles["bottom-container"]}>
          <div className={styles["leaderboards-title"]}>LEADERBOARDS</div>
          <div className={styles["leaderboards-body"]}>
            <div>
              TOP SEEKERS
            </div>
            <div>
              TOTAL WINS
            </div>
            <div>
              TOP HIDERS
            </div>
          </div>
        </div>
      </main>
      <footer>
        <button className={styles["btn"]}>button</button>
      </footer>
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