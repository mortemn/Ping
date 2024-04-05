"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {


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
                    <h2>Registration</h2>
                    <form action="#">
                    <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                            <input type="text" required />
                            <label>Username</label>
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="mail"></ion-icon></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className={styles.remember_forgot}>
                            <label><input type="checkbox" />I agree to the terms and conditions</label>
                            
                        </div>
                        <button type="submit" className={styles.btn} >Login</button>
                        <div className={styles.login_register}>
                            <p>Already have an account?&nbsp;
                                <a href="#" className={styles.login_link}>Login</a>
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

