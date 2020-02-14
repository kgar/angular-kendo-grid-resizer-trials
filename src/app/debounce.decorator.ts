export function debounce(delay: number = 300): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let timeoutKey: number;

    const original = descriptor.value;

    descriptor.value = function(...args) {
      clearTimeout(timeoutKey);
      timeoutKey = window.setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
