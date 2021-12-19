import * as core from "@actions/core";
import { readdir, rm, stat } from "fs/promises";
import { existsSync as exists } from "fs";
import * as path from "path";
import * as os from "os";
import { sync as glob } from "glob";

export async function cleanAdditionalPath(additionalPathInput: string) {
  const homePath = os.homedir();
  const additionalPaths = additionalPathInput.split(",");
  for (const rawAdditionalPath of additionalPaths) {
    const tempPath = path.join(
      rawAdditionalPath.replace(/^[~]/g, ""),
      homePath
    );
    const globPaths = glob(tempPath);
    for (const additionalPath of globPaths) {
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
  }
  core.info("Cleaned additional path.");
}
