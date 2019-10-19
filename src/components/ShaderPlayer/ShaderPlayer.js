import { h } from 'preact';
import { useLayoutEffect, useEffect, useState, useRef } from 'preact/hooks';

import Canvas from '../Canvas';
import ShaderPlayerControls from '../ShaderPlayerControls';

import './style.css';


export default props => {
    const { width=533, height=300 } = props;
    const player = useRef();
    const [ quality, setQuality ] = useState(1);
    const [ playState, setPlayState ] = useState(true);
    const [ fullscreen, setFullscreen ] = useState(false);
    const [ screenSize, setScreenSize ] = useState({ width, height });

    const enterFullscreen = () => {
        const bounding = player.current.getBoundingClientRect();
        setScreenSize({ width: bounding.width, height: bounding.height });
        setFullscreen(true);
    };

    const exitFullscreen = () => {
        setScreenSize({ width, height });
        setFullscreen(false);
    };

    const handleFullscreen = () => {
        if (document.fullscreen) {
            document.exitFullscreen().then(exitFullscreen);
        } else {
            player.current.requestFullscreen().then(enterFullscreen);
        }
    };

    const handleFullscreenEvent = event => {
        if (!document.fullscreen) {
            exitFullscreen();
        } 
    };

    useEffect(() => {
        addEventListener('fullscreenchange', handleFullscreenEvent);
        return () => removeEventListener('fullscreenchange', handleFullscreenEvent);;
    }, []);

    return (
        <div ref={player} 
            className="ShaderPlayer" 
            style={{
                width: screenSize.width + 'px',
                height: screenSize.height + 'px'
            }}>
            <Canvas {...props} 
                quality={quality}
                playState={playState}
                fullscreen={fullscreen}
                width={screenSize.width}
                height={screenSize.height}
                >{props.children}</Canvas>
            <ShaderPlayerControls
                quality={quality}
                playState={playState}
                fullscreen={fullscreen}
                onQualityChange={setQuality} 
                onPlayStateChange={setPlayState}
                onFullscreenChange={handleFullscreen} /> 
        </div>

    );
};
