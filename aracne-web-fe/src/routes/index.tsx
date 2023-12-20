import {component$} from "@builder.io/qwik";
import Spider from "~/ui/spider/spider";
import AracneLogo from "~/media/logo.png?jsx";
import styles from "./home.module.scss";

export default component$(() => {


    return (
        <>
            <Spider/>
            <AracneLogo loading="eager" class={styles.aracneLogo}/>
        </>
    );
});
