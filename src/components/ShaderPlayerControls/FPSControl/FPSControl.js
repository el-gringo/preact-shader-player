import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export default props => {
    const node = useRef();
    
    useEffect(() => {
        let fps = 0;
        let count = 1;
        let lastLoop = (new Date()).getMilliseconds();
        let currentLoop;

        function loop() {
            if (!node.current) {
                return false;
            }

            requestAnimationFrame(() => {
                currentLoop = (new Date()).getMilliseconds();
                if (lastLoop > currentLoop) {
                    fps  = count;          
                    count = 1;
                } else {
                    ++count;            
                }
                lastLoop = currentLoop;                
                node.current.innerText = fps + ' fps';
                loop(); 
            });
        }

        requestAnimationFrame(loop);
    }, []);

    return <span ref={node} className="Control FPS"></span>;
};