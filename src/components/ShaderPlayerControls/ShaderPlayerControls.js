import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Icon from  '../Icon';
import FPSControl from  './FPSControl';
import './style.css';


export default props => {
    const {
        quality,
        playState,
        fullscreen,
        onQualityChange, 
        onPlayStateChange, 
        onFullscreenChange 
    } = props;

    return (
        <div className="ShaderPlayerControls">
            <button className="Control Button IconButton PlayPause" 
                onClick={() => onPlayStateChange(!playState)}>
                {playState ? <Icon.Pause /> : <Icon.Play />}
            </button>

            <div className="BarSpace"></div>

            <div className="IncrementalControl">
                <label>Quality</label>
                <button className="Control Button IconButton" onClick={() => onQualityChange(quality / 2)}>
                    <Icon.ArrowLeft />
                </button>
                <span className="IncrementalControlValue">
                    {quality}
                </span>
                <button className="Control Button IconButton" onClick={() => onQualityChange(quality * 2)}>
                    <Icon.ArrowRight />
                </button>
            </div>

            <FPSControl />

            <button className="Control Button IconButton Fullscreen" 
                onClick={event => onFullscreenChange(event)}>
                {fullscreen ? <Icon.ExitFullscreen /> : <Icon.Fullscreen />}
            </button>
        </div>
    );
};