import { HTMLAttributes, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

const usePlatform = () => {
    const platformList = useRef(new Set<MutableRefObject<HTMLDivElement | null>>());

    const Platform = useCallback((props: HTMLAttributes<HTMLDivElement>) => {
        const ref = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            platformList.current.add(ref);
            return () => { platformList.current.delete(ref) };
        })

        return <div ref={ref} {...props} />
    }, [platformList]);

    return [platformList, Platform] as const

}

export default usePlatform;