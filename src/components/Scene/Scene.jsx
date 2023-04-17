import React, {Suspense} from 'react'
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


export const Scene = () => {
  const {
    isSeeingBillboard,
    realtimeVisitors,
  } = useZustand()

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
          <BillboardHtml hide={!isSeeingBillboard}/>
          {Array.from({length: realtimeVisitors}).map((value, index) =>
            <Character
              key={index}
              index={index}
              url={CHARACTER_URLS[index % CHARACTER_URLS.length]}
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
