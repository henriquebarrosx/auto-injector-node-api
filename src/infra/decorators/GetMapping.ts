export function GetMapping(endpoint: string): MethodDecorator {
  return (target: any, _, { value }: PropertyDescriptor) => {
    if (!target.constructor.routes) target.constructor.routes = [];
    target.constructor.routes.push({ method: 'get', endpoint, callback: value })
  };
}
