import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <body>
            <header>
                <h2 class="logo">P<span style="color: red">I</span>NG</h2>
                <h2 class="ttl">A hide and seek game</h2>
                <nav class="navigation">
                    <button class="btnlogin">Login</button>
                </nav>
            </header>

            <div class="wrapper">
                <div class="form-box login">
                    <h2>Login</h2>
                    <form action="#">
                        <div class="input-box">
                            <span class="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox">Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" class="btn">Login</button>
                        <div class="login-register">
                            <p>Don't have an account?
                                <a href="#" class="register-link">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <script src="script.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>



        </body>
    );
}

