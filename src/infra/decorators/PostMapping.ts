export function PostMapping(endpoint: string): MethodDecorator {
  return (target: any, _, { value }: PropertyDescriptor) => {
    if (!target.constructor.routes) target.constructor.routes = [];
    target.constructor.routes.push({ method: 'post', endpoint, callback: value })
  };
}
