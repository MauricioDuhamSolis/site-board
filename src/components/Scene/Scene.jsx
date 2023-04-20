/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, {Suspense, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls, OrthographicCamera} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Debug, Physics} from '@react-three/rapier'
import {Perf} from 'r3f-perf'
import {Character} from './Character'
import {AXIS_SIZE, CHARACTER_BILLBOARD_VIEW_DISTANCE, CHARACTER_POS_GENERATION_HALF_WIDE, CHARACTER_SCALE, CHARACTER_URLS, GROUND_SIZE, WALKING_SPEED} from '../../utils/constants'
import {Ground} from './Ground'
import {Billboard} from './Billboard'
import {Camera} from './Camera'
import {BillboardHtml} from './BillboardHtml'
import {useZustand} from '../../store/useZustand'
import {deepClone, getBox3RandomPoint} from '../../utils/common'
import {customDebug} from '../../utils/custom.debug'


export const Scene = () => {
  const {
    billboardDesPos,
    isSeeingBillboard,
    realtimeVisitors,
    usersInitPos,
    setUsersInitPos,
    setUsersDesPos,
    billboardViewDistance,
  } = useZustand()

  useEffect(() => {
    // Set users' initial position
    const characterPosGenerationBox3 = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(billboardDesPos[0], 0, billboardDesPos[2] - CHARACTER_BILLBOARD_VIEW_DISTANCE - CHARACTER_POS_GENERATION_HALF_WIDE),
        new THREE.Vector3(CHARACTER_POS_GENERATION_HALF_WIDE, 0, CHARACTER_POS_GENERATION_HALF_WIDE),
    )
    const additionalUsersInitPos = Array.from({length: Math.max(realtimeVisitors - usersInitPos, 0)}).map(() => getBox3RandomPoint(characterPosGenerationBox3))
    customDebug().log('Scene#useEffect[realtimeVisitors]: additionalUsersInitPos: ', additionalUsersInitPos)
    const newUsersInitPos = [
      ...usersInitPos.slice(0, realtimeVisitors),
      ...additionalUsersInitPos,
    ]
    customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersInitPos: ', newUsersInitPos)
    setUsersInitPos(newUsersInitPos)

    // Set users' destination position
    const newUserDesPos = deepClone(billboardDesPos)
    newUserDesPos[2] -= CHARACTER_BILLBOARD_VIEW_DISTANCE
    const newUsersDesPos = Array.from({length: realtimeVisitors}).fill(newUserDesPos)
    customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersDesPos: ', newUsersDesPos, billboardDesPos)
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
