export function fluid(min: number, max: number, minVw = 345, maxVw = 1440): string {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return `clamp(${lo}px, calc(${min}px + ${max - min} * ((100vw - ${minVw}px) / ${maxVw - minVw})), ${hi}px)`;
}
