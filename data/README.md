# Fact database

One row per fact in `facts.csv`. The site reads this file, so every number on the site traces back to a row here.

| Column | What goes in it | Example |
|---|---|---|
| `id` | Short unique slug | `loan-black-denial` |
| `area` | One of: `hired`, `promoted`, `paid`, `loan`, `care`, `ai` | `loan` |
| `traits` | Trait tags the fact applies to, separated by `;`. Two or more = an intersection | `race:black` |
| `group` | Who the fact is about | Black applicants |
| `group_rate` | The group's number (a rate, share or amount) | 16.4% |
| `comparison_group` | Who they're compared with | non-Hispanic white applicants |
| `comparison_rate` | The comparison group's number | 5.7% |
| `ratio` | `group_rate / comparison_rate`, shown on the site as "2.9× as likely" | 2.9 |
| `measure` | What is counted | denial rate, conventional home-purchase loans |
| `statement` | One plain sentence for the fact card, a group-level fact, never "you will…" | Black applicants were denied about 2.9× as often as white applicants. |
| `source_title` | Author/agency, title | CFPB, HMDA Data Browser |
| `source_url` | Link to the **primary** source (dataset, report, paper), not a news article | |
| `year` | Year the data is from (not the publication year, if they differ) | 2023 |
| `verified_by` | Who checked the number against the source | |
| `verified_on` | Date checked (YYYY-MM-DD) | |
| `notes` | Caveats, definitions, why a combo has no data | |

Trait tags: `race:asian|black|hispanic|native|pi|white|multi`, `gender:woman|man|nonbinary`, `age:20s|40s|60s`, `ability:wheelchair|blind|deaf` (any of them also counts as `disabled`), `faith:muslim|jewish`, `orient:lgbtq`, `class:firstgen|pell`, `skin:light|mid|dark`.

"No data" facts: leave the numbers empty, write why in `statement` and `notes`. Gaps are findings, so record them too.

Research notes and candidate sources: `../research/data-sources.md`. The numbers there are numbers **in the dataset or paper**, so every row still needs its own check before `verified_by` is filled in.
