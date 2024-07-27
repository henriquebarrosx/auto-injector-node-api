import { httpServer } from "@adapters/http-server";
import { Router } from "@configs/router/impl";

export const router = new Router(httpServer);