# Fact database

`facts.csv` has one row for each fact. The site reads this file. Thus each number on the site has a row here.

## Columns
| Column | Contents | Example |
|---|---|---|
| `id` | A short name. Each fact has a different name. | `loan-black-denial` |
| `area` | The area of life. Use one of these values: `hired`, `promoted`, `paid`, `loan`, `care`, `ai`. | `loan` |
| `traits` | The trait tags for the fact. Put `;` between tags. Two or more tags make an intersection. | `race:black` |
| `group` | The group that the fact is about. | Black applicants |
| `group_rate` | The number for the group: a rate, a share or an amount. | 16.4% |
| `comparison_group` | The group for the comparison. | non-Hispanic white applicants |
| `comparison_rate` | The number for the comparison group. | 5.7% |
| `ratio` | `group_rate` divided by `comparison_rate`. The site shows it as "2.9× as likely". | 2.9 |
| `measure` | The thing that the source counts. | denial rate, conventional home-purchase loans |
| `statement` | One short sentence for the fact card. Write a fact about a group. Do not write about the future of a person. | Black applicants had denials 2.9× as often as white applicants. |
| `source_title` | The author or agency, and the title. | CFPB, HMDA Data Browser |
| `source_url` | The link to the **primary** source: a dataset, a report or a paper. Do not use a news article. | |
| `year` | The year of the data. This can be different from the year of publication. | 2023 |
| `verified_by` | The name of the person who compared the number with the source. | |
| `verified_on` | The date of that check (YYYY-MM-DD). | |
| `notes` | Limits, definitions, or the reason that a combination has no data. | |

## Trait tags
| Trait | Tags |
|---|---|
| Race / ethnicity | `race:asian`, `race:black`, `race:hispanic`, `race:native`, `race:pi`, `race:white`, `race:multi` |
| Gender | `gender:woman`, `gender:man`, `gender:nonbinary` |
| Age | `age:20s`, `age:40s`, `age:60s` |
| Disability | `ability:wheelchair`, `ability:blind`, `ability:deaf`. Each of these tags also counts as `disabled`. |
| Religion | `faith:muslim`, `faith:jewish` |
| Sexual orientation | `orient:lgbtq` |
| Class | `class:firstgen`, `class:pell` |
| Skin tone | `skin:light`, `skin:mid`, `skin:dark` |

## Facts with no data
Some groups have no data. For these facts, keep the number columns empty. Write the reason in `statement` and `notes`. Record all gaps, because a gap is also a result.

## Before you add a fact
`../research/data-sources.md` has research notes and possible sources. Compare each number with its source before you fill in `verified_by`.
