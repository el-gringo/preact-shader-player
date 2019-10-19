import { h } from 'preact';

const BaseIcon = ({ width=24, height=24, children }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        style={{ width, height }}
        width="24"
        height="24" 
        viewBox="0 0 24 24">
        {children}
    </svg>
);


const Play = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M8 5v14l11-7z" fill="currentColor" />
            <path d="M0 0h24v24H0z" fill="none"/>
        </g>
    </BaseIcon>
);

const Pause = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor" />
            <path d="M0 0h24v24H0z" fill="none"/>
        </g>
    </BaseIcon>
);

const Fullscreen = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    fill="currentColor" />
        </g>
    </BaseIcon>
);

const ExitFullscreen = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" 
                fill="currentColor" />
        </g>
    </BaseIcon>
);

const ArrowLeft = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M14 7l-5 5 5 5V7z" fill="currentColor" />
            <path fill="none" d="M24 0v24H0V0h24z"/>
        </g>
    </BaseIcon>
);

const ArrowRight = props => (
    <BaseIcon {...props}>
        <g>
            <path d="M10 17l5-5-5-5v10z" fill="currentColor" />
            <path fill="none" d="M0 24V0h24v24H0z"/>            
        </g>
    </BaseIcon>
);


export default {
    BaseIcon,
    Play,
    Pause,
    Fullscreen,
    ExitFullscreen,
    ArrowLeft,
    ArrowRight
};