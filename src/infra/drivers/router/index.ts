import { httpServer } from "../../adapters/http-server";
import { Router } from "./router";

export const router = new Router(httpServer);
