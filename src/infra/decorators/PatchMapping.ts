export function PatchMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'patch', endpoint, callback: methodName });
    Reflect.defineMetadata('routes', routes, target);
  };
}
