import { execSync, spawn } from "node:child_process";
import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { platform } from "node:os";

const PORTS = [3000, 3001];
const NEXT_DIR = join(process.cwd(), ".next");
const NEXT_BIN = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

function killPort(port) {
  if (platform() === "win32") {
    try {
      const output = execSync(`netstat -ano | findstr ":${port}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });

      const pids = new Set();
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes("LISTENING")) continue;
        const match = line.trim().match(/LISTENING\s+(\d+)$/);
        if (match && match[1] !== "0") pids.add(match[1]);
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          console.log(`Stopped process ${pid} on port ${port}`);
        } catch {
          // Process may have already exited.
        }
      }
    } catch {
      // Nothing listening on this port.
    }
    return;
  }

  try {
    execSync(`lsof -ti tcp:${port} | xargs kill -9`, {
      stdio: "ignore",
      shell: true,
    });
    console.log(`Cleared port ${port}`);
  } catch {
    // Nothing listening on this port.
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearNextCache() {
  if (!existsSync(NEXT_DIR)) {
    console.log("No .next cache to clear");
    return;
  }

  rmSync(NEXT_DIR, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 250,
  });
  console.log("Removed .next cache");
}

function killProjectDevProcesses() {
  const projectPath = process.cwd().replace(/\\/g, "\\\\");

  if (platform() === "win32") {
    try {
      execSync(
        `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name='node.exe'\\" | Where-Object { $_.CommandLine -like '*${projectPath}*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"`,
        { stdio: "ignore" },
      );
    } catch {
      // No matching processes.
    }
    return;
  }

  try {
    execSync(`pkill -f "${process.cwd()}"`, { stdio: "ignore" });
  } catch {
    // No matching processes.
  }
}

async function main() {
  console.log("Cleaning up stale dev servers...");
  for (const port of PORTS) {
    killPort(port);
  }
  killProjectDevProcesses();

  // Give Windows a moment to release file handles on .next
  await sleep(500);

  clearNextCache();

  console.log("Starting dev server...\n");

  const child = spawn(process.execPath, [NEXT_BIN, "dev", "--turbopack"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
