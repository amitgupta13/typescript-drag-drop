//autobind decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  return {
    configurable: true,
    get() {
      return descriptor.value.bind(this);
    },
  };
}
