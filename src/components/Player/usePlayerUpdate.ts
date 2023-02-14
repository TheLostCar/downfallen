import useAnimation from "@/hooks/useAnimation";
import useFacing from "@/hooks/useFacing";
import useGravity from "@/hooks/useGravity";
import useMovement from "@/hooks/useMovement";
import useKeyboardControls from "@/hooks/useKeyboardControls";
import usePosition from "@/hooks/usePosition";
import useSpeed from "@/hooks/useSpeed";
import { MutableRefObject } from "react";
import isColliding from "@/lib/isColliding";
import usePlayerState from "@/hooks/usePlayerState";

const animations = {
    'idle': {
        spriteSheet: '/spritesheets/Player/Biker_idle.png',
        steps: 4,
        duration: 1,
        loop: true
    },
    'walk': {
        spriteSheet: '/spritesheets/Player/Biker_run.png',
        steps: 6,
        duration: .7,
        loop: true,
    },
    'jump': {
        spriteSheet: '/spritesheets/Player/Biker_jump.png',
        steps: 3,
        duration: .3,
        loop: false
    }
} as const

const usePlayerUpdate = (playerRef: MutableRefObject<HTMLDivElement | null>, hitboxRef: MutableRefObject<HTMLDivElement | null>, platformList: MutableRefObject<Set<MutableRefObject<HTMLDivElement | null>>>) => {
    const [facing, faceLeft, faceRight] = useFacing('right')
    const [pos, move, setPos] = usePosition({ x: 0, y: 40 });
    const [moving, startMoving, stopMoving, isMoving] = useMovement();
    const [animation, changeAnimation] = useAnimation<typeof animations>('idle', playerRef);
    const [speed, changeSpeed, addSpeed] = useSpeed();
    const [gravity, gravityCoef] = useGravity(10)
    const [playerState] = usePlayerState();

    useKeyboardControls({
        'a': {
            keyDown: () => {
                startMoving('left')
            },
            keyHold: () => { },
            keyUp: () => { stopMoving('left') }
        },
        'd': {
            keyDown: () => { startMoving('right') },
            keyHold: () => { },
            keyUp: () => { stopMoving('right') }
        },
        'w': {
            keyDown: () => {
                if (playerState.current === 'jumping') return;
                playerState.current = 'jumping'
                jump()

            },
            keyHold: () => {

            },
            keyUp: () => {
                if (playerState.current !== 'jumping') return
                if (speed.current.y > -30) return
                speed.current.y = -30
            }
        },
        's': {
            keyDown: () => { changeSpeed({ x: 100 }) },
            keyHold: () => { },
            keyUp: () => { }
        }
    })

    const jump = () => {
        changeSpeed({
            y: -100
        })
    }

    const calculateHorizontalSpeed = () => {
        if (!isMoving()) return 0
        if (isMoving('left')) return -20
        return 20
    }

    const update = () => {
        if (speed.current.y <= 100) addSpeed({
            x: Math.sign(speed.current.x) !== Math.sign(calculateHorizontalSpeed()) && calculateHorizontalSpeed() || 0,
            y: gravity
        })

        if (playerState.current === 'grounded') {
            if (isMoving()) changeAnimation('walk')
            else {
                changeAnimation('idle')
                changeSpeed({ x: 0 })
            }
        }
        else if (playerState.current === 'jumping') {
            changeAnimation('jump')
        }

        if (playerState.current === 'falling') {
            //
        }

        if (isMoving('left')) faceLeft();
        if (isMoving('right')) faceRight();

        // collisions
        platformList.current.forEach((v) => {
            if (v.current === null) return;
            if (hitboxRef.current === null) return;

            const platformRect = v.current.getBoundingClientRect();
            const player = hitboxRef.current.getBoundingClientRect();

            const horizontalPlayerRect = {
                x: player.x + speed.current.x,
                y: player.y,
                width: player.width,
                height: player.height
            }

            const verticalPlayerRect = {
                x: player.x,
                y: player.y + speed.current.y,
                width: player.width,
                height: player.height
            }

            if (speed.current.y > 0 && isColliding(verticalPlayerRect, platformRect)) playerState.current = 'grounded';

            while (isColliding(verticalPlayerRect, platformRect)) {
                if (speed.current.y === 0) break;
                speed.current.y -= Math.sign(speed.current.y)
                verticalPlayerRect.y = player.y + speed.current.y
            }

            horizontalPlayerRect.y = player.y + speed.current.y
            while (isColliding(horizontalPlayerRect, platformRect)) {
                if (animation.current === 'walk') changeAnimation('idle');
                if (speed.current.x === 0) break;
                speed.current.x -= Math.sign(speed.current.x);
                horizontalPlayerRect.x = player.x + speed.current.x;
            }
        })

        if (speed.current.x < 0) faceLeft();
        if (speed.current.x > 0) faceRight();

        move({
            x: speed.current.x,
            y: speed.current.y
        })
    }
    return [update, pos, animations[animation.current], facing] as const
}

export default usePlayerUpdate;