import { useCallback, useEffect, useRef } from "react";

type IControls = {
    [k: string]: {
        keyDown: () => any
        keyHold: () => any
        keyUp: () => any
    }
}


const useKeyboardControls = (controls: IControls) => {
    const keysPressed = useRef(new Set())

    const keyDownWrapper = useCallback((e: KeyboardEvent) => {
        handleKeyDown(e, controls)
    }, [])

    const keyUpWrapper = useCallback((e: KeyboardEvent) => {
        handleKeyUp(e, controls)
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', keyDownWrapper)
        window.addEventListener('keyup', keyUpWrapper)
    }, [])

    const handleKeyDown = (e: KeyboardEvent, controls: IControls) => {
        if (!controls[e.key]) return;

        if (keysPressed.current.has(e.key)) return controls[e.key].keyHold()

        keysPressed.current.add(e.key)
        controls[e.key].keyDown()
    }

    function handleKeyUp(e: KeyboardEvent, controls: IControls) {
        keysPressed.current.delete(e.key)

        if (controls[e.key]) controls[e.key].keyUp()

    }

    return;
}

export default useKeyboardControls;