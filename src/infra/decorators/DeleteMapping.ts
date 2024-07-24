export function DeleteMapping(endpoint: string): MethodDecorator {
  return (target: any, _, { value }: PropertyDescriptor) => {
    if (!target.constructor.routes) target.constructor.routes = [];
    target.constructor.routes.push({ method: 'delete', endpoint, callback: value })
  };
}
