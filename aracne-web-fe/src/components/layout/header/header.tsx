import {component$} from "@builder.io/qwik";
import styles from "./header.module.scss";
import AracneLogo from "~/media/logo.png?jsx";
import {Link, useLocation} from "@builder.io/qwik-city";

export default component$(() => {
    const {url} = useLocation();

    return (
        <header class={styles.header}>
            <div class={["container", styles.wrapper]}>
                <div class={styles.logo}>
                    <Link href="/">
                        <AracneLogo loading={'eager'}/>
                    </Link>
                </div>
                <ul>
                    <li>
                        <Link href={"/contact-us"}>Contattaci</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
});
