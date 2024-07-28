import { httpServer } from "@adapters/http-server";
import { appModule } from "@configs/app-module";
import { router } from "@configs/router";

(async () => {
  await appModule.loadContext();
  httpServer.init();
  router.setup();
})();