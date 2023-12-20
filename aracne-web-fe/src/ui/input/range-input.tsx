import type {InputHTMLAttributes} from "@builder.io/qwik";
import {component$} from "@builder.io/qwik";
import styles from './range-input.module.scss'

export default component$((props: Omit<InputHTMLAttributes<any>, 'type'>) => {

    return (
        <input type={"range"} {...props} class={styles.rangeInput} min="0" max="100"/>
    )

});