import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(urls.map(src => new Promise(resolve => {
    const img = new Image(); img.src = src; img.onload = img.onerror = () => resolve();
  })));
};

export default function Masonry({
  items, ease = 'power3.out', duration = 0.6, stagger = 0.05,
  animateFrom = 'bottom', scaleOnHover = true, hoverScale = 0.95,
  blurToFocus = true
}) {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 2], 1
  );
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return { x: item.x, y: item.y };
    let dir = animateFrom;
    if (dir === 'random') { const d = ['top', 'bottom', 'left', 'right']; dir = d[Math.floor(Math.random() * d.length)]; }
    switch (dir) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: cr.width / 2 - item.w / 2, y: cr.height / 2 - item.h / 2 };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => { preloadImages(items.map(i => i.img)).then(() => setImagesReady(true)); }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 12;
    const colW = (width - (columns - 1) * gap) / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (colW + gap);
      const h = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += h + gap;
      return { ...child, x, y, w: colW, h };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const sel = `[data-key="${item.id}"]`;
      const props = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(sel, { opacity: 0, x: start.x, y: start.y, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...props, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger });
      } else {
        gsap.to(sel, { ...props, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady]);

  const onEnter = (id) => { if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' }); };
  const onLeave = (id) => { if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' }); };

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: grid.length ? Math.max(...grid.map(i => i.y + i.h)) + 20 : 300 }}>
      {grid.map(item => (
        <div key={item.id} data-key={item.id} className="absolute" style={{ willChange: 'transform, width, height, opacity' }}
          onMouseEnter={() => onEnter(item.id)} onMouseLeave={() => onLeave(item.id)}>
          <div className="relative w-full h-full bg-cover bg-center rounded-xl brutal-border brutal-shadow overflow-hidden"
            style={{ backgroundImage: `url(${item.img})` }}>
            {item.label && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-bold">{item.label}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
