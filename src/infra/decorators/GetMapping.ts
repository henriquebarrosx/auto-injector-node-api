export function GetMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'get', endpoint, callback: methodName });
    Reflect.defineMetadata('routes', routes, target);
  };
}
