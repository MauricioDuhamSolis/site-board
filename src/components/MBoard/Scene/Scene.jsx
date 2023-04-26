/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {Suspense, useEffect} from 'react'
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
import {AXIS_SIZE, CHARACTERS_GAP, CHARACTER_COL_CNT, CHARACTER_URLS, INIT_ORIGIN_POS, FLOATING_HEIGHT, MAX_CHARACTER_CNT, VIEW_ORIGIN_POS, QUIT_ORIGIN_POS} from '../../../utils/constants'
import {customDebug} from '../../../utils/custom.debug'
import {usePrevious} from '../../../hooks/usePrevious'
import {deepClone} from '../../../utils/common'


export const Scene = () => {
  const {
    isSeeingBillboard,
    realtimeVisitors,
    prevLastCharacterIndex,
    setPrevLastCharacterIndex,
    usersInitPos,
    setUsersInitPos,
    usersDesPos,
    setUsersDesPos,
  } = useZustand()
  const prevRealtimeVisitors = usePrevious(realtimeVisitors, 0)

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
    const diffRealtimeVisitors = realtimeVisitors - prevRealtimeVisitors
    const newUsersInitPos = deepClone(usersInitPos)
    const newUsersDesPos = deepClone(usersDesPos)

    if (diffRealtimeVisitors > 0) {
      for (let i = 0; i < diffRealtimeVisitors; i++) {
        const userIndex = (prevLastCharacterIndex + i + 1) % MAX_CHARACTER_CNT
        const x = userIndex % CHARACTER_COL_CNT
        const y = (userIndex - x) / CHARACTER_COL_CNT
        newUsersInitPos[userIndex] = [
          INIT_ORIGIN_POS[0] - (x * CHARACTERS_GAP),
          FLOATING_HEIGHT,
          INIT_ORIGIN_POS[2] - (y * CHARACTERS_GAP),
        ]
        newUsersDesPos[userIndex] = [
          VIEW_ORIGIN_POS[0] - (x * CHARACTERS_GAP),
          FLOATING_HEIGHT,
          VIEW_ORIGIN_POS[2] - (y * CHARACTERS_GAP),
        ]
      }

      const newPrevLastCharacterIndex = (prevLastCharacterIndex + diffRealtimeVisitors) % MAX_CHARACTER_CNT
      setPrevLastCharacterIndex(newPrevLastCharacterIndex)
    } else {
      const prevFirstCharacterIndex = (MAX_CHARACTER_CNT + (prevLastCharacterIndex - prevRealtimeVisitors + 1)) % MAX_CHARACTER_CNT
      const absDiffRealtimeVisitors = Math.abs(diffRealtimeVisitors)

      for (let i = 0; i < absDiffRealtimeVisitors; i++) {
        const userIndex = (prevFirstCharacterIndex + i) % MAX_CHARACTER_CNT
        newUsersDesPos[userIndex] = QUIT_ORIGIN_POS
      }
    }

    customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersInitPos: ', newUsersInitPos)
    setUsersInitPos(newUsersInitPos)
    customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersDesPos: ', newUsersDesPos)
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
          {Array.from({length: MAX_CHARACTER_CNT}).map((v, index) =>
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
