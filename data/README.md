# Fact database

`facts.csv` has one row for each fact. The site reads this file. Thus each number on the site has a row here.

## Columns
| Column | Contents | Example |
|---|---|---|
| `id` | A short name. Each fact has a different name. | `loan-black-denial` |
| `area` | The area of life. Use one of these values: `hired`, `promoted`, `paid`, `loan`, `care`, `ai`. | `loan` |
| `traits` | The trait tags for the fact. Put `;` between tags. Two or more tags make an intersection. | `race:black` |
| `group` | The group that the fact is about. | Black applicants |
| `group_rate` | The number for the group: a rate, a share or an amount. Write the number only, with no `%` or `$`. | 16.4 |
| `comparison_group` | The group for the comparison. | non-Hispanic white applicants |
| `comparison_rate` | The number for the comparison group. Write the number only. | 5.7 |
| `ratio` | `group_rate` divided by `comparison_rate`. The site shows it as "2.9× as likely". | 2.9 |
| `unit` | The type of the two numbers: `percent` (the site says "as likely"), `share` ("their share"), `dollars` ("as much") or `count` ("as many"). | percent |
| `measure` | The thing that the source counts. | denial rate, conventional home-purchase loans |
| `statement` | One short sentence for the fact card. Write a fact about a group. Do not write about the future of a person. | Black applicants had denials 2.9× as often as white applicants. |
| `source_title` | The author or agency, and the title. | CFPB, HMDA Data Browser |
| `source_url` | The link to the **primary** source: a dataset, a report or a paper. Do not use a news article. | |
| `year` | The year of the data. This can be different from the year of publication. | 2023 |
| `status` | `mock` (invented, for development), `draft` (not verified) or `verified`. The site shows a label on each fact that is not `verified`. | draft |
| `verified_by` | The name of the person who compared the number with the source. A `verified` fact must have it. | |
| `verified_on` | The date of that check (YYYY-MM-DD). | |
| `notes` | Limits, definitions, or the reason that a combination has no data. | |

## Trait tags
| Trait | Tags |
|---|---|
| Race / ethnicity | `race:asian`, `race:black`, `race:hispanic`, `race:native`, `race:pi`, `race:white`, `race:multi` |
| Gender | `gender:woman`, `gender:man`, `gender:nonbinary`, `gender:trans` (transgender, one option for trans women and trans men) |
| Age | `age:20s`, `age:40s`, `age:60s` |
| Disability | `ability:wheelchair`, `ability:blind`, `ability:deaf`. Each of these tags also counts as `disabled`. |
| Religion | `faith:christian`, `faith:muslim`, `faith:jewish`, `faith:sikh`, `faith:atheist` |
| Sexual orientation | `orient:lgbtq` |
| Class | `class:firstgen`, `class:pell` |
| Skin tone | `skin:light`, `skin:mid`, `skin:dark` |

## Facts with no data
Some groups have no data. For these facts, keep the number columns and `unit` empty. Write the reason in `statement` and `notes`. Record all gaps, because a gap is also a result.

## Checks
Each build checks each row. If a row has a problem, the build stops and tells you the fact id, the column and the problem. Examples: an unknown trait tag, a missing number, or a `ratio` that does not agree with the two rates. To run the checks on your computer, run `bun run build`.

## Other file formats
The site reads `facts.csv` now. To use JSON, put the facts in `facts.json` and change `FACT_FILE` in `src/data/index.ts`. For a new format, add a loader in `src/data/loaders.ts`.

## Before you add a fact
`../research/data-sources.md` has research notes and possible sources. Compare each number with its source before you fill in `verified_by`.
