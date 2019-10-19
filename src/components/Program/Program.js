import { h, Component, createContext } from 'preact';
import { memo } from 'preact/compat';
import { useContext, useEffect, useLayoutEffect, useRef, useState  } from 'preact/hooks';

import WebGLContext from '../WebGLContext';
import ProgramContext from '../ProgramContext';


export default memo(props => {
    console.log('new Program');
    const { gl, renders } = useContext(WebGLContext);
    const [ program, setProgram ] = useState();
    const attributes = useRef({});
    const buffer = useRef({});
    const time = useRef(-1);

    //const program = useRef();

    function render() {
        gl.useProgram(program);
 
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.enableVertexAttribArray(attributes.current.position);        
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                -1.0,  1.0,
                 1.0, -1.0,
                 1.0,  1.0]),
            gl.STATIC_DRAW
        ); 
        
        const size = 2;  // (x, y, z)
        const type = gl.FLOAT;    // 32bit floating point values
        const normalize = false;  // leave the values as they are
        const offset = 0;         // start at the beginning of the buffer
        const stride = 0;         // how many bytes to move to the next vertex
                                  // 0 = use the correct stride for type and numComponents
        gl.vertexAttribPointer(attributes.current.position, size, type, false, stride, offset);
        gl.drawArrays(gl.TRIANGLES, 0, 6);        

        gl.uniform1f(attributes.current.time, ++time.current / 30);
        gl.uniform2f(attributes.current.resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);


    }

    function done() {        
        attributes.current.position = gl.getAttribLocation(program, 'position');

        attributes.current.resolution = gl.getUniformLocation(program, 'resolution');
        gl.enableVertexAttribArray( attributes.current.resolution );

        attributes.current.time = gl.getUniformLocation(program, 'time');
        gl.enableVertexAttribArray( attributes.current.time );
    }

    useLayoutEffect(() => {
        const glProgram = gl.createProgram();
        setProgram(glProgram);
        return () => gl.deleteProgram(glProgram);
    }, [ gl ]);

    useEffect(() => {        
        if (program) {
            gl.linkProgram(program);
            const success = gl.getProgramParameter(program, gl.LINK_STATUS);
            console.log('success', success);
            if (!success) {
                const info = gl.getProgramInfoLog(program);
                gl.deleteProgram(program);
                throw `Unable to initialize the shader program: ${info}`;
            }

            done();
            renders.push(render);
        }
        
    }, [ gl, program ]);

    //console.log('program', program);

    return program && (
        <ProgramContext.Provider value={program}>
            {props.children}
        </ProgramContext.Provider>
    );
});