import { HTMLAttributes, MutableRefObject, useEffect, useRef, useState } from "react";

const usePlatform = () => {
    const platformList = useRef(new Set<MutableRefObject<HTMLDivElement | null>>());

    const Platform = (props: HTMLAttributes<HTMLDivElement>) => {
        const ref = useRef<HTMLDivElement | null>(null)

        useEffect(() => {

            platformList.current.add(ref);

            return () => {
                platformList.current.delete(ref)
            }
        })

        return <div ref={ref} {...props} />
    }

    return [platformList, Platform] as const

}

export default usePlatform;