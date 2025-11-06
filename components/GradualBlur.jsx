import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as math from 'mathjs';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {},
  radial: false,
  radialCenter: 'center',
  radialExpand: true
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});

const getGradientDirection = position => {
  const directions = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

const getRadialCenter = (center, position) => {
  const centers = {
    center: 'center',
    top: 'center top',
    bottom: 'center bottom',
    left: 'left center',
    right: 'right center',
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right'
  };
  return centers[center] || centers[position] || 'center';
};

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [val, setVal] = useState(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key];
      if (w <= 480 && config['mobile' + key[0].toUpperCase() + key.slice(1)])
        v = config['mobile' + key[0].toUpperCase() + key.slice(1)];
      else if (w <= 768 && config['tablet' + key[0].toUpperCase() + key.slice(1)])
        v = config['tablet' + key[0].toUpperCase() + key.slice(1)];
      else if (w <= 1024 && config['desktop' + key[0].toUpperCase() + key.slice(1)])
        v = config['desktop' + key[0].toUpperCase() + key.slice(1)];
      setVal(v);
    };
    const deb = debounce(calc, 100);
    calc();
    window.addEventListener('resize', deb);
    return () => window.removeEventListener('resize', deb);
  }, [responsive, config, key]);
  return responsive ? val : config[key];
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const useRadialBlurStyles = () => {
  useEffect(() => {
    const styleId = 'gradual-blur-radial-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes radialBlurExpand {
        0% {
          transform: scale(0.8);
          opacity: 0.3;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
        100% {
          transform: scale(1.3);
          opacity: 0;
        }
      }
      @keyframes radialBlurPulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.6;
        }
        50% {
          transform: scale(1.15);
          opacity: 0.9;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
};

const GradualBlur = props => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');
  
  useRadialBlurStyles();

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      let maskImage, webkitMaskImage;
      let transform = '';
      let animationDelay = '';

      if (config.radial && config.radialExpand) {
        const radialCenter = getRadialCenter(config.radialCenter, config.position);
        const innerRadius = math.max(0, (progress - 0.15) * 100);
        const outerRadius = progress * 100;
        const nextRadius = math.min(100, (progress + 0.1) * 100);
        
        maskImage = `radial-gradient(circle at ${radialCenter}, transparent ${innerRadius}%, black ${outerRadius}%, black ${nextRadius}%, transparent ${nextRadius}%)`;
        webkitMaskImage = maskImage;
        
        if (config.animated) {
          const scaleStart = innerRadius / 100;
          const scaleEnd = 1 + (1 - progress) * 0.3;
          transform = `scale(${scaleStart})`;
          animationDelay = `${(i - 1) * 0.1}s`;
        }
      } else if (config.radial) {
        const radialCenter = getRadialCenter(config.radialCenter, config.position);
        const innerRadius = math.max(0, (progress - 0.1) * 100);
        const outerRadius = progress * 100;
        const nextRadius = math.min(100, (progress + 0.15) * 100);
        
        maskImage = `radial-gradient(circle at ${radialCenter}, transparent ${innerRadius}%, black ${outerRadius}%, black ${nextRadius}%, transparent ${nextRadius}%)`;
        webkitMaskImage = maskImage;
      } else {
        const p1 = math.round((increment * i - increment) * 10) / 10;
        const p2 = math.round(increment * i * 10) / 10;
        const p3 = math.round((increment * i + increment) * 10) / 10;
        const p4 = math.round((increment * i + increment * 2) * 10) / 10;
        let gradient = `transparent ${p1}%, black ${p2}%`;
        if (p3 <= 100) gradient += `, black ${p3}%`;
        if (p4 <= 100) gradient += `, transparent ${p4}%`;
        const direction = getGradientDirection(config.position);
        maskImage = `linear-gradient(${direction}, ${gradient})`;
        webkitMaskImage = maskImage;
      }

      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage,
        WebkitMaskImage: webkitMaskImage,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transform: transform || undefined,
        transformOrigin: config.radial ? getRadialCenter(config.radialCenter, config.position) : undefined,
        transition:
          config.animated && config.animated !== 'scroll'
            ? `backdrop-filter ${config.duration} ${config.easing}, transform ${config.duration} ${config.easing}`
            : undefined,
        animation: config.radial && config.radialExpand && config.animated
          ? `radialBlurExpand ${config.duration} ${config.easing} ${animationDelay} infinite`
          : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;
  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner relative w-full h-full">{blurDivs}</div>
    </div>
  );
};
const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;
