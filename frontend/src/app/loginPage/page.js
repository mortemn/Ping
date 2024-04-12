"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const playerID = uuidv4();

  const submit = async (e) => {
    e.preventDefault();
    var data = {
      Email: email,
      Password: password,
      PlayerID: playerID,
    };

    try {
      await fetch("http://localhost:3002", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      localStorage.setItem('token', token);
      const { token } = data.json();
      // get cookie when logged in

      await router.push("/profilePage");
    } catch (error) {
      console.error("Registration error: ", error.message);
    }
  };

  return (
    <body>
      <header>
        <h2 className={styles.logo}>
          P<span style={{ color: "red" }}>I</span>NG
        </h2>
        <h2 className={styles.ttl}>A hide and seek game</h2>
        <nav className={styles.navigation}>
          <Link href="./">
            <button className={styles.btnlogin}>Home</button>
          </Link>
        </nav>
      </header>

      <div className={styles.wrapper}>
        <div className={styles.form_box}>
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className={styles.input_box}>
              <span className={styles.icon}>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.input_box}>
              <span className={styles.icon}>
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.remember_forgot}>
              <div>
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div>
                <a href="#">Forgot Password?</a>
              </div>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <div className={styles.login_register}>
              <p>
                Don&apos;t have an account?&nbsp;
                <a href="/RegistrationPage" className={styles.register_link}>
                  Register
                </a>
              </p>
            </div>
          </form>
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
}
