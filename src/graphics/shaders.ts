/* GLSL shaders preserved from the original standalone HTML. */

export const DUST_VERTEX = /* glsl */ `
          attribute float aSeed;
          uniform float uTime;
          uniform float uSize;
          varying float vSeed;

          void main() {
            vSeed = aSeed;

            vec3 p = position;
            p.x += sin(uTime * 0.045 + aSeed * 21.0) * 0.035;
            p.y += cos(uTime * 0.035 + aSeed * 17.0) * 0.03;
            p.z += sin(uTime * 0.04 + aSeed * 13.0) * 0.025;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (uSize + aSeed * 1.1) * (8.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `;

export const DUST_FRAGMENT = /* glsl */ `
          varying float vSeed;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.0, d);

            if (alpha < 0.01) discard;

            float twinkle = 0.34 + vSeed * 0.5;
            gl_FragColor = vec4(0.82, 0.87, 0.93, alpha * twinkle * 0.72);
          }
        `;

export const STAR_VERTEX = /* glsl */ `
            attribute float aSeed;
            uniform float uTime;
            uniform float uPush;
            uniform float uSize;
            uniform vec3 uPointer;
            varying float vFace;
            varying float vWake;
            varying float vSeed;

            void main() {
              vec3 n = normalize(position);
              vSeed = aSeed;

              float drift = sin(uTime * 0.5 + aSeed * 31.4) * 0.012;
              float d = max(dot(n, normalize(uPointer)), 0.0);
              float wake = pow(d, 7.0) * uPush;
              vWake = wake;

              vec3 p = n * (1.0 + drift + wake * 0.34);
              vec4 mv = modelViewMatrix * vec4(p, 1.0);

              vFace = dot(
                n,
                normalize(
                  cameraPosition - (
                    modelMatrix * vec4(p, 1.0)
                  ).xyz
                )
              );

              gl_PointSize = (
                uSize + wake * 3.0 + aSeed * 0.8
              ) * (3.4 / -mv.z);

              gl_Position = projectionMatrix * mv;
            }
          `;

export const STAR_FRAGMENT = /* glsl */ `
            uniform vec3 uWhite;
            uniform vec3 uGlow;
            varying float vFace;
            varying float vWake;
            varying float vSeed;

            void main() {
              vec2 c = gl_PointCoord - 0.5;
              float a = smoothstep(0.5, 0.0, length(c));

              if (a < 0.01) discard;

              float rim = pow(
                1.0 - clamp(vFace, 0.0, 1.0),
                2.2
              );

              float base = 0.10 + rim * 0.95 + vWake * 1.4;

              vec3 col = mix(
                uGlow,
                uWhite,
                min(rim + vWake, 1.0)
              );

              gl_FragColor = vec4(
                col,
                a * base * (0.55 + vSeed * 0.45)
              );
            }
          `;
