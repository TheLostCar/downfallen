import { useRef } from "react";
import Vector2D from "@/customTypes/Vector2D";

const useSpeed = () => {
    const speed = useRef({
        x: 0,
        y: 0
    })

    const changeSpeed = ({ x, y }: Partial<Vector2D>) => {
        if (typeof x === 'number') speed.current.x = x;
        if (typeof y === 'number') speed.current.y = y;
    };

    const addSpeed = ({ x = 0, y = 0 }: Partial<Vector2D>) => {
        speed.current = {
            x: speed.current.x + x,
            y: speed.current.y + y
        }
    }

    return [speed, changeSpeed, addSpeed] as const
}

export default useSpeed;