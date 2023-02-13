import xor from "@/lib/xor";
import { useRef, useState } from "react";

type IMovement = 'left' | 'right'

const LEFT = 'left'
const RIGHT = 'right'

const useMovement = () => {
    const moving = useRef(new Set<IMovement>());

    const moveLeft = () => {
        moving.current.add(LEFT)
    }
    const moveRight = () => {
        moving.current.add(RIGHT)
    }

    const stopMovingLeft = () => {
        moving.current.delete(LEFT);
    }

    const stopMovingRight = () => {
        moving.current.delete(RIGHT);
    }

    const isMoving = () => xor(moving.current.has(LEFT), moving.current.has(RIGHT));
    const isMovingRight = () => moving.current.has(RIGHT);
    const isMovingLeft = () => moving.current.has(LEFT);



    return [moving, moveLeft, moveRight, stopMovingLeft, stopMovingRight, isMoving, isMovingLeft, isMovingRight] as const
}

export default useMovement;