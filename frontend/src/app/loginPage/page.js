"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function clickHandler() {
        console.log(email)
        console.log(password)
        // query server endpoint using JSON
    }

    return (
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{ color: 'red' }}>I</span>NG</h2>
                <h2 className={styles.ttl}>A hide and seek game</h2>
                <nav className={styles.navigation}>
                    <button className={styles.btnlogin}>Login</button>
                </nav>
            </header>

            <div className={styles.wrapper}>
                <div className={styles.form_box}>
                    <h2>Login</h2>
                    <form action="#">
                        <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
                            <input type="email" required onChange={e => setEmail(e.target.value)} />
                            <label>Email</label>
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" required onChange={e => setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>
                        <div className={styles.remember_forgot}>
                            <div>
                                <label><input type="checkbox"/>Remember me</label>
                            </div>
                            <div>
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn} onClick={clickHandler}>Login</button>
                        <div className={styles.login_register} >
                            <p>Don&apos;t have an account?&nbsp;
                                <a href="#" className={styles.register_link}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>



        </body>
    );
}

