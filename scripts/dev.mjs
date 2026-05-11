import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const workspaceRoot = process.cwd();
const isWindows = process.platform === "win32";
const backendDir = join(workspaceRoot, "bookstore-backend");
const frontendDir = join(workspaceRoot, "bookstore-frontend");
const mvnw = isWindows ? "mvnw.cmd" : "./mvnw";

if (!existsSync(join(backendDir, isWindows ? "mvnw.cmd" : "mvnw"))) {
  throw new Error("Cannot find backend Maven wrapper in bookstore-backend.");
}

if (!existsSync(join(frontendDir, "package.json"))) {
  throw new Error("Cannot find frontend package.json in bookstore-frontend.");
}

const processes = [
  startProcess("backend", isWindows ? ".\\mvnw.cmd" : mvnw, ["spring-boot:run"], backendDir),
  startProcess("frontend", "npm", ["run", "dev"], frontendDir),
];

function startProcess(name, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    shell: isWindows,
    stdio: ["inherit", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => writePrefixed(name, chunk));
  child.stderr.on("data", (chunk) => writePrefixed(name, chunk));

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${name}] stopped by ${signal}`);
      return;
    }
    if (code !== 0) {
      console.log(`[${name}] exited with code ${code}`);
      stopAll();
    }
  });

  return child;
}

function writePrefixed(name, chunk) {
  const lines = chunk.toString().split(/\r?\n/);
  for (const line of lines) {
    if (line) {
      console.log(`[${name}] ${line}`);
    }
  }
}

function stopAll() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }
}

process.on("SIGINT", () => {
  stopAll();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopAll();
  process.exit(0);
});
