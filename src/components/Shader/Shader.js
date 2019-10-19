import { h, Component, createContext } from 'preact';
import { memo } from 'preact/compat';
import { useContext, useLayoutEffect, useState  } from 'preact/hooks';

import WebGLContext from '../WebGLContext';
import ProgramContext from '../ProgramContext';

export default memo(props => {
    const { type } = props;
    const { gl, renders } = useContext(WebGLContext);
    const program = useContext(ProgramContext);

    function render() {

    }

    useLayoutEffect(() => {
        const source = props.source || props.children;
        const shaderType = 
            props.type === 'vertex' ? gl.VERTEX_SHADER : (
            props.type === 'fragment' ? gl.FRAGMENT_SHADER : null
        );
        if (shaderType === null) {
            throw `Unknown shader type ${props.type}`
        }
        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            const info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw `Unable to initialize the ${type} shader: ${info}`;
        }
        gl.attachShader(program, shader);
        gl.deleteShader(shader);
        renders.push(render);
    }, [ gl, program ]);
    
    return props.children;  
});