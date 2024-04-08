"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const playerID = uuidv4()

    function blockMainThread(milliseconds) {
        const startTime = Date.now();
        while (Date.now() - startTime < milliseconds) {
            // Do some computational work to keep the CPU busy
            // This can be a simple loop or any other computationally intensive task
            let i = 0;
            while (i < 1000000) {
                i++;
            }
        }
    }

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

    function signUp() {
        var data = {
            "Username": username,
            "Email": email,
            "Password": password,
            "PlayerID": playerID
        };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Invalid Username, email or Password');
                }
                return response.json();
            })
            .then(data => {
                console.log('Registration successful:', data);
                login();
            })
            .catch(error => {
                console.error('Registration error:', error.message);
            });
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
                    <h2>Registration</h2>
                    <form action="#">
                        <div className={styles.input_box}>
                            <span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                            <input type="text" required onChange={e => setUsername(e.target.value)} />
                            <label>Username</label>
                        </div>
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
                            <label><input type="checkbox" />I agree to the terms and conditions</label>

                        </div>
                        <button type="submit" className={styles.btn} onClick={signUp} >Register</button>
                        <div className={styles.login_register}>
                            <p>Already have an account?&nbsp;
                                <a href="/loginPage" className={styles.login_link}>Login</a>
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

