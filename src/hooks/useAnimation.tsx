import AnimationData from "@/customTypes/AnimationData";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type IAnimation = {
    [k: string]: AnimationData
}

const useAnimation = <T,>(initial: keyof T, entityRef: MutableRefObject<HTMLElement | null>) => {
    const animation = useRef(initial);

    useEffect(() => {
        if (entityRef.current === null) return;

        entityRef.current.style.animation = 'none';
        void entityRef.current.clientHeight;
        entityRef.current.style.animation = ''
    }, [animation.current])

    const changeAnimation = (newAnimation: keyof T) => {
        if (newAnimation === animation.current) return;
        if (entityRef.current === null) return;

        animation.current = newAnimation;
    }

    return [animation, changeAnimation] as const;
}

export default useAnimation;