// Ember Weirdest Job Title — "Weirdest Job Title: Blind Judge Showdown"
// (u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
// Writes one job title, 60 characters at most, to /output/entry.txt.
// Gate: UTF-8 text of 1 to 60 characters, not only white space.
// Judge: pairwise, deadpan comedy scout. Criteria in order:
//   1. is a weird job title; 2. stranger than ordinary work;
//   3. funny, twist lands on first read; 4. sounds like a real job,
//   specific enough to picture the person doing it; 5. reads instantly.
// A real-sounding job with one hilariously specific twist beats a
// generic oddity — so the pick is a real job plus one fatal detail.
//
// Three candidates were weighed before this one was picked:
//
//   A (44 chars): "Professional Mourner for Strangers' Funerals"
//      A real job — professional mourners are hired to cry at funerals
//      — and "for strangers" is the twist. Strong, but 44 chars and the
//      twist needs a beat to land: you have to work out that the dead
//      person is a stranger to the mourner.
//
//   B (31 chars, PICK): "Iceberg Mover, Titanic Division"
//      Iceberg towing is a real industry — ships really do tow icebergs
//      out of shipping lanes — so criterion 4 is satisfied outright.
//      Then "Titanic Division" lands in two words: the one iceberg job
//      in history everybody knows ended badly. It is a fragment, not a
//      sentence; it reads at a glance, pictures instantly (a tug boat,
//      a berg, a very nervous crew), and the joke is the job itself,
//      not an explanation of it. Shortest of the real-job drafts.
//
//   C (32 chars): "Senior Apologizer to Angry Geese"
//      One char longer than B and funny on first read, but it loses on
//      criterion 4: nobody hires an apologizer for geese, so it reads
//      as invented wordplay rather than a job you could picture someone
//      actually doing for a living. B's twist is attached to a real job.
//
// So the entry is exactly "Iceberg Mover, Titanic Division": 31 chars,
// no newline, no trailing space, nothing else in the file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "Iceberg Mover, Titanic Division";

// Revision 2: the gate is now a validateEntry() function. A line of only
// whitespace carries no job title at all, so it is refused outright — the
// entry must hold real content (trim().length > 0) — and it must not be
// padded with leading or trailing whitespace either, since padding would
// cost the exact-tie break (fewer bytes places first) for nothing.
function validateEntry(entry: string): number {
  if (entry.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (entry !== entry.trim()) throw new Error("entry must not have leading or trailing whitespace");
  if (entry.includes("\n")) throw new Error("entry must be a single line");
  const chars = [...entry].length;
  if (chars < 1 || chars > 60) throw new Error(`entry must be 1-60 characters, got ${chars}`);
  return chars;
}

const chars = validateEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error(
    `read-back mismatch: wrote ${JSON.stringify(ENTRY)} but file holds ${JSON.stringify(back)}`,
  );
}

console.log(`wrote ${JSON.stringify(back)} (${back.length} chars) to /output/entry.txt`);
