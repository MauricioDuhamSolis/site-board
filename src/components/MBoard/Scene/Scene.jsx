import {OrbitControls, Sky, useGLTF} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Physics} from '@react-three/rapier'
import React, {Suspense, useEffect} from 'react'
import {usePrevious} from '../../../hooks/usePrevious'
import {useZustand} from '../../../store/useZustand'
import {deepClone} from '../../../utils/common'
import {
  CHARACTERS_GAP,
  CHARACTER_COL_CNT,
  CHARACTER_URLS,
  FLOATING_HEIGHT,
  GRAVITY,
  INIT_ORIGIN_POS,
  LEFT_TREES_POS,
  MAX_CHARACTER_CNT,
  QUIT_ORIGIN_POS,
  RIGHT_TREES_POS,
  TREE_URLS,
  VIEW_ORIGIN_POS
} from '../../../utils/constants'
import {Billboard} from './Billboard'
import {BillboardHtml} from './BillboardHtml'
import {Camera} from './Camera'
import {Character} from './Character'
import {Land} from './Land'
import {Tree} from './Tree'


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

  useEffect(() => {
    const diffRealtimeVisitors = realtimeVisitors - prevRealtimeVisitors
    const newUsersInitPos = deepClone(usersInitPos)
    const newUsersDesPos = deepClone(usersDesPos)

    if (diffRealtimeVisitors > 0) {
      for (let i = 0; i < diffRealtimeVisitors; i++) {
        const endUserIndex = (prevLastCharacterIndex + i + 1) % MAX_CHARACTER_CNT
        const x = endUserIndex % CHARACTER_COL_CNT
        const y = (endUserIndex - x) / CHARACTER_COL_CNT
        newUsersInitPos[endUserIndex] = [
          INIT_ORIGIN_POS[0] - ((x * CHARACTERS_GAP) + Math.random()),
          FLOATING_HEIGHT,
          INIT_ORIGIN_POS[2] - ((y * CHARACTERS_GAP) + Math.random()),
        ]
        newUsersDesPos[endUserIndex] = [
          VIEW_ORIGIN_POS[0] - ((x * CHARACTERS_GAP) + Math.random()),
          FLOATING_HEIGHT,
          VIEW_ORIGIN_POS[2] - ((y * CHARACTERS_GAP) + Math.random()),
        ]
      }

      const newPrevLastCharacterIndex = (prevLastCharacterIndex + diffRealtimeVisitors) % MAX_CHARACTER_CNT
      setPrevLastCharacterIndex(newPrevLastCharacterIndex)
    } else {
      const prevFirstCharacterIndex = (MAX_CHARACTER_CNT + (prevLastCharacterIndex - prevRealtimeVisitors + 1)) % MAX_CHARACTER_CNT
      const absDiffRealtimeVisitors = Math.abs(diffRealtimeVisitors)

      for (let i = 0; i < absDiffRealtimeVisitors; i++) {
        const startUserIndex = (prevFirstCharacterIndex + i) % MAX_CHARACTER_CNT
        newUsersDesPos[startUserIndex] = QUIT_ORIGIN_POS
      }
    }

    // customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersInitPos: ', newUsersInitPos)
    setUsersInitPos(newUsersInitPos)
    // customDebug().log('Scene#useEffect[realtimeVisitors]: newUsersDesPos: ', newUsersDesPos)
    setUsersDesPos(newUsersDesPos)
  }, [realtimeVisitors])

  return (
    <Canvas>
      {/* <Perf position="bottom-left"/> */}

      <OrbitControls
        makeDefault
        maxDistance={220}
        maxPolarAngle={Math.PI * 0.49}
      />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={0.5}
      />
      <ambientLight intensity={2} />

      {/* <axesHelper args={[AXIS_SIZE]}/> */}

      <Suspense>
        <Physics gravity={[0, -GRAVITY, 0]}>
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
          <Billboard />
          {isSeeingBillboard && <BillboardHtml />}
          {Array.from({length: MAX_CHARACTER_CNT}).map((v, index) =>
            <Character
              key={index}
              index={index}
            />,
          )}
          {/* <Ground/> */}
          {TREE_URLS.map((url, index) =>
            <Tree
              key={index}
              url={url}
              position={LEFT_TREES_POS}
              rotation={[0, Math.PI / 2, 0]}
            />,
          )}
          {TREE_URLS.map((url, index) =>
            <Tree
              key={index}
              url={url}
              position={RIGHT_TREES_POS}
              rotation={[0, Math.PI / 2, 0]}
            />,
          )}
          <Land />
          {/* <Debug/> */}
        </Physics>
      </Suspense>

      <Camera />
    </Canvas>
  )
}


const distance = 450
const sunPosition = [0, 450, 0]
const inclination = 0
const azimuth = 0.25
const mieCoefficient = 0
const mieDirectionalG = 0
const rayleigh = 0.03
const turbidity = 0

CHARACTER_URLS.forEach((url) => {
  useGLTF.preload(url)
})
