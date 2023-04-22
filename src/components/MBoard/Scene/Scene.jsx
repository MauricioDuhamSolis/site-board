/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, {Suspense} from 'react'
import {OrbitControls, OrthographicCamera, Sky, useGLTF} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Debug, Physics} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {useControls} from 'leva'
import {Character} from './Character'
import {Ground} from './Ground'
import {Billboard} from './Billboard'
import {Camera} from './Camera'
import {BillboardHtml} from './BillboardHtml'
import {useZustand} from '../../../store/useZustand'
import {CHARACTER_URLS} from '../../../utils/constants'


export const Scene = () => {
  const {
    isSeeingBillboard,
  } = useZustand()

  const {
    distance,
    sunPosition,
    inclination,
    azimuth,
    mieCoefficient,
    mieDirectionalG,
    rayleigh,
    turbidity,
  } = useControls({
    distance: {value: 450, label: 'distance'},
    sunPosition: {value: [0, 450, 0], label: 'sunPosition'},
    inclination: {value: 0, label: 'inclination'},
    azimuth: {value: 0.25, label: 'azimuth'},
    mieCoefficient: {value: 0, label: 'mieCoefficient'},
    mieDirectionalG: {value: 0, label: 'mieDirectionalG'},
    rayleigh: {value: 0.03, label: 'rayleigh'},
    turbidity: {value: 0, label: 'turbidity'},
  })

  return (
    <Canvas>
      {/* <Perf position="top-left"/> */}

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

      {/* <axesHelper args={[AXIS_SIZE]}/> */}

      <Suspense>
        <Physics colliders="hull">
          <Sky
            distance={distance}
            sunPosition={sunPosition}
            inclination={inclination}
            azimuth={azimuth}
            mieCoefficient={mieCoefficient}
            mieDirectionalG={mieDirectionalG}
            rayleigh={rayleigh}
            turbidity={turbidity}
          />
          <Billboard/>
          {isSeeingBillboard && <BillboardHtml/>}
          {CHARACTER_URLS.map((url, index) =>
            <Character
              key={index}
              index={index}
              url={url}
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


CHARACTER_URLS.forEach((url) => {
  useGLTF.preload(url)
})
