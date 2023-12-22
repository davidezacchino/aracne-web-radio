import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import style from './audio-controller.module.scss'
import {useAudioStream} from "~/hooks/use-audio-stream";
import AudioPlayer from "~/components/audio/audio-player";

export default component$(() => {
    const audioPlayerRef = useSignal<HTMLAudioElement>();
    const canPlay = useSignal<boolean>(false);
    const {
        isPlaying,
        playFunction,
        audioStream,
        elapsedTimeComputed
    } = useAudioStream(audioPlayerRef);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        if (audioPlayerRef.value) {
            audioPlayerRef.value.oncanplay = () => {
                canPlay.value = true;
            }
        }
    }, {strategy: 'document-ready'})

    return (
        <>
            <div class={[style.audioController, canPlay.value && style.ready]}>
                {audioStream.value && audioPlayerRef.value && canPlay.value &&
                    <AudioPlayer audioStream={audioStream.value} isPlaying={isPlaying.value}
                                 audioPlayerRef={audioPlayerRef.value} onPlayClick={playFunction}
                                 elapsedTimeComputed={elapsedTimeComputed.value}/>
                }

            </div>

            <audio id={'audio'} ref={audioPlayerRef} controls
                   src="https://radiowau-stream.andreacarriero.com/radio/8000/radio.mp3"
                   style={{display: 'none'}}>
            </audio>
        </>
    );
});