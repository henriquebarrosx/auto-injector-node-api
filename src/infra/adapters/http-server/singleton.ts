import express, { Express } from 'express';
import { ExpressAdapter } from './express';
import { HttpServerGateway } from './gateway';

export abstract class ExpressSingleton {
  private static instance: HttpServerGateway;

  static getInstance() {
    if (!ExpressSingleton.instance) {
      ExpressSingleton.instance = new ExpressAdapter();
    }

    return ExpressSingleton.instance;
  }
}