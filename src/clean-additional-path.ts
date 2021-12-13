import * as core from "@actions/core";
import { readdir, rm, stat } from "fs/promises";
import { existsSync as exists } from "fs";
import * as path from "path";

export async function cleanAdditionalPath(additionalPathInput: string) {
  const additionalPaths = additionalPathInput.split(",");
  for (const additionalPath of additionalPaths) {
    if (exists(additionalPath) === false) {
      continue;
    }

    const fileStat = await stat(additionalPath);
    if (fileStat.isDirectory() === true) {
      const additionalFiles = await readdir(additionalPath);
      await Promise.all(
        additionalFiles.map((file) =>
          rm(path.join(additionalPathInput, file), {
            recursive: true,
            force: true,
          })
        )
      );
    } else {
      await rm(additionalPath, { force: true });
    }
  }
  core.info("Cleaned additional path.");
}
