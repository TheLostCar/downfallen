import AnimationData from "@/customTypes/AnimationData";
import React, { ForwardedRef, MutableRefObject } from "react";
import styles from './Player.module.scss'
import Vector2D from "@/customTypes/Vector2D";

type Props = {
    pos: Vector2D;
    animation: AnimationData;
    facing: 'left' | 'right';
    playerRef: MutableRefObject<HTMLDivElement | null>
    hitboxRef: MutableRefObject<HTMLDivElement | null>
}


const Player = ({ pos, animation, facing, playerRef, hitboxRef }: Props,) => {

    return (
        <div
            ref={playerRef}
            className={styles.player}
            style={{
                left: pos.x,
                top: pos.y,
                backgroundImage: `url(${animation.spriteSheet})`,
                transform: `scale(4) scaleX(${facing === 'right' && 1 || -1})`,
                ["--duration" as any]: `${animation.duration}s`,
                ["--spriteWidth" as any]: `${48}px`,
                ["--steps" as any]: `${animation.steps}`,
                ["--iterationCount" as any]: animation.loop && 'infinite' || '1'
            }}
        >
            <div
                className={styles.hitbox}
                ref={hitboxRef}
            />
        </div>
    );
}

export default Player;