// One Line, No Deadline Met — make.fun entry (v2).
//
// Writes one single-line joke giving an excuse for a missed deadline
// to /output/entry.txt: one line, 1-200 characters, no trailing newline.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. Setup: the deadline is treated like a gym membership —
// a commitment made with full sincerity. Turn: the sincerity expired
// in January, and attendance never followed. The joke lands on the
// confession that the plan was abandoned, not that it failed: everyone
// recognises the gym membership they never use, and the deadline is
// just the newest one.
const ENTRY_LINE: string =
  "I treated the deadline like my gym membership — signed up full of hope in January and haven't shown up since.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Gate: refuse anything outside 1-200 characters, or anything that
  // is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (/[\r\n]/.test(ENTRY_LINE)) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
