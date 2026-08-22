const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function copyNestDist(targetDir) {
  const source = path.join(root, "apps/api/dist");
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(source, targetDir, { recursive: true });
  fs.writeFileSync(
    path.join(targetDir, "package.json"),
    JSON.stringify({ type: "commonjs" }),
  );
}

copyNestDist(path.join(root, "apps/web/api/nest-dist"));
copyNestDist(path.join(root, "api/nest-dist"));

const siteDist = path.join(root, "apps/web/dist");
const outputDist = path.join(root, "dist");
fs.rmSync(outputDist, { recursive: true, force: true });
fs.cpSync(siteDist, outputDist, { recursive: true });
