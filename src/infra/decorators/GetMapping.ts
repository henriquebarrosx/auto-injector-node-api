import { HttpVerbDecoratorPayload } from "@configs/app-module/types";

export function GetMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName, ab) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'get', endpoint, callback: methodName } as HttpVerbDecoratorPayload);
    Reflect.defineMetadata('routes', routes, target);
  };
}
