import styles from './MCLoadingSpinner.module.css';

/**
 * <MCLoadingSpinner />
 * A Minecraft-esque loading spinner: three isometric grass/dirt blocks
 * drop into a stack, hold, fade out, and loop.
 *
 * Uses a CSS Module (MCLoadingSpinner.module.css) so styles are always
 * scoped to this component, regardless of your Next.js build config.
 * No 'use client' needed — it's just CSS animation, safe to render
 * from a Server Component.
 *
 * Props:
 *   text  (string) - label shown under the blocks. Default "Loading"
 *   size  (number) - pixel width of the component. Default 220
 *   speed (number) - seconds per full loop. Default 2.6
 *
 * Usage:
 *   import MCLoadingSpinner from '@/components/MCLoadingSpinner';
 *   <MCLoadingSpinner text="Generating world" size={180} speed={2} />
 */
export default function MCLoadingSpinner({ text = 'Loading', size = 220, speed = 2.6 }) {
  const cssVars = {
    '--mc-size': `${size}px`,
    '--mc-speed': `${speed}s`,
    '--mc-delay-2': `${speed * 0.115}s`,
    '--mc-delay-3': `${speed * 0.23}s`,
  };

  return (
    <div className={styles.wrap} style={cssVars}>
      <svg viewBox="0 0 200 210" role="img" aria-label={text}>
        <g className={`${styles.block} ${styles.b3}`}>
          <polygon points="100,31 140,54 100,77 60,54" fill="#6E8B3D" stroke="#6E8B3D" />
          <polygon points="60,54 100,77 100,123 60,100" fill="#6B4A28" stroke="#6B4A28" />
          <polygon points="100,77 140,54 140,100 100,123" fill="#8B6239" stroke="#8B6239" />
          <polygon points="60,54 100,77 100,87 60,64" fill="#5E7A34" stroke="#5E7A34" />
          <polygon points="100,77 140,54 140,64 100,87" fill="#7A9848" stroke="#7A9848" />
        </g>

        <g className={styles.block}>
          <polygon points="60,100 100,123 60,146 20,123" fill="#6E8B3D" stroke="#6E8B3D" />
          <polygon points="20,123 60,146 60,192 20,169" fill="#6B4A28" stroke="#6B4A28" />
          <polygon points="60,146 100,123 100,169 60,192" fill="#8B6239" stroke="#8B6239" />
          <polygon points="20,123 60,146 60,156 20,133" fill="#5E7A34" stroke="#5E7A34" />
          <polygon points="60,146 100,123 100,133 60,156" fill="#7A9848" stroke="#7A9848" />
        </g>

        <g className={`${styles.block} ${styles.b2}`}>
          <polygon points="140,100 180,123 140,146 100,123" fill="#6E8B3D" stroke="#6E8B3D" />
          <polygon points="100,123 140,146 140,192 100,169" fill="#6B4A28" stroke="#6B4A28" />
          <polygon points="140,146 180,123 180,169 140,192" fill="#8B6239" stroke="#8B6239" />
          <polygon points="100,123 140,146 140,156 100,133" fill="#5E7A34" stroke="#5E7A34" />
          <polygon points="140,146 180,123 180,133 140,156" fill="#7A9848" stroke="#7A9848" />
        </g>
      </svg>

      {text && (
        <div className={styles.label}>
          {text}
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
      )}
    </div>
  );
}
