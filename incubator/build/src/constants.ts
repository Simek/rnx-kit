import * as os from "node:os";
import * as path from "node:path";

export const MAX_ATTEMPTS = 8;
export const MAX_DOWNLOAD_ATTEMPTS = 3;

export const BUILD_ID = "rnx-build";
export const USER_CONFIG_FILE = path.join(os.homedir(), `.${BUILD_ID}.json`);
export const WORKFLOW_ID = BUILD_ID + ".yml";
