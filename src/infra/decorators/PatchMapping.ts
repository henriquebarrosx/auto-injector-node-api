import { HttpVerbDecoratorPayload } from "@configs/app-module/types";

export function PatchMapping(endpoint: string): MethodDecorator {
  return (target: any, methodName) => {
    const routes = Reflect.getMetadata('routes', target) || [];
    routes.push({ method: 'patch', endpoint, callback: methodName } as HttpVerbDecoratorPayload);
    Reflect.defineMetadata('routes', routes, target);
  };
}
