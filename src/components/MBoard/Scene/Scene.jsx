/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, {Suspense, useEffect} from 'react'
import * as THREE from 'three'
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
import {AXIS_SIZE, CHARACTER_BILLBOARD_VIEW_DISTANCE, CHARACTER_POS_GENERATION_HALF_WIDE, CHARACTER_URLS, FLOATING_HEIGHT} from '../../../utils/constants'
import {deepClone, getBox3RandomPoint} from '../../../utils/common'


export const Scene = () => {
  const {
    isSeeingBillboard,
    curCharacterNum,
    billboardDesPos,
    usersInitPos,
    setUsersInitPos,
    setUsersDesPos,
    realtimeVisitors,
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

  useEffect(() => {
    // Set users' initial position
    const characterPosGenerationBox3 = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(billboardDesPos[0], FLOATING_HEIGHT, billboardDesPos[2] - CHARACTER_BILLBOARD_VIEW_DISTANCE - CHARACTER_POS_GENERATION_HALF_WIDE),
        new THREE.Vector3(CHARACTER_POS_GENERATION_HALF_WIDE, FLOATING_HEIGHT, CHARACTER_POS_GENERATION_HALF_WIDE),
    )
    const newUsersInitPos = Array.from({length: CHARACTER_URLS.length}).map(() => getBox3RandomPoint(characterPosGenerationBox3))
    setUsersInitPos(newUsersInitPos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Set users' destination position
    const newUserDesPos = deepClone(billboardDesPos)
    newUserDesPos[2] -= CHARACTER_BILLBOARD_VIEW_DISTANCE
    const newUsersDesPos = Array.from({length: realtimeVisitors}).fill(newUserDesPos)
    for (let i = realtimeVisitors; i < CHARACTER_URLS.length; i++) {
      newUsersDesPos.push(usersInitPos[i] || [0, 0, 0])
    }
    setUsersDesPos(newUsersDesPos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realtimeVisitors])

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
          {Array.from({length: curCharacterNum}).map((v, index) =>
            <Character
              key={index}
              index={index}
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
