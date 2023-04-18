import React, {Suspense, useEffect} from 'react'
import {OrbitControls, OrthographicCamera} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
// eslint-disable-next-line no-unused-vars
import {Debug, Physics} from '@react-three/rapier'
// eslint-disable-next-line no-unused-vars
import {Perf} from 'r3f-perf'
import {Character} from './Character'
import {CHARACTER_SCALE, CHARACTER_URLS, GROUND_SIZE, WALKING_SPEED} from '../../utils/constants'
import {Ground} from './Ground'
import {Billboard} from './Billboard'
import {Camera} from './Camera'
import {BillboardHtml} from './BillboardHtml'
import {useZustand} from '../../store/useZustand'
import {deepClone, getRandomFromCenter} from '../../utils/common'
import {customDebug} from '../../utils/custom.debug'


export const Scene = () => {
  const {
    billboardDesPos,
    isSeeingBillboard,
    realtimeVisitors,
    usersInitPos,
    setUsersInitPos,
    setUsersDesPos,
  } = useZustand()

  useEffect(() => {
    // Set users' initial position
    const additionalUsersInitPos = Array.from({length: Math.max(realtimeVisitors - usersInitPos, 0)}).map(() => [getRandomFromCenter(GROUND_SIZE / 2), 1, getRandomFromCenter((GROUND_SIZE - 2) / 2)])
    customDebug().log('Scene#useEffect: additionalUsersInitPos: ', additionalUsersInitPos)
    const newUsersInitPos = [
      ...usersInitPos.slice(0, realtimeVisitors),
      ...additionalUsersInitPos,
    ]
    customDebug().log('Scene#useEffect: newUsersInitPos: ', newUsersInitPos)
    setUsersInitPos(newUsersInitPos)

    // Set users' destination position
    const newUserDesPos = deepClone(billboardDesPos)
    newUserDesPos[2] -= GROUND_SIZE * 0.1
    const newUsersDesPos = Array.from({length: realtimeVisitors}).fill(newUserDesPos)
    customDebug().log('Scene#useEffect: newUsersDesPos: ', newUsersDesPos, billboardDesPos)
    setUsersDesPos(newUsersDesPos)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realtimeVisitors])

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
