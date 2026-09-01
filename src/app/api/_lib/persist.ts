import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Best-effort local persistence for form submissions (RFQ / contact / newsletter).
 *
 * Until the master-backend API is wired up, this prevents leads from being lost
 * (which the previous `console.log`-only stubs did). Each submission is appended
 * as one JSON line to `logs/submissions.jsonl`. Writes are best-effort: failures
 * are swallowed so the user-facing response is never affected. On read-only
 * serverless runtimes the write simply no-ops.
 */
const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "submissions.jsonl");

export async function persistSubmission(
  type: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const line =
    JSON.stringify({ type, at: new Date().toISOString(), ...payload }) + "\n";
  try {
    await appendFile(LOG_FILE, line, { flag: "a" });
  } catch {
    try {
      await mkdir(LOG_DIR, { recursive: true });
      await appendFile(LOG_FILE, line, { flag: "a" });
    } catch {
      /* Persistence best-effort; never fail the response. */
    }
  }
}
