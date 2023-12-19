import type {ButtonHTMLAttributes} from "@builder.io/qwik";
import {component$} from "@builder.io/qwik";
import styles from './play-button.module.scss'
import {Pause, Play} from "~/ui/icon";

export default component$((props: ButtonHTMLAttributes<any> & {isPlaying: boolean}) => {

    return (
        <button class={styles.playButton} {...props}>
            {!props.isPlaying ? <Play /> : <Pause />}
        </button>
    )

});