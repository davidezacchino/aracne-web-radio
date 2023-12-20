import {$, useComputed$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import type {Signal} from "@builder.io/qwik";
import type {Radio} from "~/model/IRadio";

export function useAudioStream(audioPlayerRef?: Signal<HTMLAudioElement | undefined>) {
    const audioStream = useSignal<Radio>();
    const isPlaying = useSignal<boolean>(false);
    const now = useSignal<Date>(new Date());

    const setMessage = $((message: MessageEvent) => {
        audioStream.value = JSON.parse(message.data.toString() as unknown as string) as Radio;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({cleanup}) => {
        const ws: WebSocket = new WebSocket('wss://radiowau-stream.andreacarriero.com/api/live/nowplaying/radiowau');
        ws.onmessage = setMessage;

        const elapsedTimeInterval = setInterval(() => {
            now.value = new Date();
        }, 500)
        cleanup(() => clearInterval(elapsedTimeInterval));
    })

    const elapsedTimeComputed = useComputed$<number>(() => {
        // it will automatically reexecute when name.value changes
        if (!audioStream.value) return 0;
        const playedAt = new Date(audioStream.value.now_playing.played_at * 1000);
        if (playedAt.getTime() > now.value.getTime()) return 0;
        return Math.floor((now.value.getTime() - playedAt.getTime()) / 1000);
    });

    const playFunction = $(async () => {
        if (!audioPlayerRef) return;

        if (isPlaying.value) {
            audioPlayerRef.value?.pause();
            isPlaying.value = false;
            return;
        }

        try {
            await audioPlayerRef.value?.play();
            isPlaying.value = true;
        } catch (e) {
            console.error(e);
        }
    })


    return {
        audioStream,
        isPlaying,
        playFunction,
        elapsedTimeComputed
    }

}