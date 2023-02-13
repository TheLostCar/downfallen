import { useState } from "react"
import Vector2D from "@/customTypes/Vector2D"

const usePosition = (initial: Vector2D) => {
    const [pos, setPos] = useState(initial)

    const move = ({ x = 0, y = 10 }: Partial<Vector2D>) => {
        setPos(p => ({
            x: p.x + x,
            y: p.y + y
        }))
    }

    return [pos, move, setPos] as const;
}

export default usePosition