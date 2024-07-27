import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { RequestType } from '../adapters/http-server/types';

export type HttpVerbDecoratorPayload = {
  method: RequestType;
  endpoint: string;
  callback: string;
}

class AppModule {
  private instances = new Map();
  private services = new Map();

  constructor() {
    this.loadServices();
    this.loadControllers();
  }

  private loadServices() {
    // TODO: Carregar em qualquer pasta do projeto
    const repositoriesDir = path.join(__dirname, '..', '..', 'infra', 'repositories');
    const files = fs.readdirSync(repositoriesDir);

    files.forEach(file => {
      const filePath = path.join(repositoriesDir, file);
      const serviceModule = require(filePath);

      Object.keys(serviceModule).forEach(exportKey => {
        const ServiceClass = serviceModule[exportKey];

        if (typeof ServiceClass !== 'function') return;
        if (!ServiceClass.prototype.isService) return;
        this.services.set(ServiceClass.name.toLowerCase(), new ServiceClass());
      });
    });
  }

  private loadControllers() {
    const controllersDir = path.join(__dirname, '..', '..', 'app', 'controllers');
    const files = fs.readdirSync(controllersDir);

    files.forEach(file => {
      const filePath = path.join(controllersDir, file);
      const controllerModule = require(filePath);

      Object.keys(controllerModule).forEach(exportKey => {
        const ControllerClass = controllerModule[exportKey];

        if (typeof ControllerClass !== 'function') return;
        if (!ControllerClass.prototype.isRestController) return;

        const dependencies = this.getDependencies(ControllerClass);
        const key = ControllerClass.name.toLowerCase();
        const value = new ControllerClass(...dependencies);
        this.instances.set(key, value);
      });
    });
  }

  public getDependencies(module: any) {
    const constructorString = module.toString();
    const result = constructorString.match(/constructor\s*[^\(]*\(\s*([^\)]*)\)/);

    if (result && result[1]) {
      const dependenciesName = result[1].split(',').map((dep: any) => dep.trim().toLowerCase());

      return dependenciesName.map((name: string) => {
        const dependency = this.services.get(name);
        if (!dependency) throw new Error(`Dependency ${name} not found`);
        return dependency;
      });
    }

    return [];
  }

  get controllers() {
    return Array.from(this.instances.values());
  }
}

export const appModule = new AppModule();