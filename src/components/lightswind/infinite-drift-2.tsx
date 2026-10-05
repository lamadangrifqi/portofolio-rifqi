// Adapted from Lightswind UI Infinite Drift 2 (MIT, codewithMUHILAN).
// See docs/licenses/LIGHTSWIND-LICENSE. No stock images are supplied.
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
export interface InfiniteDrift2Props {
  images?: string[];
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  borderRadius?: number;
  curve?: number;
  curveRadius?: number;
  zoom?: number;
  tileRotation?: number;
  grayscale?: number;
  vignette?: number;
  autoScrollX?: number;
  autoScrollY?: number;
  enableDrag?: boolean;
  enableWheel?: boolean;
  axis?: "both" | "x" | "y";
  dragSensitivity?: number;
  wheelSensitivity?: number;
  friction?: number;
  backgroundColor?: string;
  dpr?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  children?: React.ReactNode;
  paused?: boolean;
  onUnavailable?: () => void;
  onDragChange?: (dragging: boolean) => void;
}
export interface InfiniteDrift2Ref {
  resetOffset: () => void;
  setOffset: (x: number, y: number) => void;
  getOffset: () => { x: number; y: number };
}
const EMPTY_IMAGES: string[] = [];
// Vertex Shader: Fullscreen quad
const VS_SOURCE = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Fragment Shader: 3D Inverted Dome Lens Distortion & Procedural Tiled Grid
const FS_SOURCE = `
  precision highp float;
  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform float uDpr;
  uniform float uImageCount;
  uniform vec2 uOffset;
  uniform vec2 uTileSize;
  uniform float uGap;
  uniform float uBorderRadius;
  uniform float uCurve;
  uniform float uCurveRadius;
  uniform float uZoom;
  uniform float uTileRotation;
  uniform float uGrayscale;
  uniform float uVignette;
  uniform sampler2D uAtlas;
  uniform vec2 uAtlasGrid;

  // Signed distance function for rounded rectangle
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    // 1. Normalized center coordinates (-1 to 1 based on minimal dimension)
    vec2 p = (gl_FragCoord.xy / uDpr - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    float r = length(p);

    // 2. Inverted Dome / Lens Distortion Formula
    float maxDist = max(0.001, uCurveRadius);
    float normR = clamp(r / maxDist, 0.0, 1.0);
    float distortion = 1.0 + uCurve * pow(normR, 2.0) - uZoom;
    vec2 distortedCoord = p * distortion;

    // Convert back to pixel coordinate space with dynamic panning offset
    vec2 worldPos = distortedCoord * min(uResolution.x, uResolution.y) + uOffset;

    // 3. Tile Calculations
    vec2 stepSize = uTileSize + vec2(uGap);
    vec2 cell = floor(worldPos / stepSize);
    vec2 localPos = mod(worldPos, stepSize) - 0.5 * stepSize;

    // Tile individual rotation
    float angle = radians(uTileRotation);
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedLocal = rot * localPos;

    // Anti-aliased rounded rectangle mask
    float d = sdRoundedBox(rotatedLocal, uTileSize * 0.5, uBorderRadius);
    float alpha = 1.0 - smoothstep(-0.8, 0.8, d);

    if (alpha <= 0.0) {
      discard;
    }

    // 4. Map cell coordinates to atlas texture grid (3x3 default)
    vec2 tileUv = clamp((rotatedLocal / uTileSize) + 0.5, 0.0, 1.0);
    
    // Atlas index with positive modulo
    vec2 atlasCell = mod(mod(cell, uAtlasGrid) + uAtlasGrid, uAtlasGrid);
    
    // Invert row index to match Canvas 2D top-down vs WebGL bottom-up
    float index = mod(atlasCell.y * uAtlasGrid.x + atlasCell.x, uImageCount);
    atlasCell = vec2(mod(index, uAtlasGrid.x), floor(index / uAtlasGrid.x));
    float atlasRow = uAtlasGrid.y - 1.0 - atlasCell.y;
    vec2 uv = (vec2(atlasCell.x, atlasRow) + tileUv) / uAtlasGrid;

    vec4 texColor = texture2D(uAtlas, uv);

    // Grayscale transition
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(texColor.rgb, vec3(gray), clamp(uGrayscale, 0.0, 1.0));

    // Vignette lighting
    float vigFactor = smoothstep(0.35, 1.15, r * (1.0 + uVignette * 0.5));
    color = mix(color, color * (1.0 - uVignette * vigFactor), clamp(uVignette, 0.0, 1.0));

    gl_FragColor = vec4(color, texColor.a * alpha);
  }
`;

export const InfiniteDrift2 = forwardRef<
  InfiniteDrift2Ref,
  InfiniteDrift2Props
