// Performance monitoring utilities

// Monitor Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });
  
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Browser doesn't support LCP
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // Browser doesn't support FID
  }
};

// Monitor memory usage
export const monitorMemory = () => {
  if (performance.memory) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Measure component render time
export const measureRenderTime = (componentName, renderFn) => {
  const start = performance.now();
  const result = renderFn();
  const end = performance.now();
  console.log(`${componentName} render time: ${end - start}ms`);
  return result;
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      console.log('Bundle Analysis:', {
        transferSize: Math.round(navigation.transferSize / 1024) + ' KB',
        encodedBodySize: Math.round(navigation.encodedBodySize / 1024) + ' KB',
        decodedBodySize: Math.round(navigation.decodedBodySize / 1024) + ' KB'
      });
    }
  }
};