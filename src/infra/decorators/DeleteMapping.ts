import { HttpVerbDecoratorPayload } from "@configs/app-module/types";

export function DeleteMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'delete', endpoint, callback: methodName } as HttpVerbDecoratorPayload);
    Reflect.defineMetadata('routes', routes, target);
  };
}
