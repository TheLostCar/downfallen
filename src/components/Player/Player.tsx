import AnimationData from "@/customTypes/AnimationData";
import React, { ForwardedRef } from "react";
import styles from './Player.module.scss'
import Vector2D from "@/customTypes/Vector2D";

type Props = {
    pos: Vector2D;
    animation: AnimationData;
    facing: 'left' | 'right';
}


const Player = React.forwardRef(({ pos, animation, facing }: Props, ref: ForwardedRef<HTMLDivElement>) => {

    return (
        <div
            ref={ref}
            className={styles.player}
            style={{
                left: pos.x,
                top: pos.y,
                backgroundImage: `url(${animation.spriteSheet})`,
                transform: `scale(5) scaleX(${facing === 'right' && 1 || -1})`,
                ["--duration" as any]: `${animation.duration}s`,
                ["--spriteWidth" as any]: `${48}px`,
                ["--steps" as any]: `${animation.steps}`,
                ["--iterationCount" as any]: animation.loop && 'infinite' || '1'

            }}
        />
    );
})

export default Player;