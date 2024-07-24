import { httpServer } from "./infra/adapters/http-server";
import { router } from "./infra/drivers/router";

httpServer.init();
router.setup();