>(function InfiniteDrift2(
  {
    images = EMPTY_IMAGES,
    tileWidth = 220,
    tileHeight = 220,
    gap = 18,
    borderRadius = 18,
    curve = 0.35,
    curveRadius = 1.5,
    zoom = 0.08,
    tileRotation = 0,
    grayscale = 0,
    vignette = 0.25,
    autoScrollX = 0.4,
    autoScrollY = 0.15,
    enableDrag = true,
    enableWheel = true,
    axis = "both",
    dragSensitivity = 1,
    wheelSensitivity = 0.6,
    friction = 0.92,
    backgroundColor = "transparent",
    dpr = 1.5,
    height = "100%",
    width = "100%",
    className = "",
    children,
    paused = false,
    onUnavailable,
    onDragChange,
  },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const wake = useRef<() => void>(() => {});
  const dragCallback = useRef(onDragChange);
  dragCallback.current = onDragChange;
  const unavailable = useRef(onUnavailable);
  unavailable.current = onUnavailable;
  const props = useRef({
    tileWidth,
    tileHeight,
    gap,
    borderRadius,
    curve,
    curveRadius,
    zoom,
    tileRotation,
    grayscale,
    vignette,
    autoScrollX,
    autoScrollY,
    axis,
    friction,
    dpr,
    paused,
  });
  props.current = {
    tileWidth,
    tileHeight,
    gap,
    borderRadius,
    curve,
    curveRadius,
    zoom,
    tileRotation,
    grayscale,
    vignette,
    autoScrollX,
    autoScrollY,
    axis,
    friction,
    dpr,
    paused,
  };
  useImperativeHandle(
    ref,
    () => ({
      resetOffset() {
        offset.current = { x: 0, y: 0 };
        velocity.current = { x: 0, y: 0 };
        wake.current();
      },
      setOffset(x, y) {
        offset.current = { x, y };
        velocity.current = { x: 0, y: 0 };
        wake.current();
      },
      getOffset: () => ({ ...offset.current }),
    }),
    [],
  );
  useEffect(() => {
    wake.current();
  }, [paused, autoScrollX, autoScrollY]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !images.length) return;
    let alive = true,
      visible = false,
      frame = 0,
      lastTime = performance.now();
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      unavailable.current?.();
      return;
    }
    const compile = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(VS_SOURCE, gl.VERTEX_SHADER),
      fs = compile(FS_SOURCE, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (program) gl.deleteProgram(program);
      unavailable.current?.();
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
      unavailable.current?.();
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const cols = Math.ceil(Math.sqrt(images.length)),
      rows = Math.ceil(images.length / cols);
    const maxDim = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE));
    const cell = Math.max(
      1,
      Math.min(384, Math.floor(maxDim / Math.max(cols, rows))),
    );
    const atlas = document.createElement("canvas");
    atlas.width = cols * cell;
    atlas.height = rows * cell;
    const ctx = atlas.getContext("2d");
    if (!ctx) {
      unavailable.current?.();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, atlas.width, atlas.height);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlas,
      );
    };
    upload();
    const uniforms = Object.fromEntries(
      [
        "uResolution",
        "uDpr",
        "uOffset",
        "uTileSize",
        "uGap",
        "uBorderRadius",
        "uCurve",
        "uCurveRadius",
        "uZoom",
        "uTileRotation",
        "uGrayscale",
        "uVignette",
        "uAtlas",
        "uAtlasGrid",
        "uImageCount",
      ].map((name) => [name, gl.getUniformLocation(program, name)]),
    );
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const render = (time: number) => {
      frame = 0;
      if (!alive || !visible || document.hidden) return;
      const p = props.current,
        dt = Math.min(0.05, Math.max(0, (time - lastTime) / 1000));
      lastTime = time;
      if (!pointer.current) {
        if (p.axis !== "y")
          offset.current.x +=
            (velocity.current.x + (p.paused ? 0 : p.autoScrollX * 60)) * dt;
        if (p.axis !== "x")
          offset.current.y +=
            (velocity.current.y + (p.paused ? 0 : p.autoScrollY * 60)) * dt;
        const decay = Math.pow(
          Math.min(0.99, Math.max(0, p.friction)),
          dt * 60,
        );
        velocity.current.x *= decay;
        velocity.current.y *= decay;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, Math.max(1, p.dpr));
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;
      if (
        canvas.width !== Math.round(w * ratio) ||
        canvas.height !== Math.round(h * ratio)
      ) {
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.uAtlas, 0);
      gl.uniform2f(uniforms.uResolution, w, h);
      gl.uniform1f(uniforms.uDpr, ratio);
      gl.uniform2f(uniforms.uOffset, offset.current.x, offset.current.y);
      gl.uniform2f(uniforms.uTileSize, p.tileWidth, p.tileHeight);
      gl.uniform1f(uniforms.uGap, p.gap);
      gl.uniform1f(uniforms.uBorderRadius, p.borderRadius);
      gl.uniform1f(uniforms.uCurve, p.curve);
      gl.uniform1f(uniforms.uCurveRadius, p.curveRadius);
      gl.uniform1f(uniforms.uZoom, p.zoom);
      gl.uniform1f(uniforms.uTileRotation, p.tileRotation);
      gl.uniform1f(uniforms.uGrayscale, p.grayscale);
      gl.uniform1f(uniforms.uVignette, p.vignette);
      gl.uniform2f(uniforms.uAtlasGrid, cols, rows);
      gl.uniform1f(uniforms.uImageCount, images.length);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      container.dataset.offset = `${offset.current.x.toFixed(2)},${offset.current.y.toFixed(2)}`;
      if (
        (!p.paused && (p.autoScrollX || p.autoScrollY)) ||
        Math.abs(velocity.current.x) + Math.abs(velocity.current.y) > 0.1
      )
        frame = requestAnimationFrame(render);
    };
    const requestDraw = () => {
      if (!alive || !visible || document.hidden || frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(render);
    };
    wake.current = requestDraw;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(container);
    const resize = new ResizeObserver(requestDraw);
    resize.observe(container);
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else requestDraw();
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      unavailable.current?.();
    };
    canvas.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", visibility);
    const loaders: HTMLImageElement[] = [];
    let loaded = 0,
      next = 0;
    const loadNext = () => {
      if (!alive || next >= images.length) return;
      const i = next++,
        img = new Image();
      loaders.push(img);
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!alive) return;
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        ctx.drawImage(
          img,
          (img.naturalWidth - size) / 2,
          (img.naturalHeight - size) / 2,
          size,
          size,
          (i % cols) * cell,
          Math.floor(i / cols) * cell,
          cell,
          cell,
        );
        try {
          upload();
          container.dataset.loadedCount = String(++loaded);
          container.dataset.renderState = "ready";
          requestDraw();
        } catch {
          unavailable.current?.();
        }
        loadNext();
      };
      img.onerror = () => {
        if (alive) {
          unavailable.current?.();
          loadNext();
        }
      };
      img.src = images[i];
    };
    for (let i = 0; i < Math.min(4, images.length); i++) loadNext();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      wake.current = () => {};
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      for (const img of loaders) {
        img.onload = null;
        img.onerror = null;
      }
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (pointer.current) {
        pointer.current = null;
        dragCallback.current?.(false);
      }
    };
  }, [images]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableWheel) return;
    const wheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      e.stopPropagation();
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? container.clientHeight : 1;
      if (axis !== "y") offset.current.x += e.deltaX * unit * wheelSensitivity;
      if (axis !== "x") offset.current.y -= e.deltaY * unit * wheelSensitivity;
      velocity.current = { x: 0, y: 0 };
      wake.current();
    };
    container.addEventListener("wheel", wheel, { passive: false });
    return () => container.removeEventListener("wheel", wheel);
  }, [enableWheel, axis, wheelSensitivity]);
  const release = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    dragCallback.current?.(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    wake.current();
  };
  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Galeri foto interaktif"
      tabIndex={0}
      className={`relative overflow-hidden select-none w-full rounded-2xl ${enableDrag ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{
        height,
        width,
        backgroundColor,
        touchAction: enableDrag ? "none" : "pan-y",
      }}
      {...(enableWheel ? { "data-lenis-prevent-wheel": true } : {})}
      {...(enableDrag ? { "data-lenis-prevent-touch": true } : {})}
      onPointerDown={(event) => {
        if (!enableDrag || event.button !== 0 || pointer.current) return;
        pointer.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
        };
        velocity.current = { x: 0, y: 0 };
        event.currentTarget.setPointerCapture(event.pointerId);
        dragCallback.current?.(true);
      }}
      onPointerMove={(event) => {
        const start = pointer.current;
        if (!start || start.id !== event.pointerId) return;
        const dx = (event.clientX - start.x) * dragSensitivity,
          dy = (event.clientY - start.y) * dragSensitivity;
        if (axis !== "y") {
          offset.current.x -= dx;
          velocity.current.x = -dx * 20;
        }
        if (axis !== "x") {
          offset.current.y += dy;
          velocity.current.y = dy * 20;
        }
        pointer.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
        };
        wake.current();
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onKeyDown={(event) => {
        const keys: Record<string, [number, number]> = {
          ArrowLeft: [-60, 0],
          ArrowRight: [60, 0],
          ArrowUp: [0, 60],
          ArrowDown: [0, -60],
        };
        const delta = keys[event.key];
        if (!delta) return;
        event.preventDefault();
        velocity.current = { x: 0, y: 0 };
        if (axis !== "y") offset.current.x += delta[0];
        if (axis !== "x") offset.current.y += delta[1];
        wake.current();
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  );
});
export default InfiniteDrift2;
