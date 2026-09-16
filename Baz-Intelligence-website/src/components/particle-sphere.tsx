'use client'

/* eslint-disable react-hooks/purity, react-hooks/immutability */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import * as THREE from 'three'

export type ParticleShape = 'solid' | 'cubelets'

function ParticleCloud({
  count = 90000,
  dragRotation,
  hover,
  radius = 2.25,
  shape,
  scale = 1,
}: {
  count?: number
  dragRotation: { x: number; y: number }
  hover: { active: boolean; x: number; y: number }
  radius?: number
  shape: ParticleShape
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const autoRotationYRef = useRef(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const randoms = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
      let x = (Math.random() * 2 - 1) * radius
      let y = (Math.random() * 2 - 1) * radius
      let z = (Math.random() * 2 - 1) * radius

      if (shape === 'cubelets') {
        const cubeletIndex = index % 27
        const cubeX = (cubeletIndex % 3) - 1
        const cubeY = (Math.floor(cubeletIndex / 3) % 3) - 1
        const cubeZ = Math.floor(cubeletIndex / 9) - 1
        const cubeletSpacing = radius * 0.74
        const cubeletRadius = radius * 0.23

        x = cubeX * cubeletSpacing + (Math.random() * 2 - 1) * cubeletRadius
        y = cubeY * cubeletSpacing + (Math.random() * 2 - 1) * cubeletRadius
        z = cubeZ * cubeletSpacing + (Math.random() * 2 - 1) * cubeletRadius

        const borderBias = Math.random()

        if (borderBias < 0.58) {
          const lockedAxes = borderBias < 0.44 ? 1 : borderBias < 0.56 ? 2 : 3
          const axes = [0, 1, 2].sort(() => Math.random() - 0.5).slice(0, lockedAxes)

          for (const axis of axes) {
            const value = (Math.random() < 0.5 ? -1 : 1) * (cubeletRadius + (Math.random() - 0.5) * 0.025)

            if (axis === 0) x = cubeX * cubeletSpacing + value
            if (axis === 1) y = cubeY * cubeletSpacing + value
            if (axis === 2) z = cubeZ * cubeletSpacing + value
          }
        }
      }

      if (Math.random() < 0.32) {
        const axis = Math.floor(Math.random() * 3)
        const value = (Math.random() < 0.5 ? -1 : 1) * (radius + (Math.random() - 0.5) * 0.08)

        if (shape === 'solid') {
          if (axis === 0) x = value
          if (axis === 1) y = value
          if (axis === 2) z = value
        }
      }

      const distortion =
        Math.sin(x * 3.1 + z * 1.4) * 0.025 +
        Math.cos(y * 2.8 - x) * 0.018 +
        (Math.random() - 0.5) * 0.08

      x += distortion
      y -= distortion * 0.6
      z += distortion * 0.8

      positions[index * 3] = x
      positions[index * 3 + 1] = y
      positions[index * 3 + 2] = z
      sizes[index] = 0.38 + Math.random() * 0.92
      randoms[index] = Math.random()
    }

    const nextGeometry = new THREE.BufferGeometry()
    nextGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    nextGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    nextGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    return nextGeometry
  }, [count, radius, shape])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uHover: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uParticleColor: { value: new THREE.Color('#111111') },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aRandom;

        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uHover;
        uniform vec2 uPointer;
        uniform vec3 uParticleColor;

        varying float vAlpha;

        void main() {
          vec3 particlePosition = position;

          float twinkle =
            0.72 +
            0.28 *
            sin(
              uTime *
              (
                1.0 +
                aRandom *
                1.55
              ) +
              aRandom *
              48.0
            );

          vec4 modelViewPosition =
            modelViewMatrix *
            vec4(
              particlePosition,
              1.0
            );

          gl_Position =
            projectionMatrix *
            modelViewPosition;

          vec2 screenPosition =
            gl_Position.xy /
            gl_Position.w;

          float hoverDistance =
            distance(
              screenPosition,
              uPointer
            );

          float hoverWave =
            smoothstep(
              0.32,
              0.0,
              hoverDistance
            ) *
            uHover;

          float hoverPulse =
            hoverWave *
            (
              0.82 +
              sin(
                uTime * 5.2 +
                hoverDistance * 18.0
              ) *
              0.18
            );

          vec2 hoverDirection =
            normalize(
              screenPosition -
              uPointer +
              vec2(0.001)
            );

          gl_Position.xy +=
            hoverDirection *
            hoverPulse *
            0.028 *
            gl_Position.w;

          vAlpha =
            twinkle;

          gl_PointSize =
            aSize *
            2.25 *
            uPixelRatio *
            (
              7.0 /
              -modelViewPosition.z
            );
        }
      `,
      fragmentShader: `
        uniform vec3 uParticleColor;

        varying float vAlpha;

        void main() {
          vec2 centeredPoint =
            gl_PointCoord - 0.5;

          float distanceFromCenter =
            length(centeredPoint);

          float brightCore =
            smoothstep(
              0.26,
              0.0,
              distanceFromCenter
            );

          float softGlow =
            smoothstep(
              0.5,
              0.0,
              distanceFromCenter
            ) *
            0.24;

          float alpha =
            (
              brightCore +
              softGlow
            ) *
            vAlpha *
            0.92;

          if (
            alpha < 0.015
          ) {
            discard;
          }

          gl_FragColor =
            vec4(
              uParticleColor,
              alpha
            );
        }
      `,
    })
  }, [])

  useEffect(() => {
    function updatePixelRatio() {
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    updatePixelRatio()
    window.addEventListener('resize', updatePixelRatio)

    return () => {
      window.removeEventListener('resize', updatePixelRatio)
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function updateThemeColor() {
      setIsDarkMode(document.documentElement.classList.contains('dark') || mediaQuery.matches)
    }

    updateThemeColor()
    mediaQuery.addEventListener('change', updateThemeColor)

    return () => {
      mediaQuery.removeEventListener('change', updateThemeColor)
    }
  }, [])

  useFrame((state, delta) => {
    const group = groupRef.current

    if (!group) return

    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uHover.value = THREE.MathUtils.lerp(material.uniforms.uHover.value as number, hover.active ? 1 : 0, 0.12)
    ;(material.uniforms.uParticleColor.value as THREE.Color).set(isDarkMode ? '#ffffff' : '#111111')
    ;(material.uniforms.uPointer.value as THREE.Vector2).set(hover.x, hover.y)
    const dragInfluence = Math.min(1, Math.hypot(dragRotation.x, dragRotation.y) / 0.4)
    autoRotationYRef.current += delta * 0.12 * (1 - dragInfluence * 0.72)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0.55 + dragRotation.x, 0.08)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, autoRotationYRef.current + dragRotation.y, 0.08)
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, 0.22, 0.025)
    group.position.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.055
  })

  return (
    <group ref={groupRef} scale={scale}>
      <points geometry={geometry} material={material} />
    </group>
  )
}

function ResponsiveParticleCloud({
  dragRotation,
  hover,
  shape,
}: {
  dragRotation: { x: number; y: number }
  hover: { active: boolean; x: number; y: number }
  shape: ParticleShape
}) {
  const { viewport } = useThree()
  const scale = Math.min(1.56, viewport.width / 4.44)

  return <ParticleCloud dragRotation={dragRotation} hover={hover} shape={shape} scale={scale} />
}

export function ParticleSphere({
  className = '',
  shape = 'solid',
}: {
  className?: string
  shape?: ParticleShape
}) {
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState({ active: false, x: 0, y: 0 })
  const dragStateRef = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
  })

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    dragStateRef.current.dragging = true
    dragStateRef.current.lastX = event.clientX
    dragStateRef.current.lastY = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setHover({
      active: true,
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    })

    const dragState = dragStateRef.current

    if (!dragState.dragging) return

    const deltaX = event.clientX - dragState.lastX
    const deltaY = event.clientY - dragState.lastY

    dragState.lastX = event.clientX
    dragState.lastY = event.clientY
    dragState.rotationX += deltaY * 0.012
    dragState.rotationY += deltaX * 0.012

    setDragRotation({
      x: dragState.rotationX,
      y: dragState.rotationY,
    })
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    dragStateRef.current.dragging = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function handlePointerLeave() {
    dragStateRef.current.dragging = false
    setHover((current) => ({ ...current, active: false }))
  }

  return (
    <section
      className={`particle-sphere cursor-grab touch-none active:cursor-grabbing ${className} [&_canvas]:block [&_canvas]:size-full`}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => setHover((current) => ({ ...current, active: true }))}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Canvas
        camera={{
          position: [0, 0, 12.4],
          fov: 64,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ResponsiveParticleCloud dragRotation={dragRotation} hover={hover} shape={shape} />
      </Canvas>
    </section>
  )
}
