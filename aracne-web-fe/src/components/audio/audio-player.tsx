import type {QRL} from "@builder.io/qwik";
import {$, component$, useSignal} from "@builder.io/qwik";
import style from "~/components/audio/audio-controller.module.scss";
import PlayButton from "~/ui/button/player/play-button";
import {VolumeOff, VolumeOn} from "~/ui/icon";
import RangeInput from "~/ui/input/range-input";
import type {Radio} from "~/model/IRadio";

interface PlayerProps {
    audioStream: Radio;
    isPlaying: boolean;
    audioPlayerRef: HTMLAudioElement;
    onPlayClick: QRL;
    elapsedTimeComputed: number;
}


export default component$(({audioStream, isPlaying, audioPlayerRef, elapsedTimeComputed, onPlayClick}: PlayerProps) => {
    const oldVolume = useSignal(audioPlayerRef.volume * 100);
    const volume = useSignal(audioPlayerRef.volume * 100);

    const setVolume = $((_event: Event, element: HTMLInputElement) => {
        const sliderValue = Number(element.value);
        oldVolume.value = sliderValue > 0 ? sliderValue : 100;
        volume.value = sliderValue;
        audioPlayerRef.volume = sliderValue / 100;
    });

    const setVolumeFromIconClick = $(() => {
        if (volume.value > 0) {
            volume.value = 0;
            audioPlayerRef.volume = 0;
            return;
        }

        volume.value = oldVolume.value;
        audioPlayerRef.volume = oldVolume.value / 100;
    });

    return (
        <>
            <div class={style.info}>
                {!audioStream.live.is_live ?
                    <div class={style.songLogo}>
                        <img src={audioStream.now_playing.song.art} loading={"eager"} width={60}
                             height={60}
                             alt={"Song Logo"}/>
                    </div> :
                    <div class={style.liveLogo}>
                        Live
                    </div>
                }

                <div class={style.playerInfo}>
                    <div class={style.title}>
                        {audioStream.now_playing.song.title}
                    </div>
                    <div class={style.author}>
                        {audioStream.now_playing.song.artist}
                    </div>
                </div>
            </div>
            <div class={style.player}>
                <PlayButton isPlaying={isPlaying} onClick$={onPlayClick}/>

                {!audioStream.live.is_live &&
                    <div class={style.playerProgress}>
                        <div
                            id={'elapsed-time'}
                            class={style.elapsed}>{`${String(Math.floor(elapsedTimeComputed / 60)).padStart(2, '0')}:${String(elapsedTimeComputed % 60).padStart(2, '0')}`}</div>
                        <div class={style.playerProgressBarWrapper}>
                            <div id={'progress-bar'}
                                 class={style.playerProgressBar}>
                                <div class={style.filler} style={{width: `${(elapsedTimeComputed / audioStream.now_playing.duration) * 100}%`}}></div>
                            </div>
                        </div>
                        <div class={style.duration}
                             id={'duration'}>{`${String(Math.floor(audioStream.now_playing.duration / 60)).padStart(2, '0')}:${String(audioStream.now_playing.duration % 60).padStart(2, '0')}`}</div>
                    </div>
                }

                {audioStream.live.is_live &&
                    <div class={style.playerProgress}>
                        <div
                            id={'elapsed-time'}
                            class={style.elapsed}></div>
                        <div class={style.playerProgressBarWrapper}>
                            <div id={'progress-bar'}
                                 class={[style.playerProgressBar, style.live]}>
                            </div>
                        </div>
                        <div class={style.duration}
                             id={'duration'}></div>
                    </div>
                }


            </div>
            <div class={style.playerController}>
                <div class={style.volumeIcon} onClick$={setVolumeFromIconClick}>
                    {
                        volume.value === 0 ?
                            <VolumeOff fill={'var(--light-grey)'} width={'25px'}/> :
                            <VolumeOn fill={'var(--light-grey)'} width={'25px'}/>
                    }
                </div>

                <RangeInput id="volume-slider" value={volume.value}
                            onInput$={setVolume}/>
            </div>
        </>
    )
});