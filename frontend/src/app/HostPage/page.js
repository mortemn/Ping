"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {

    const [players, setPlayers] = useState(0)
    const [duration, setDuration] = useState(0)
    const [map, setMap] = useState('UOM Campus')

    async function clickHandler() {
        try {
            const res = await fetch(`http://localhost:8080/createRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: "1"
                })
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{ color: 'red' }}>I</span>NG</h2>
                <nav className={styles.navigation}>
                    <button className={styles.btnhome}>Home</button>
                </nav>
            </header>

            <div className={styles.wrapper}>
                <div className={styles.btns}>
                    <h3>Seekers</h3>
                    <div className={styles.options_container}>
                        <input type="radio" id="option4" name="line2" value="option4" className={styles.radio_input} onClick={() => setPlayers(1)} />
                        <label for="option4" className={styles.radio_label}>1</label>

                        <input type="radio" id="option5" name="line2" value="option5" className={styles.radio_input} onClick={() => setPlayers(2)} />
                        <label for="option5" className={styles.radio_label}>2</label>

                        <input type="radio" id="option6" name="line2" value="option6" className={styles.radio_input} onClick={() => setPlayers(3)} />
                        <label for="option6" className={styles.radio_label}>3</label>
                    </div>

                    <h3>Duration of each round(mins)</h3>
                    <div className={styles.options_container}>
                        <input type="radio" id="option7" name="line3" value="option7" className={styles.radio_input} onClick={() => setDuration(1)} />
                        <label for="option7" className={styles.radio_label}>15</label>

                        <input type="radio" id="option8" name="line3" value="option8" className={styles.radio_input} onClick={() => setDuration(2)} />
                        <label for="option8" className={styles.radio_label}>30</label>

                        <input type="radio" id="option9" name="line3" value="option9" className={styles.radio_input} onClick={() => setDuration(3)} />
                        <label for="option9" className={styles.radio_label}>45</label>
                    </div>

                    <h3>Map</h3>
                    <div className={styles.dropdown_container}>
                        <select name="dropdown" id="dropdown" className={styles.dropdown} onChange={e => setMap(e.target.options[e.target.selectedIndex].text)}>
                            <option value="optionB" >UoM Campus</option>
                            <option value="optionC" >Whitworth Park</option>
                        </select>
                    </div>
                    <button className={styles.btn} onClick={clickHandler} >Start Game</button>
                </div>
            </div>

        </body>
    );
}
