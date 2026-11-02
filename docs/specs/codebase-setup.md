# Spec: Codebase setup

Status: ready for implementation. Source: the design interview of 2026-11-02 (Liza and Claude). This spec uses ASD-STE100.

## Terms
| Term | Meaning |
|---|---|
| Person | One of the two avatars that the visitor makes. A person has a set of traits. |
| Trait | A characteristic of a person, for example race, gender or disability. A trait has a tag, for example `race:black`. |
| Life area | An area of life that the site compares: getting hired, getting promoted, equal pay, getting a loan, quality health care, recognition by AI. |
| Fact | One statement about a group in one life area, with numbers and a source. |
| Status | The verification state of a fact: `mock`, `draft` or `verified`. |
| Comparison | The result for one life area: the facts that apply to each person, and the differences between them. |
| Gap | A trait and life area combination that has no data. A gap is a result, not an error. |

## Problem statement
The team has a prototype in one HTML file. The facts are in the code. Nobody can add facts, write pages or change the design at the same time as another person. The prototype also shows a score that has no source. The team needs a codebase where five people can work in parallel, where the facts come from a data file, and where the site stays online after the quarter.

## Solution
A static website. A build step reads the fact file, checks each fact, and makes the pages. The site has no server and no database. The visitor uses the Explore page to make two people and compare them by life area. Each difference shows the facts and their sources. Text pages (About, Method, Sources, Gaps) are Markdown files, so writers do not need to change code. Each push to `main` deploys the site.

## User stories
### Visitor
1. As a visitor, I want to make two people that are the same except for one or two traits, so that I can see the effect of one difference.
2. As a visitor, I want to choose race, gender, age, disability, religion, sexual orientation, class and skin tone for each person, so that I can make many combinations.
3. As a visitor, I want skin tone to be separate from race, so that I can see colorism as its own topic.
4. As a visitor, I want the controls for each person next to that person, so that I do not need to scroll or change tabs.
5. As a visitor, I want to see which traits are different between the two people, so that I know what causes the differences.
6. As a visitor, I want to see each life area for both people side by side, so that I can compare them quickly.
7. As a visitor, I want each fact as "2.9× as likely" with the two rates (for example 16.4% vs 5.7%), so that I can understand the size and the real numbers.
8. As a visitor, I want to select a life area and see the facts behind it, so that I can check the evidence.
9. As a visitor, I want a source and a year on each fact, so that I can verify it myself.
10. As a visitor, I want to see when a combination has no data, so that I know that the gap is a result and not an error.
11. As a visitor, I want a clear label on mock or unverified facts, so that I do not trust placeholder numbers.
12. As a visitor, I want a reset control, so that I can start again.
13. As a visitor, I want facts about groups, not predictions about me, so that the site does not tell me my future.
14. As a visitor, I want an About page, so that I know who made the site and why.
15. As a visitor, I want a Method page, so that I know where the numbers come from and what their limits are.
16. As a visitor, I want a Sources page with all sources, so that I can read them.
17. As a visitor, I want a Gaps page, so that I can see which groups have no data.
18. As a visitor, I want a note on each page that tells about the AI use, so that I know how the team made the site.
19. As a visitor, I want a note that tells when the site had its last update and who to contact, so that I know if the data is current.
20. As a visitor on a phone, I want the site to work at 375px width, so that I can use it without a computer.
21. As a visitor with a screen reader or keyboard, I want all controls to have labels and focus states, so that I can use the site.
22. As a visitor in dark mode, I want the site to stay readable, so that it is comfortable to use.

### Fact team (Christine, Nick)
23. As a fact editor, I want to add facts to one file in a spreadsheet app, so that I do not need to write code.
24. As a fact editor, I want the build to tell me which row is wrong and why, so that I can fix my mistakes fast.
25. As a fact editor, I want a status column, so that I can mark a fact as draft or verified.
26. As a fact editor, I want to record who verified a fact and when, so that the team can show the verification work.
27. As a fact editor, I want to write a gap as a row with no numbers and a reason, so that the site shows it as "no data".
28. As a fact editor, I want to tag a fact with two or more traits, so that the site shows intersectional facts.
29. As a fact editor, I want the file format to change later without new work in the site, so that we can choose CSV, JSON or YAML when we know more.

### Writers (Anthony, Macy)
30. As a writer, I want each text page as a Markdown file, so that I can write without code.
31. As a writer, I want the page stubs to have the headings already, so that I know what to write.
32. As a writer, I want the Sources page to come from the fact file where possible, so that the list stays complete.

### Developers (Liza and others)
33. As a developer, I want one command to install and one command to start a local server, so that I can start work quickly.
34. As a developer, I want the comparison rule in one small module, so that the team can change the scoring method without changes to the UI.
35. As a developer, I want the fact loader behind one interface, so that a new file format needs only a new loader.
36. As a developer, I want a `Fact` type that all modules use, so that the data, the comparison and the UI stay consistent.
37. As a developer, I want tests for the data layer, so that wrong numbers do not get to the site silently.
38. As a developer, I want design tokens in one file, so that the design can change in one place.
39. As a developer, I want the folders split by role (pages, components, lib, data, styles), so that team members seldom edit the same file.
40. As a developer, I want npm to work as a fallback for Bun, so that a teammate without Bun can still run the site.

