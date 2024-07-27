import { httpServer } from "@adapters/http-server";
import { router } from "@configs/router";

httpServer.init();
router.setup();