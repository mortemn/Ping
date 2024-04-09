"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    function login() {
        var data = {
            "Username": username,
            "Password": password
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Invalid Username or Password');
                } else {
                    return response.json()
                }
            })
            .then(data => {
                console.log("login successful")
                const { token } = data.json();
                localStorage.setItem('token', token);
                router.push('/homePage');
            })
            .catch(error => {
                console.error('Login error:', error.message);
            });
    }


    return (
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{ color: 'red' }}>I</span>NG</h2>
                <h2 className={styles.ttl}>A hide and seek game</h2>
                <nav className={styles.navigation}>
                    <Link href = "/homePage">
                        <button className={styles.btnlogin}>Home</button>
                    </Link>
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
                                <label><input type="checkbox" />Remember me</label>
                            </div>
                            <div>
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn} onClick={login}>Login</button>
                        <div className={styles.login_register} >
                            <p>Don&apos;t have an account?&nbsp;
                                <a href="/RegistrationPage" className={styles.register_link}>Register</a>
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

