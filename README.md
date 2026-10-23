# Same But Different

An interactive site for CSE 194/291A (Race, Gender & Computing, UC San Diego, Fall 2026), team Coffee.

Build two people who are the same except for one or two traits (race, gender, age, disability, religion, sexual orientation, class, skin tone) and compare how life areas like getting hired, pay, loans, health care and AI recognition differ for them. Every difference links to a sourced, group-level fact. Where no data exists for a group, the site says so: that gap is a finding too.

**Status:** prototype. The facts in `index.html` are placeholders until the team verifies them into `data/facts.csv`.

## Run it
No build step. Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

Live preview: https://same-person-prototype.vercel.app (redeploys on every push to `main`).

## Layout
| Path | What |
|---|---|
| `index.html` | The site (currently the prototype, all in one file) |
| `data/facts.csv` | Fact database; format in `data/README.md` |
| `research/data-sources.md` | Candidate sources per life area, UCSD data access, gaps, and a check of the prototype's placeholder facts |
| `ai-chats/` | Saved AI conversations (required for the final submission) |

## Team
Liza Babior · Nicholas Adams · Christine Manoukian · Anthony Huynh · Macylene De Leon

## Maintenance
Last updated: 2026-10-22. Maintenance plan: TBD. Contact: TBD.

## AI use
This project uses AI tools (Claude) to help with prototyping, research and code. All conversations are saved in `ai-chats/`.
