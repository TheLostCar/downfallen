import { useRef, useState } from "react";

const DEFAULT_GRAVITY = 2

const useGravity = (initial = DEFAULT_GRAVITY) => {
    const initialGravity = useRef(initial);
    const [gravity, setGravity] = useState(initial)
    const gravityCoef = useRef(1)

    const resetGravity = () => {
        setGravity(initialGravity.current)
    }

    const mulitplyGravity = (n: number) => {
        setGravity(p => p * n);
    }

    return [gravity, gravityCoef] as const
}

export default useGravity;