### Course staff (TA, instructor)
41. As the TA, I want README instructions to run the site, so that I can grade the functionality.
42. As the TA, I want a live link, so that I can see the site without a local setup.
43. As the instructor, I want the commit history to show the work of all members, so that I can check the contributions.

### Maintainers (after the quarter)
44. As a future maintainer, I want the data in one file with sources, so that I can update the numbers each year.
45. As a future maintainer, I want an open license, so that other people can reuse and extend the work.
46. As a future maintainer, I want the site to have no server, so that it stays online at no cost.

## Implementation decisions
### Architecture
- The site is static. There is no runtime server, API or database.
- The "backend" is the build-time data step: load the fact file, validate it, and give the facts to the pages.
- Stack: Astro with TypeScript. The Explore page uses one React component (an Astro island). Text pages are Markdown.
- Package manager and script runner: Bun. The code uses no Bun-only API, so `npm install` and `npm run dev` also work.
- Hosting: a new Vercel project, `same-but-different`, linked to the GitHub repo. Each push to `main` deploys to production. A failed build keeps the last good deployment online. The prototype keeps its own Vercel project and link.
- Workflow: all members push directly to `main`. The build is the safety check.

### Data module
- One `Fact` type is the contract for all modules. Its fields follow the columns in `data/README.md`, plus a new `status` field (`mock` | `draft` | `verified`).
- Validation uses a zod schema. Rules: required fields are present; `area` is one of the six life areas; each trait tag is a known tag; numbers are numbers; `ratio` agrees with `group_rate / comparison_rate` within rounding; a gap row (no numbers) must have a `statement` and `notes`. An error message gives the row id or row number and the field.
- Loaders: one loader for each file format behind one interface. The interface takes the file contents and gives raw records. The data module selects the loader from the file extension. Only the CSV loader is necessary now. A JSON loader is also added, so that the switch works from the start.
- The data module exposes one function that gives validated facts or throws a list of all errors (not only the first error).

### Comparison module
- A pure module with one entry point: it takes two persons and the facts, and gives one comparison for each life area.
- For each life area, a comparison has: the facts that apply only to person A, only to person B, to both, and the gaps.
- A fact applies to a person if all the fact's trait tags are in the person's tags. Any disability trait also gives the tag `disabled`. Skin tone gives `skin:light`, `skin:mid` or `skin:dark`.
- There is no combined score. Each fact shows its own ratio and rates. The team can replace the comparison rule later in this module only.

### Trait module
- One list of traits and tags is the source for the pickers, the validation and the comparison. A new trait needs a change in this list only (and facts that use it).

### UI
- Pages: Explore (home), About, Method, Sources, Gaps. All pages share a layout with a header and a footer.
- The footer shows the AI-use note and the maintenance note (last update, maintenance plan, contact).
- Explore keeps the layout that the team approved in the prototype (v3/v4): person A with controls on the left, the life-area comparison in the middle, person B with controls on the right. The controls for a person stay next to that person. The visual design is new but uses the prototype as a reference.
- Fact display format: "2.9× as likely (16.4% vs 5.7%)". Pay facts can use "0.65× as much".
- A visible banner shows when the site shows mock facts. Each fact that is not `verified` has a status label.
- Styling: plain CSS with design tokens in one file. The first tokens come from the prototype v4 (white page, black ink, 2px outlines, rounded font, one yellow highlight color), with light and dark values.
- Sources page: a list made from the unique sources in the fact file, plus Markdown text for other sources.

### Mock data
- `data/facts.csv` gets a small set of mock rows: at least one for each life area, one intersection, one gap.
- Mock rows have `status = mock`, the source "MOCK", and numbers that are clearly invented. They do not reuse the prototype's real-looking facts.

### Licenses
- Code: MIT. Fact data and site text: CC BY 4.0.

## Testing decisions
- A good test checks behavior through the public interface of a module, not its internal steps. It gives input data and checks the output or the error.
- Seam 1, data module: give file contents in each format and check the validated facts or the list of errors. The same facts in CSV and in JSON must give the same result.
- Seam 2, comparison module: give two persons and a small set of facts, and check the comparison for each life area (only A, only B, both, gaps, intersections, the `disabled` tag, skin tone tags).
- The UI has no automated tests. The team checks it by hand on the live preview.
- Tool: Vitest. The repo has no tests yet, so these are the first.

## Out of scope
- The scoring method (a separate team task). This setup only makes the rule easy to change.
- Real facts. The fact team adds them later.
- The final avatar art (a separate task). The setup uses a simple placeholder avatar.
- The final text of the About, Method, Sources and Gaps pages.
- The UCSD data pull script.
- GitHub Pages. The team can add it at launch if necessary.
- Pull request reviews and branch protection.

## Further notes
- Only Liza can link the Vercel project to GitHub: connect GitHub at https://vercel.com/account/settings/authentication.
- The prototype is at https://same-but-different-prototype.vercel.app. The screenshot is `docs/prototype.png`.
- Research for the facts is in `research/data-sources.md`.
