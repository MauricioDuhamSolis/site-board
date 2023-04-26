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
import {AXIS_SIZE, CHARACTERS_GAP, CHARACTER_COL_NUM, CHARACTER_URLS, ENTER_ORIGIN_POS, FLOATING_HEIGHT, MAX_CHARACTER_NUM} from '../../../utils/constants'
import {customDebug} from '../../../utils/custom.debug'
import {usePrevious} from '../../../hooks/usePrevious'


export const Scene = () => {
  const {
    isSeeingBillboard,
    realtimeVisitors,
    curLastCharacterInd,
    setCurLastCharacterInd,
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
    // Set users' initial position
    const newUsersInitPos = Array.from({length: MAX_CHARACTER_NUM}).map((v, index) => {
      const x = index % CHARACTER_COL_NUM
      const y = (index - x) / CHARACTER_COL_NUM
      return [
        ENTER_ORIGIN_POS[0] - (CHARACTERS_GAP * x),
        FLOATING_HEIGHT,
        ENTER_ORIGIN_POS[2] - (CHARACTERS_GAP * y),
      ]
    })
    customDebug().log('Scene#useEffect: newUsersInitPos: ', newUsersInitPos)
  }, [])

  useEffect(() => {
    const diffRealtimeVisitors = Math.max(realtimeVisitors - prevRealtimeVisitors, 0)
    const newCurLastCharacterInd = (curLastCharacterInd + diffRealtimeVisitors) % MAX_CHARACTER_NUM
    customDebug().log('Scene#useEffect: newCurLastCharacterInd: ', newCurLastCharacterInd)
    setCurLastCharacterInd(newCurLastCharacterInd)
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
          {Array.from({length: MAX_CHARACTER_NUM}).map((v, index) =>
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
