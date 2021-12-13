import * as core from "@actions/core";
import { readdir, rm } from "fs/promises";
import { existsSync as exists } from "fs";
import * as path from "path";

export async function cleanWorkspace(workspacePath: string) {
  if (exists(workspacePath) === false) {
    core.setFailed("Workspace is not existed.");
    process.exit(1);
  }

  try {
    const files = await readdir(workspacePath);
    await Promise.all(
      files.map((file) =>
        rm(path.join(workspacePath, file), {
          recursive: true,
          force: true,
        })
      )
    );
    core.info("Cleaned workspace.");
  } catch (e) {
    if (e instanceof Error) {
      core.error(e.message);
    }
    core.setFailed("Failed to remove files from workspace.");
    process.exit(1);
  }
}
