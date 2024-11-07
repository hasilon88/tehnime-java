import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {
    MediaPlayer,
    MediaProvider,
    MediaPlayerInstance,
    type MediaPlayRequestEvent,
    Poster,
    useStore,
    useMediaRemote
} from '@vidstack/react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import API from '../services/api';
import poster from '../assets/watch/video-poster.png';
import { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
    url: any;
    userId: number;
    episodeId: string,
    history: [],
    animeImages: any,
    setUser: any,
    user: any
}

interface Episode {
    id: number,
    episodeId: string,
    resumeTime: number,
    image: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, userId, episodeId, history, animeImages, setUser, user }) => {
    const [playbackPosition, setPlaybackPosition] = useState<number>(0)

    const remote = useMediaRemote()
    const ref = useRef<MediaPlayerInstance>(null)
    const player = useStore(MediaPlayerInstance, ref);

    async function getResumeTime(history: Episode[], episodeId: string) {
        if (!history || history.length === 0)
            return 0

        for (const episode of history) {
            if (episode.episodeId === episodeId)
                return episode.resumeTime
        }

        return 0;
    }

    useEffect(() => {
        async function setTime() {
            const time = await getResumeTime(history, episodeId);
            setPlaybackPosition(time)
        }

        if (chrome.cast && chrome.cast.isAvailable) {
            const session = cast.framework.CastContext.getInstance().getCurrentSession();

            if (session) 
                session.endSession(true);
            
        }

        setTime();
    }, [episodeId]);

    function handleProgress() {
        try {
            
            if (player.duration - player.currentTime > 90 && player.currentTime > 1) {
                API.addEpisodeToHistory(userId, episodeId, player.currentTime, animeImages.poster);
            }
            else
                API.deleteEpisodeFromHistory(userId, episodeId)
        } catch (error) {
            console.error('Error saving playback position', error)
        }
    };

    function onPlayRequest(nativeEvent: MediaPlayRequestEvent) {
        remote.seek(playbackPosition, nativeEvent)
    }

    return (
        <div style={{ borderRadius: "20px", overflow: "hidden" }}>
            <MediaPlayer
                ref={ref}
                load='eager'
                onProgress={handleProgress}
                onStarted={onPlayRequest}
                playsInline
                title={episodeId}
                src={url}
            >
                <Poster
                    className="vds-poster"
                    src={poster}
                    alt=""
                />
                <MediaProvider />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                    slots={{
                        settingsMenu: null,
                    }}
                />
            </MediaPlayer>
        </div>
    );
}

export default VideoPlayer;