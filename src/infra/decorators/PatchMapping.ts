export function PatchMapping(endpoint: string): MethodDecorator {
  return (target: any, _, { value }: PropertyDescriptor) => {
    if (!target.constructor.routes) target.constructor.routes = [];
    target.constructor.routes.push({ method: 'patch', endpoint, callback: value })
  };
}
