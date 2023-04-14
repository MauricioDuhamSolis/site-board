import React, {Suspense, useEffect} from 'react'
import {OrbitControls, OrthographicCamera} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
// eslint-disable-next-line no-unused-vars
import {Debug, Physics} from '@react-three/rapier'
// eslint-disable-next-line no-unused-vars
import {Perf} from 'r3f-perf'
import {Character} from './Character'
// eslint-disable-next-line no-unused-vars
import {CHARACTER_SCALE, CHARACTER_URLS, GROUND_SIZE, WALKING_SPEED} from '../../utils/constants'
import {Ground} from './Ground'
import {Billboard} from './Billboard'
import {Camera} from './Camera'
import {BillboardHtml} from './BillboardHtml'
import {useZustand} from '../../store/useZustand'
import {customDebug} from '../../utils/custom.debug'


export const Scene = () => {
  const {
    isSeeingBillboard,
    setSelUserIndex,
  } = useZustand()

  useEffect(() => {
    const newSelUserIndex = parseInt(Math.random() * CHARACTER_URLS.length)
    customDebug().log('Scene#useEffect: newSelUserIndex: ', newSelUserIndex)
    setSelUserIndex(newSelUserIndex)
  }, [setSelUserIndex])

  return (
    <Canvas>
      {/* <Perf position="top-left"/> */}

      {!isSeeingBillboard && <OrbitControls makeDefault/>}

      <directionalLight
        // eslint-disable-next-line react/no-unknown-property
        castShadow
        // eslint-disable-next-line react/no-unknown-property
        position={[1, 2, 3]}
        // eslint-disable-next-line react/no-unknown-property
        intensity={1.5}
        // eslint-disable-next-line react/no-unknown-property
        shadow-normalBias={0.04}
      >
        <OrthographicCamera/>
      </directionalLight>
      <ambientLight
        // eslint-disable-next-line react/no-unknown-property
        intensity={0.5}
      />

      {/* <axesHelper
        // eslint-disable-next-line react/no-unknown-property
        args={[GROUND_SIZE]}
      /> */}

      <Suspense>
        <Physics colliders="hull">
          <Billboard/>
          <BillboardHtml/>
          {CHARACTER_URLS.map((url, index) =>
            <Character
              key={index}
              index={index}
              url={url}
              scale={CHARACTER_SCALE}
              speed={WALKING_SPEED}
            />,
          )}
          <Ground/>
          {/* <Debug/> */}
        </Physics>
      </Suspense>

      <Camera/>
    </Canvas>
  )
}
