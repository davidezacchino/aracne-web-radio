import {component$} from "@builder.io/qwik";
import AudioController from "~/components/audio/audio-controller";
import styles from './footer.module.scss'

export default component$(() => {
    return (
        <footer class={styles.footer}>
            <AudioController/>
        </footer>
    );
});
