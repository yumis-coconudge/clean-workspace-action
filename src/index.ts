import * as core from "@actions/core";
import { cleanAdditionalPath } from "./clean-additional-path";
import { cleanWorkspace } from "./clean-workspace";

const workspacePath = process.env.GITHUB_WORKSPACE;
if (workspacePath == undefined || workspacePath === "") {
  core.setFailed("GITHUB_WORKSPACE is not defined.");
  process.exit(1);
}

cleanWorkspace(workspacePath);

const additionalPathInput = core.getInput("additional-path", {
  required: false,
});

if (additionalPathInput != undefined && additionalPathInput !== "") {
  cleanAdditionalPath(additionalPathInput);
}
