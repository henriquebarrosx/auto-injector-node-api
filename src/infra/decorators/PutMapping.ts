export function PutMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'put', endpoint, callback: methodName });
    Reflect.defineMetadata('routes', routes, target);
  };
}
