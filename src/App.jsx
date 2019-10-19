import { h, Component } from "preact";
import { useLayoutEffect, useState  } from 'preact/hooks';

import ShaderPlayer from './components/ShaderPlayer';
import Program from './components/Program';
import Shader from './components/Shader';


export default () => {
  const [ vertexShaderSource, setVertexShaderSource ] = useState();
  const [ framentShaderSource, setFramentShaderSource ] = useState();

  useLayoutEffect(() => {
    fetch('/shader/cloud.frag')
      .then(r => r.text())
      .then(setFramentShaderSource);
    fetch('/shader/simple.vert')
      .then(r => r.text())
      .then(setVertexShaderSource);      
  }, [ setVertexShaderSource ]);

  return vertexShaderSource && framentShaderSource ? (
        <div>
            <ShaderPlayer
                width={1280}
                height={720}>
                <Program>
                    <Shader type="vertex" source={vertexShaderSource} />
                    <Shader type="fragment" source={framentShaderSource} />
                </Program>
            </ShaderPlayer>
        </div>
    ) : null;
};
