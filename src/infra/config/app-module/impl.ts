import fs from 'fs';
import path from 'path';
import 'reflect-metadata';

import { logger } from '@adapters/logger';

export class AppModule {
  private services = new Map<string, any>();
  private instances = new Map<string, any>();

  get controllers() {
    return Array.from(this.instances.values());
  }

  public async loadContext() {
    logger.info('Loading app module context...');

    logger.info('Loading services...');
    await this.loadServices();

    logger.info('Resolving services dependencies...');
    this.resolveServiceDependencies();

    logger.info('Loading controllers...');
    await this.loadControllers();

    logger.info('App module context loaded.');
  }

  private getDependencies(module: Object, instantiateDeps: boolean = true) {
    const constructorString = module.toString();
    const result = constructorString.match(/constructor\s*[^\(]*\(\s*([^\)]*)\)/);

    if (result && result[1]) {
      const dependenciesName = result[1].split(',').map((dep: any) => dep.trim().toLowerCase());

      return dependenciesName.reduce((acc: Object[], dep: string) => {
        const Dependency = this.services.get(dep);
        if (Dependency) acc.push(instantiateDeps ? new Dependency() : Dependency);
        return acc;
      }, []);;
    }

    return [];
  }

  private async loadServices() {
    const rootDir = path.join(__dirname, '..', '..', '..');
    const files = await this.getFiles(rootDir);

    files.forEach(file => {
      const serviceModule = require(file);

      Object.keys(serviceModule).forEach(exportKey => {
        const ServiceClass = serviceModule[exportKey];
        if (typeof ServiceClass !== 'function') return;
        if (!ServiceClass.prototype.isService) return;
        this.services.set(ServiceClass.name.toLowerCase(), ServiceClass);
      });
    });
  }

  private async loadControllers() {
    const rootDir = path.join(__dirname, '..', '..', '..');
    const files = await this.getFiles(rootDir);

    files.forEach(file => {
      const controllerModule = require(file);

      Object.keys(controllerModule).forEach(exportKey => {
        const ControllerClass = controllerModule[exportKey];

        if (typeof ControllerClass !== 'function') return;
        if (!ControllerClass.prototype.isRestController) return;

        const dependencies = this.getDependencies(ControllerClass, false);

        const key = ControllerClass.name.toLowerCase();
        const value = new ControllerClass(...dependencies);
        this.instances.set(key, value);
      });
    });
  }

  private async getFiles(rootPath: string, fileList: string[] = []) {
    const files = await fs.promises.readdir(rootPath);

    for (const file of files) {
      const filePath = path.join(rootPath, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isDirectory()) {
        fileList = await this.getFiles(filePath, fileList);
      } else if (stats.isFile() && filePath.endsWith('.ts')) {
        fileList.push(filePath);
      }
    }

    return fileList;
  }

  private resolveServiceDependencies() {
    Array.from(this.services.entries())
      .forEach(([name, ServiceClass]) => {
        const dependencies = this.getDependencies(ServiceClass);
        const value = new ServiceClass(...dependencies);
        this.services.set(name, value);
      });
  }
}
