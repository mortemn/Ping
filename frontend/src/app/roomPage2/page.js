import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return ( 	
        <body>
            <header>
                <h2 className={styles.logo}>P<span style={{color: 'red'}}>I</span>NG</h2>
                <nav className={styles.navigation}>
                    <button className={styles.btnhome}>Home</button>
                </nav>
            </header>
        
            <div className={styles.wrapper}>
                <div className={styles.btns}>
                    <h3>Rounds</h3> 
                    <div className={styles.options_container}>
                        <input type="radio" id="option1" name="line1" value="option1" className={styles.radio_input}/>
                        <label for="option1" className={styles.radio_label}>1</label>
                    
                        <input type="radio" id="option2" name="line1" value="option2" className={styles.radio_input}/>
                        <label for="option2" className={styles.radio_label}>2</label>
                    
                        <input type="radio" id="option3" name="line1" value="option3" className={styles.radio_input}/>
                        <label for="option3" className={styles.radio_label}>3</label>
                    </div>
                
                    <h3>Players</h3>
                    <div className={styles.options_container}>
                        <input type="radio" id="option4" name="line2" value="option4" className={styles.radio_input}/>
                        <label for="option4" className={styles.radio_label}>4</label>
                    
                        <input type="radio" id="option5" name="line2" value="option5" className={styles.radio_input}/>
                        <label for="option5" className={styles.radio_label}>8</label>
                    
                        <input type="radio" id="option6" name="line2" value="option6" className={styles.radio_input}/>
                        <label for="option6" className={styles.radio_label}>12</label>
                    </div>
        
                    <h3>Duration of each round</h3>
                    <div className={styles.options_container}>
                        <input type="radio" id="option7" name="line3" value="option7" className={styles.radio_input}/>
                        <label for="option7" className={styles.radio_label}>10mins</label>
                    
                        <input type="radio" id="option8" name="line3" value="option8" className={styles.radio_input}/>
                        <label for="option8" className={styles.radio_label}>20mins</label>
                    
                        <input type="radio" id="option9" name="line3" value="option9" className={styles.radio_input}/>
                        <label for="option9" className={styles.radio_label}>30mins</label>
                    </div>
                    
                    <h3>Map</h3>
                    <div className={styles.dropdown_container}>
                        <select name="dropdown" id="dropdown" className={styles.dropdown}>
                            <option value="optionA">Oxford Road</option>
                            <option value="optionB">UoM Campus</option>
                            <option value="optionC">Whitworth Park</option>
                        </select>
                    </div>
                    <button className={styles.btn}>Start Game</button>
                </div>
            </div>
            
        </body>
    );
}