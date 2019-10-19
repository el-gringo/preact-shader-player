import { h, createContext } from 'preact';
import { useEffect, useRef, useState  } from 'preact/hooks';

import WebGLContext from '../WebGLContext';

export default props => {
    const { 
        width, 
        height, 
        playState,
        quality, 
        fullscreen 
    } = props;
    const canvas = useRef();
    const playing = useRef(true);
    const [ contextObject, setContextObject ] = useState();
    const renderWidth = Math.round(width / quality);
    const renderHeight = Math.round(height / quality);

    function animate() {
        if (playing.current) {
            requestAnimationFrame(animate);
        }
        render();
    }

    function render() {
        const gl = contextObject.gl;
        gl.clearColor(0, 0, 0, 1.0);        // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (let componentRender of contextObject.renders) {
            componentRender();
        }
    }

    useEffect(() => {
        if (canvas.current) {
            console.log('canvas.current');
            const gl = (
                canvas.current.getContext('webgl2') ||
                canvas.current.getContext('webgl') || 
                canvas.current.getContext('experimental-webgl')
            );          
            setContextObject({
                gl,
                canvas: canvas.current,
                renders: []
            });
        }
    }, [ canvas, setContextObject ]);

    useEffect(() => {
        console.log('useEffect playState', playState);
        if (contextObject && playState) {
            playing.current = true;
            animate();
        } else {
            playing.current = false;
        }
    }, [ contextObject, playState ]);

    useEffect(() => {
        console.log('change size', width, height);
        canvas.current.style.width = width + 'px';
        canvas.current.style.height = height + 'px';
    }, [ width, height ]);
    
    return (
        <WebGLContext.Provider value={contextObject}>
            <canvas 
                ref={canvas}
                width={renderWidth}
                height={renderHeight}>
                {contextObject && props.children}
            </canvas>
        </WebGLContext.Provider>
    );
};