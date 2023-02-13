import { useState } from "react";
type IFacing = 'left' | 'right';

const useFacing = (initial: IFacing = 'right') => {
    const [facing, setFacing] = useState(initial)

    const faceLeft = () => {
        setFacing('left')
    }
    const faceRight = () => {
        setFacing('right')
    }

    return [facing, faceLeft, faceRight] as const;
}

export default useFacing;