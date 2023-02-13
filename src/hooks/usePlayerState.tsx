import { useRef } from "react";

type PlayerStates = 'grounded' | 'falling' | 'jumping' | 'jumpingHold';

const usePlayerState = () => {
    const playerState = useRef<PlayerStates>('grounded')

    return [playerState] as const

}

export default usePlayerState;