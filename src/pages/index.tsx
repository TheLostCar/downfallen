import { useRef } from 'react'
import Head from 'next/head'
import styles from '@/styles/Index.module.css'
import Player from '@/components/Player'
import usePlayerUpdate from '@/components/Player/usePlayerUpdate'
import useMainLoop from '@/hooks/useMainLoop'
import usePlatform from '@/hooks/usePlatform'

export default function Home() {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [platformList, Platform] = usePlatform();
  const [playerUpdate, playerPos, playerAnimation, playerFacing] = usePlayerUpdate(playerRef, platformList);
  useMainLoop(playerUpdate);


  return (
    <>
      <Head>
        <title>Downfallen</title>
        <meta name="description" content="Downfallen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col h-full justify-end'>
        <Player
          pos={playerPos}
          facing={playerFacing}
          animation={playerAnimation}
          ref={playerRef}
        />

        <Platform className='h-6 bg-sky-600' />
        <div className='h-6 bg-orange-700'></div>
      </div>
    </>
  )
}
