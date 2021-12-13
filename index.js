import core from "@actions/core";
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";

const workspacePath = process.env.GITHUB_WORKSPACE;
if (workspacePath == undefined || workspacePath === "") {
  core.setFailed("GITHUB_WORKSPACE is not defined.");
  process.exit(1);
}

if (fs.existsSync(workspacePath) === false) {
  core.setFailed("Workspace is not existed.");
  process.exit(1);
}

try {
  const files = await fsPromises.readdir(workspacePath);
  await Promise.all(
    files.map((file) =>
      fsPromises.rm(path.join(workspacePath, file), {
        recursive: true,
        force: true,
      })
    )
  );
  core.info("Cleaned workspace.");
} catch (e) {
  core.setFailed("Failed to remove files from workspace.");
  core.error(e.message);
  process.exit(1);
}

const additionalPathInput = core.getInput("additional-path", {
  required: false,
});

if (additionalPathInput != undefined && additionalPathInput !== "") {
  const additionalPaths = additionalPathInput.split(",");
  for (const additionalPath of additionalPaths) {
    if (fs.existsSync(additionalPath) === false) {
      continue;
    }
    const stat = await fsPromises.stat(additionalPath);
    if (stat.isDirectory() === true) {
      const additionalFiles = await fsPromises.readdir(additionalPath);
      await Promise.all(
        additionalFiles.map((file) =>
          fsPromises.rm(path.join(additionalPathInput, file), {
            recursive: true,
            force: true,
          })
        )
      );
    } else {
      await fsPromises.rm(additionalPath, { force: true });
    }
  }
  core.info("Cleaned additional path.");
}
