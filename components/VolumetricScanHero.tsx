'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Play, Pause, Zap, Layers } from 'lucide-react'

export default function VolumetricScanHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliceProgress, setSliceProgress] = useState(65)
  const [isScanning, setIsScanning] = useState(true)
  const [visualMode, setVisualMode] = useState<'quantum' | 'lattice' | 'cyber'>('quantum')
  
  const isScanningRef = useRef(true)
  isScanningRef.current = isScanning

  const visualModeRef = useRef<'quantum' | 'lattice' | 'cyber'>('quantum')
  visualModeRef.current = visualMode

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 540
    const height = container.clientHeight || 540

    // 1. Scene, Camera, High-Performance WebGL Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    camera.position.set(0, 0, 48)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Master Rotatable AI Core Group
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // 2. Inner Glowing Quantum Nucleus (Pulsing Icosahedron)
    const nucleusGeo = new THREE.IcosahedronGeometry(5.2, 2)
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x6e8eff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    })
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat)
    coreGroup.add(nucleus)

    // Inner Solid Glow Sphere
    const innerGlowGeo = new THREE.SphereGeometry(3.6, 32, 32)
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0x3d5afe,
      transparent: true,
      opacity: 0.85,
    })
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat)
    coreGroup.add(innerGlow)

    // 3. Middle Polyhedral Tensor Lattice (Dodecahedron Cage)
    const latticeGeo = new THREE.DodecahedronGeometry(9.4, 1)
    const latticeWireGeo = new THREE.WireframeGeometry(latticeGeo)
    const latticeWireMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const latticeWire = new THREE.LineSegments(latticeWireGeo, latticeWireMat)
    coreGroup.add(latticeWire)

    // Lattice Vertex Nodes (Glowing Joint Spheres)
    const latticePos = latticeGeo.attributes.position
    const jointGeo = new THREE.SphereGeometry(0.28, 8, 8)
    const jointMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    })
    const jointsGroup = new THREE.Group()
    for (let i = 0; i < latticePos.count; i += 3) {
      const joint = new THREE.Mesh(jointGeo, jointMat)
      joint.position.set(latticePos.getX(i), latticePos.getY(i), latticePos.getZ(i))
      jointsGroup.add(joint)
    }
    coreGroup.add(jointsGroup)

    // 4. Outer Translucent Hologram Facet Shell (Icosahedron Custom Shader)
    const outerGeo = new THREE.IcosahedronGeometry(13.8, 3)
    const outerUniforms = {
      time: { value: 0 },
      scanZ: { value: 0 },
      colorA: { value: new THREE.Color('#0c194a') },
      colorB: { value: new THREE.Color('#00f0ff') },
      rimColor: { value: new THREE.Color('#8aa6ff') },
    }

    const outerMat = new THREE.ShaderMaterial({
      uniforms: outerUniforms,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float scanZ;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 rimColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec3 vViewPosition;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(vViewPosition);

          // Fresnel Rim Light
          float fresnel = pow(1.0 - max(0.0, dot(V, N)), 2.5);

          // Cyber Grid Pattern on Facets
          float grid = abs(sin(vPosition.x * 1.5 + time * 1.2)) * 
                       abs(sin(vPosition.y * 1.5 - time * 0.8)) * 
                       abs(sin(vPosition.z * 1.5 + time * 1.0));
          grid = smoothstep(0.7, 0.95, grid);

          // Laser Scanning Slice Wave
          float distToLaser = abs(vPosition.z - scanZ);
          float laser = smoothstep(1.5, 0.0, distToLaser) * 1.6;

          // Energy Pulse Waves
          float wave = sin(length(vPosition) * 0.8 - time * 2.5);
          float pulse = pow(max(0.0, wave), 4.0) * 0.5;

          // Base Color Blend
          vec3 col = mix(colorA, colorB, fresnel * 0.7 + pulse * 0.3);
          col += rimColor * (fresnel * 1.2);
          col += vec3(0.1, 0.9, 1.0) * (grid * 0.6);
          col += vec3(0.5, 0.8, 1.0) * laser;

          float alpha = clamp(0.15 + fresnel * 0.75 + laser * 0.5 + grid * 0.35, 0.0, 0.95);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const outerShell = new THREE.Mesh(outerGeo, outerMat)
    coreGroup.add(outerShell)

    // Outer Wireframe Cage Layer
    const outerWireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(13.85, 2))
    const outerWireMat = new THREE.LineBasicMaterial({
      color: 0x6e8eff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    })
    const outerWire = new THREE.LineSegments(outerWireGeo, outerWireMat)
    coreGroup.add(outerWire)

    // 5. Concentric Gyroscopic Orbital Gimbal Rings
    // Ring 1 (X-Axis Gyro)
    const ring1Geo = new THREE.TorusGeometry(17.5, 0.16, 16, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    coreGroup.add(ring1)

    // Ring 2 (Y-Axis Gyro with Segments)
    const ring2Geo = new THREE.TorusGeometry(19.2, 0.18, 16, 100)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 2
    coreGroup.add(ring2)

    // Ring 3 (Diagonal Outer HUD Track)
    const ring3Geo = new THREE.RingGeometry(21.5, 22.0, 80)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = Math.PI / 4
    ring3.rotation.y = Math.PI / 6
    coreGroup.add(ring3)

    // 6. Glowing Neural Flow Spline Ribbons (Trefoil Attention Stream)
    const curvePoints: THREE.Vector3[] = []
    const numCurvePoints = 120
    for (let i = 0; i <= numCurvePoints; i++) {
      const t = (i / numCurvePoints) * Math.PI * 2
      const x = (10 + 4 * Math.cos(3 * t)) * Math.cos(2 * t)
      const y = (10 + 4 * Math.cos(3 * t)) * Math.sin(2 * t)
      const z = 6 * Math.sin(3 * t)
      curvePoints.push(new THREE.Vector3(x * 0.72, y * 0.72, z * 0.72))
    }
    const flowCurve = new THREE.CatmullRomCurve3(curvePoints)
    const flowTubeGeo = new THREE.TubeGeometry(flowCurve, 120, 0.18, 8, true)
    const flowTubeMat = new THREE.MeshBasicMaterial({
      color: 0x80b3ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    const flowTube = new THREE.Mesh(flowTubeGeo, flowTubeMat)
    coreGroup.add(flowTube)

    // 7. Volumetric Tensor Swarm (480 Floating Synaptic Nodes)
    const particleCount = 480
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 12.0 + Math.random() * 9.5

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = r * Math.cos(phi)

      const isCyan = Math.random() > 0.4
      particleColors[i * 3] = isCyan ? 0.0 : 0.5
      particleColors[i * 3 + 1] = isCyan ? 0.94 : 0.3
      particleColors[i * 3 + 2] = 1.0
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const particleCloud = new THREE.Points(particleGeo, particleMat)
    coreGroup.add(particleCloud)

    // 8. Laser Scanning Cross-Section Plane
    const laserPlaneGeo = new THREE.PlaneGeometry(32, 32)
    const laserPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const laserPlane = new THREE.Mesh(laserPlaneGeo, laserPlaneMat)
    coreGroup.add(laserPlane)

    // Initial Core Tilt
    coreGroup.rotation.x = 0.25
    coreGroup.rotation.y = -0.35

    // 9. Interactive 360° Drag & Touch Orbit Controls
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotX = 0.25
    let targetRotY = -0.35

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotY += deltaX * 0.009
        targetRotX += deltaY * 0.009
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        const rect = container.getBoundingClientRect()
        const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const my = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
        coreGroup.position.x = mx * 1.5
        coreGroup.position.y = my * 1.2
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX
        const deltaY = e.touches[0].clientY - prevMouseY
        targetRotY += deltaX * 0.012
        targetRotX += deltaY * 0.012
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    // 10. High-Performance Render Loop
    let currentScanZ = -14.0
    let scanSpeed = 0.22
    let clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Idle smooth auto-rotation
      if (!isDragging) {
        targetRotY += 0.004
      }

      // Smooth inertia dampening
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.08
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.08

      // Internal Sub-element Rotations (Gyroscopic effect)
      nucleus.rotation.x = time * 0.4
      nucleus.rotation.y = time * 0.6
      const pulseScale = 1 + Math.sin(time * 3.0) * 0.09
      nucleus.scale.set(pulseScale, pulseScale, pulseScale)
      innerGlow.scale.set(pulseScale * 0.95, pulseScale * 0.95, pulseScale * 0.95)

      latticeWire.rotation.y = -time * 0.35
      latticeWire.rotation.z = time * 0.2
      jointsGroup.rotation.y = -time * 0.35
      jointsGroup.rotation.z = time * 0.2

      ring1.rotation.z = time * 0.5
      ring2.rotation.z = -time * 0.4
      ring3.rotation.z = time * 0.15

      flowTube.rotation.z = time * 0.3
      flowTube.rotation.y = time * 0.2

      particleCloud.rotation.y = -time * 0.06

      // Laser Scanner oscillation
      if (isScanningRef.current) {
        currentScanZ += scanSpeed
        if (currentScanZ >= 14.0 || currentScanZ <= -14.0) {
          scanSpeed = -scanSpeed
        }
      }

      outerUniforms.time.value = time
      outerUniforms.scanZ.value = currentScanZ
      laserPlane.position.z = currentScanZ

      // Visual Mode Toggles
      const mode = visualModeRef.current
      if (mode === 'lattice') {
        outerShell.visible = false
        latticeWireMat.opacity = 0.85
        outerWire.visible = true
      } else if (mode === 'cyber') {
        outerShell.visible = true
        outerUniforms.colorB.value.set('#7c3aed')
        latticeWireMat.opacity = 0.7
      } else {
        outerShell.visible = true
        outerUniforms.colorB.value.set('#00f0ff')
        latticeWireMat.opacity = 0.55
      }

      renderer.render(scene, camera)
    }

    animate()

    // Sync HUD depth counter
    const interval = setInterval(() => {
      setSliceProgress(Math.round(((currentScanZ + 14) / 28) * 100))
    }, 100)

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || 540
      const h = container.clientHeight || 540
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(interval)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      nucleusGeo.dispose()
      nucleusMat.dispose()
      innerGlowGeo.dispose()
      innerGlowMat.dispose()
      latticeGeo.dispose()
      latticeWireGeo.dispose()
      latticeWireMat.dispose()
      jointGeo.dispose()
      jointMat.dispose()
      outerGeo.dispose()
      outerMat.dispose()
      outerWireGeo.dispose()
      outerWireMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      ring3Geo.dispose()
      ring3Mat.dispose()
      flowTubeGeo.dispose()
      flowTubeMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      laserPlaneGeo.dispose()
      laserPlaneMat.dispose()
    }
  }, [])

  const cycleMode = () => {
    const modes: ('quantum' | 'lattice' | 'cyber')[] = ['quantum', 'lattice', 'cyber']
    const next = modes[(modes.indexOf(visualMode) + 1) % modes.length]
    setVisualMode(next)
  }

  return (
    <div className="three-scan-container" aria-label="3D Quantum AI Neural Core">
      {/* Three.js 3D Canvas */}
      <div ref={containerRef} className="three-canvas-wrapper" />

      {/* Cyber HUD Overlay */}
      <div className="scan-hud-top">
        <div className="hud-badge">
          <span className="hud-live-dot" />
          <span>QUANTUM AI CORE // TENSOR V9.4</span>
        </div>
        <div className="hud-slice-counter">
          TENSOR SYNC: <strong>{String(sliceProgress).padStart(3, '0')}%</strong> · 1,024 TOKENS/S
        </div>
      </div>

      <div className="scan-hud-bottom">
        <div className="hud-tech-meta">
          <span>
            <Zap size={12} className="text-cyan-400 inline mr-1" />
            ATTENTION MATRIX · {visualMode.toUpperCase()} MODE
          </span>
          <span>DRAG TO ROTATE 360° // INTERACTIVE</span>
        </div>

        <div className="hud-controls">
          <button
            type="button"
            className="hud-btn"
            onClick={cycleMode}
            title="Cycle 3D Shader Preset"
          >
            <Layers size={13} />
            <span>PRESET: {visualMode.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className="hud-btn"
            onClick={() => setIsScanning(!isScanning)}
            title={isScanning ? 'Pause Laser Scan' : 'Resume Laser Scan'}
          >
            {isScanning ? <Pause size={13} /> : <Play size={13} />}
            <span>{isScanning ? 'PAUSE' : 'RESUME'}</span>
          </button>
        </div>
      </div>

      {/* Futuristic Corner Reticles */}
      <div className="scan-reticle top-left" />
      <div className="scan-reticle top-right" />
      <div className="scan-reticle bottom-left" />
      <div className="scan-reticle bottom-right" />
    </div>
  )
}
