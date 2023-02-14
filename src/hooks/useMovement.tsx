import xor from "@/lib/xor";
import { useRef, useState } from "react";

type IMovement = 'left' | 'right'

const LEFT = 'left'
const RIGHT = 'right'

const useMovement = () => {
    const moving = useRef(new Set<IMovement>());

    const startMoving = (direction: IMovement) => {
        moving.current.add(direction);
    }

    const stopMoving = (direction: IMovement) => {
        moving.current.delete(direction);
    }

    const isMoving = (direction?: IMovement) => {
        if (direction !== undefined) return moving.current.has(direction);
        return xor(moving.current.has(LEFT), moving.current.has(RIGHT));

    };

    return [moving, startMoving, stopMoving, isMoving] as const
}

export default useMovement;