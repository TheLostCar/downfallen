import { useEffect, useRef } from "react";

const MAX_FPS = 60;

const useMainLoop = (update: () => unknown) => {
    const lastFrameTime = useRef(0);

    useEffect(() => {
        const loop: FrameRequestCallback = (timestamp) => {
            if (timestamp < lastFrameTime.current + (1000 / MAX_FPS)) {
                request = window.requestAnimationFrame(loop)
                return
            }
            lastFrameTime.current = timestamp
            update()
            request = window.requestAnimationFrame(loop)
        }

        let request = window.requestAnimationFrame(loop);

        return () => { window.cancelAnimationFrame(request) }
    }, [])
}

export default useMainLoop;