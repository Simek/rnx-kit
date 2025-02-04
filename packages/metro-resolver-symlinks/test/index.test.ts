import type { CustomResolver, ResolutionContext } from "metro-resolver";
import { resolve } from "metro-resolver";
import * as path from "path";
import { makeResolver } from "../src/symlinkResolver";
import { useFixture } from "./fixtures";

jest.unmock("find-up");

function makeContext(
  resolveRequest: CustomResolver,
  freeze = false
): ResolutionContext {
  const context = {
    originModulePath: "",
    doesFileExist: () => true,
    isAssetFile: () => false,
    nodeModulesPaths: [".", "..", "../.."],
    redirectModulePath: (modulePath: string) => modulePath,
    resolveRequest,
  } as unknown as ResolutionContext;
  return freeze ? Object.freeze(context) : context;
}

describe("makeResolver", () => {
  const currentWorkingDirectory = process.cwd();

  afterEach(() => {
    process.chdir(currentWorkingDirectory);
  });

  test("returns `react-native` with Metro <0.68", () => {
    process.chdir(useFixture("duplicates"));

    const resolveRequest = makeResolver();
    const context = makeContext(resolveRequest);

    expect(resolveRequest(context, "react-native", "ios")).toEqual({
      filePath: path.join("node_modules", "react-native"),
      type: "sourceFile",
    });
  });

  test("returns `react-native` with Metro >=0.68", () => {
    process.chdir(useFixture("duplicates"));

    const resolveRequest = makeResolver();
    const context = makeContext(resolve, true);

    expect(resolveRequest(context, "react-native", "ios")).toEqual({
      filePath: path.join("node_modules", "react-native"),
      type: "sourceFile",
    });
  });
});
