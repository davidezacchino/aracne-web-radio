import {$, component$, useComputed$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import type {Radio} from "~/model/IRadio";
import style from './audio-controller.module.scss'
import PlayButton from "~/ui/button/play-button";
import clsx from "clsx";

export default component$(() => {
    const audioStream = useSignal<Radio>();
    const isPlaying = useSignal<boolean>(false);

    const setMessage = $((message: MessageEvent) => {
        audioStream.value = JSON.parse(message.data.toString() as unknown as string) as Radio;
    });

    const audioPlayerRef = useSignal<HTMLAudioElement>();
    const now = useSignal<Date>(new Date());

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

    if (!audioStream.value) return (
        <div class={style.audioController}></div>
    );

    const playFunction = $(async () => {
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

    return (
        <>
            <div class={style.audioController}>
                {audioPlayerRef.value &&
                    <>
                        <div class={style.info}>
                            {!audioStream.value.live.is_live &&
                                <div class={style.songLogo}>
                                    <img src={audioStream.value.now_playing.song.art} loading={"eager"} width={60}
                                         height={60}
                                         alt={"Song Logo"}/>
                                </div>}

                            {audioStream.value.live.is_live &&
                                <div class={style.liveLogo}>
                                    Live
                                </div>
                            }

                            <div class={style.playerInfo}>
                                <div class={style.title}>
                                    {audioStream.value.now_playing.song.title}
                                </div>
                                <div class={style.author}>
                                    {audioStream.value.now_playing.song.artist}
                                </div>
                            </div>
                        </div>
                        <div class={style.player}>
                            <PlayButton isPlaying={isPlaying.value} onClick$={playFunction}/>

                            {!audioStream.value.live.is_live &&
                                <div class={style.playerProgress}>
                                    <div
                                        id={'elapsed-time'}
                                        class={style.elapsed}>{`${String(Math.floor(elapsedTimeComputed.value / 60)).padStart(2, '0')}:${String(elapsedTimeComputed.value % 60).padStart(2, '0')}`}</div>
                                    <div class={style.playerProgressBarWrapper}>
                                        <div id={'progress-bar'}
                                             class={clsx(style.playerProgressBar)}>
                                            <div class="filler"></div>
                                        </div>
                                    </div>
                                    <div class={style.duration}
                                         id={'duration'}>{`${String(Math.floor(audioStream.value.now_playing.duration / 60)).padStart(2, '0')}:${String(audioStream.value.now_playing.duration % 60).padStart(2, '0')}`}</div>
                                </div>
                            }

                            {audioStream.value.live.is_live &&
                                <div class={style.playerProgress}>
                                    <div
                                        id={'elapsed-time'}
                                        class={style.elapsed}></div>
                                    <div class={style.playerProgressBarWrapper}>
                                        <div id={'progress-bar'}
                                             class={clsx(style.playerProgressBar, style.live)}>
                                        </div>
                                    </div>
                                    <div class={style.duration}
                                         id={'duration'}></div>
                                </div>
                            }


                        </div>
                        <div class={style.playerController}>
                            <input type="range" id="volume-slider" value={audioPlayerRef.value.volume * 100}
                                   onInput$={(_event: Event, element: HTMLInputElement) => {
                                       if (audioPlayerRef.value) {
                                           audioPlayerRef.value.volume = Number(element.value) / 100;
                                       }
                                   }}/>
                        </div>
                    </>
                }

            </div>

            <audio ref={audioPlayerRef} controls src="https://radiowau-stream.andreacarriero.com/radio/8000/radio.mp3"
                   volume={0.5}
                   style={{display: 'none'}}>
            </audio>
        </>
    )
        ;
});