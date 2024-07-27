export function PostMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'post', endpoint, callback: methodName });
    Reflect.defineMetadata('routes', routes, target);
  };
}
