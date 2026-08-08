/**
 * Fetch the week's content, render the email, write the files.
 *   npm run build
 */
import * as React from "react";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@react-email/render";
import { fetchIssueData } from "./fetch-data";
import { DispatchEmail } from "./template";
import { issue } from "./issue";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "out");

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function main() {
  const date = issue.date ? new Date(`${issue.date}T00:00:00`) : new Date();
  const stamp = date.toISOString().slice(0, 10);

  console.log("Pulling this week's content...");
  const data = await fetchIssueData(issue.number);

  const found = [
    data.spaceOfWeek ? "space of the week" : null,
    data.winners.length ? `${data.winners.length} winners` : null,
    data.dispatches.length ? `${data.dispatches.length} dispatches` : null,
    "1 sales question",
    "1 red flag",
    "1 guide",
  ].filter(Boolean);
  console.log(`  found: ${found.join(", ")}`);

  const missing = [
    data.spaceOfWeek ? null : "space of the week",
    data.winners.length ? null : "winners",
    data.dispatches.length ? null : "dispatches",
  ].filter(Boolean);
  if (missing.length) {
    console.log(`  skipped (no data): ${missing.join(", ")}`);
  }

  const element = (
    <DispatchEmail
      preheader={issue.preheader}
      dateLabel={formatDate(date)}
      issueNumber={issue.number}
      editorsNote={issue.editorsNote}
      signature={issue.signature}
      data={data}
    />
  );

  const html = await render(element, { pretty: true });
  const text = await render(element, { plainText: true });

  await mkdir(outDir, { recursive: true });
  const htmlPath = join(outDir, `wednesday-dispatch-${stamp}.html`);
  const textPath = join(outDir, `wednesday-dispatch-${stamp}.txt`);
  await writeFile(htmlPath, html, "utf8");
  await writeFile(textPath, text, "utf8");

  console.log("");
  console.log("Done.");
  console.log(`  subject : ${issue.subject}`);
  console.log(`  html    : ${htmlPath}`);
  console.log(`  text    : ${textPath}`);
  console.log("");
  console.log("Paste the HTML into your sender and send it.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
