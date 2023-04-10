/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {Suspense} from 'react'
import {OrbitControls, OrthographicCamera, PerspectiveCamera} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Debug, Physics} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {Character} from './Character'
import {CHARACTER_URLS} from '../../utils/constants'
import {Ground} from './Ground'
import {Billboard} from './Billboard'


export const Scene = () => {
  return (
    <Canvas>
      <Perf position="top-left"/>

      <OrbitControls makeDefault/>

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      >
        <OrthographicCamera/>
      </directionalLight>
      <ambientLight intensity={0.5}/>

      {/* <axesHelper args={[5]}/> */}

      <Suspense>
        <Physics colliders="hull">
          <Billboard/>
          {CHARACTER_URLS.map((url, index) =>
            <Character
              key={index}
              index={index}
              url={url}
              scale={0.005}
              speed={0.5}
            />,
          )}
          <Ground/>
          {/* <Debug/> */}
        </Physics>
      </Suspense>

      <PerspectiveCamera
        makeDefault
        position={[-5, 5, -5]}
      />
    </Canvas>
  )
}
