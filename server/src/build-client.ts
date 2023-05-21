import * as execa from "execa"

import { CLIENT_ROOT_FOLDER_PATH } from "./constants"

export function watchClientBuild() {
  execa
    .command("yarn dev", {
      cwd: CLIENT_ROOT_FOLDER_PATH,
      stdio: "inherit",
    })
    .catch(err => {
      console.error("Problem while building client project", err)
    })
}
