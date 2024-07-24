import { httpServer } from "../../adapters/http-server";
import { RouterConfig } from "./configuration";

export const router = new RouterConfig(httpServer);
