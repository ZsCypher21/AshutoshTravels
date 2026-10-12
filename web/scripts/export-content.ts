/**
 * Exports the site's rewritten content (src/content/*) to a single Markdown
 * file for review by the agency: npm run content:export
 * Output: ../docs/01-content.md (relative to the web/ folder)
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { company } from "../src/content/en/company";
import { destinations } from "../src/content/en/destinations";
import {
  adventures,
  bungee,
  mountainBiking,
  mountainFlight,
  raftingGrades,
  raftingIntro,
  raftingRivers,
  raftingSeasonColumns,
  raftingSeasonMatrix,
} from "../src/content/en/adventures";
import { bestSeasons, customs, entering, kathmanduSeasons, nepalEssentials, nepalFastFacts, nepalIntro, packingAdvice } from "../src/content/en/nepal";
import { services } from "../src/content/en/services";
import { hotels } from "../src/content/en/hotels";
import type { Fact } from "../src/lib/types";

const out: string[] = [];
const w = (s = "") => out.push(s);
const flag = (n?: string) => (n ? ` ⚠️ _Verify: ${n}_` : "");
const facts = (fs: readonly Fact[]) => {
  w("| Fact | Value |");
  w("|---|---|");
  fs.forEach((f) => w(`| ${f.label} | ${f.value}${flag(f.needsVerification)} |`));
  w();
};

w("# 01 · Modernised website content");
w();
w("All copy below is rewritten from TravelWeb.pdf and is the exact text the site renders.");
w("It is generated from `web/src/content/*.ts` by `npm run content:export`, so edit the TypeScript files, not this document.");
w("Items marked ⚠️ need confirming before launch; see `content-notes.md` for the full list.");
w();

w("## Home");
w();
w(`**Hero eyebrow:** Kathmandu-based tour company · Since ${company.founded}  `);
w("**Headline:** Discover Nepal with people who call it home  ");
w("**Sub-headline:** Heritage cities, Himalayan views, jungle safaris and white-water adventure, arranged around you, from budget to luxury.  ");
w("**Calls to action:** Plan my trip · Explore destinations");
w();
w("Sections: Why Ashutosh → Destinations → Adventures → Services → CEO welcome + When to visit → Credentials → Plan-your-trip banner.");
w();

w("## About us");
w();
w(`**Pitch:** ${company.pitch}`);
w();
w(company.about.intro);
w();
company.about.paragraphs.forEach((p) => (w(p), w()));
w("### How we work");
company.about.strengths.forEach((s) => w(`- **${s.title}.** ${s.text}`));
w();
w("### Leadership messages");
company.leaders.forEach((l) => {
  const romanized = "nameRomanized" in l ? l.nameRomanized : undefined;
  w(`#### ${l.role}: ${romanized ?? l.name}${"nameRomanized" in l && !romanized ? " (romanised name: PLACEHOLDER)" : ""}`);
  w();
  w(`_${l.greeting}_`);
  w();
  l.message.forEach((p) => (w(p), w()));
  if (l.signOff) w(`${l.signOff}  \n${l.name}`), w();
});
w("### Credentials");
w(`- Registered with: ${company.registrations.join(", ")}`);
w(`- Member of: ${company.memberships.map((m) => `${m.name} (${m.short})`).join("; ")}`);
w();

w("## Destinations");
w();
destinations.forEach((d) => {
  w(`### ${d.name}`);
  w();
  w(`_${d.region} · ${d.tagline}_  `);
  w(`**SEO title:** ${d.seo.title}  `);
  w(`**Meta description:** ${d.seo.description}`);
  w();
  w(`**Card summary:** ${d.summary}`);
  w();
  d.overview.forEach((p) => (w(p), w()));
  facts(d.facts);
  if (d.climate) w(`**Climate.** ${d.climate.text}`), w();
  w(`#### ${d.attractionsTitle}`);
  w();
  let g: string | undefined;
  d.attractions.forEach((a) => {
    if (a.group && a.group !== g) (g = a.group), w(`_${g}_`), w();
    w(`- **${a.name}**${a.tags ? ` (${a.tags.join(", ")})` : ""}. ${a.description}${flag(a.needsVerification)}`);
  });
  w();
  d.extras?.forEach((x) => {
    w(`#### ${x.title}`);
    w();
    if (x.intro) w(x.intro), w();
    x.items.forEach((i) => w(`- **${i.name}**${i.description ? `. ${i.description}` : ""}${flag(i.needsVerification)}`));
    w();
  });
});

w("## Adventures");
w();
adventures.forEach((a) => w(`- **${a.name}**: ${a.tagline}. ${a.summary}`));
w();
w("### White-water rafting");
w();
raftingIntro.forEach((p) => (w(p), w()));
w("| River | Nickname | Duration | Grade | Put-in | Take-out |");
w("|---|---|---|---|---|---|");
raftingRivers.forEach((r) => w(`| ${r.name} | ${r.nickname} | ${r.duration} | ${r.grade} | ${r.putIn ?? "—"} | ${r.takeOut ?? "—"} |`));
w();
raftingRivers.forEach((r) => w(`- **${r.name}.** ${r.description}${flag(r.needsVerification)}`));
w();
w("**Seasonal grade guide**");
w();
w(`| River | ${raftingSeasonColumns.join(" | ")} |`);
w(`|---|${raftingSeasonColumns.map(() => "---").join("|")}|`);
raftingSeasonMatrix.forEach((r) => w(`| ${r.river} | ${r.grades.map((g) => g ?? "Closed").join(" | ")} |`));
w();
w("**River grades**");
w();
raftingGrades.forEach((g) => w(`- **Grade ${g.grade} (${g.label}):** ${g.text}`));
w();
w("### Everest mountain flight");
w();
w(`**${mountainFlight.headline}**`);
w();
mountainFlight.intro.forEach((p) => (w(p), w()));
w("| # | Peak | Height | Note |");
w("|---|---|---|---|");
mountainFlight.peaks.forEach((p, i) => w(`| ${i + 1} | ${p.name} | ${p.height ? `${p.height.toLocaleString("en-US")} m` : "—"} | ${p.note} |`));
w();
w(mountainFlight.closing + flag(mountainFlight.needsVerification));
w();
w("### Bungee jumping");
w();
bungee.intro.forEach((p) => (w(p), w()));
facts(bungee.facts);
bungee.bridge.forEach((p) => (w(p), w()));
w("**Before you jump**");
bungee.beforeYouJump.forEach((b) => w(`- ${b}`));
w();
w(flag(bungee.needsVerification).trim());
w();
w("### Mountain biking");
w();
mountainBiking.intro.forEach((p) => (w(p), w()));
mountainBiking.routes.forEach((r) => w(`- **${r.name}** (${r.route.join(" → ")}): ${r.description}`));
w();

w("## Nepal guide");
w();
w(`### ${nepalIntro.headline}`);
w();
w(nepalIntro.lead);
w();
nepalIntro.paragraphs.forEach((p) => (w(p), w()));
w("**A brief history**");
w();
nepalIntro.history.forEach((p) => (w(p), w()));
w("### Fast facts");
w();
facts(nepalFastFacts);
nepalEssentials.forEach((e) => {
  w(`### ${e.title}`);
  w();
  e.body.forEach((p) => (w(p), w()));
});

w("## Travel essentials");
w();
w("### When to go");
w();
w(bestSeasons.summary);
w();
w("| Season | Months | Kathmandu avg max | Avg min | What to wear |");
w("|---|---|---|---|---|");
kathmanduSeasons.forEach((s) => w(`| ${s.season} | ${s.months} | ${s.max}°C | ${s.min}°C | ${s.wear} |`));
w();
w(packingAdvice);
w();
w("### Arriving");
w();
w(`**By air.** ${entering.byAir}${flag(entering.byAirNeedsVerification)}`);
w();
w(`**By land.** ${entering.byLand}`);
w();
w(`**Passports.** ${entering.passport}`);
w();
w("### Visas");
w();
w(entering.visa.how);
w();
w("| Tourist visa | Entry | Fee |");
w("|---|---|---|");
entering.visa.tourist.forEach((v) => w(`| ${v.duration} | ${v.entry} | ${v.fee} |`));
w();
w(`${entering.visa.feeNote}${flag(entering.visa.needsVerification)}`);
w();
entering.visa.gratis.forEach((g) => w(`- ${g}`));
w();
w(`**Extensions.** ${entering.visa.extension}`);
w();
w("### Customs");
w();
w(`Duty-free: ${customs.allowances.join(", ")}.${flag(customs.needsVerification)}`);
w();
w(customs.temporaryImport);
w();
w(customs.prohibited);
w();
customs.antiques.forEach((p) => (w(p), w()));

w("## Services");
w();
services.forEach((s) => w(`- **${s.name}**: ${s.description}${s.detailsPending ? " _(details such as pricing and schedules: PLACEHOLDER)_" : ""}`));
w();

w("## Stays");
w();
w("We work with fine hotels, lodges and resorts across Nepal to offer competitive rates with quality service.");
w();
(["Kathmandu", "Pokhara", "Chitwan", "Nagarkot"] as const).forEach((c) => {
  w(`- **${c}:** ${hotels.filter((h) => h.city === c).map((h) => h.name + (h.details ? " (full fact sheet)" : "")).join(", ")}`);
});
w();
const soaltee = hotels.find((h) => h.details)!;
w(`### ${soaltee.name}`);
w();
facts(soaltee.details!.highlights);
soaltee.details!.dining.forEach((d) => w(`- **${d.name}** (${d.cuisine}): ${d.hours}`));
w();
soaltee.details!.groups.forEach((g) => w(`- **${g.title}:** ${g.rows.map((r) => `${r.label}: ${r.value}`).join("; ")}`));
w();

w("## Contact");
w();
const c = company.contact;
w(`${company.name}  \n${c.postal}, ${c.street}, ${c.city}, ${c.country}  \nOffice: ${c.phoneOffice} · Mobile: ${c.mobile} · Fax: ${c.fax}  \nEmail: ${c.email}`);
w();
w("Office hours, map location and social profiles: PLACEHOLDER (not in the source).");

const target = resolve(process.cwd(), "../docs/01-content.md");
writeFileSync(target, out.join("\n") + "\n");
console.log(`Wrote ${target}`);
