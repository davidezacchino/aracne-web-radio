import {component$} from "@builder.io/qwik";
import styles from './spider.module.scss'

export default component$(() => {
    return (
        <div class={styles.spider}>
            <div class={styles.spiderweb}></div>
            <div class={styles.body}>
                <div class={[styles.eye, styles.left]}></div>
                <div class={[styles.eye, styles.right]}></div>
            </div>
            <div class={[styles.legs, styles.left]}>
                <div class={styles.leg}></div>
                <div class={styles.leg}></div>
                <div class={styles.leg}></div>
            </div>
            <div class={[styles.legs, styles.right]}>
                <div class={styles.leg}></div>
                <div class={styles.leg}></div>
                <div class={styles.leg}></div>
            </div>
        </div>
    )
});