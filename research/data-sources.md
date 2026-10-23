# Data sources for "Same Person, Different Doors" (research, Oct 22)

⚠ Save the AI conversation behind this file; it's submitted with the final deliverables.

Scope: the best **primary** source for each life area × trait, a check of the 27 placeholder `FACTS` in `prototype/avatar-doors-PROTOTYPE.html`, UCSD data access, and gaps. "Verify" = the figure came from the abstract or secondary coverage, and someone should open the paper before it ships. Access: **CSV/API** = machine-readable, **PDF** = tables in a report, **paywall** = journal (use the open preprint link if one is given).

## Summary: top sources to build on
| # | Source | Covers | Why | Updates |
|---|---|---|---|---|
| 1 | **Census CPS ASEC "Income in the US" (P60)** + detailed tables | pay × sex, race, age, disability | official pay-gap ratio; table downloads | yearly (Sept) |
| 2 | **BLS CPS**: usual weekly earnings, disability release, women's earnings report | pay, hiring × sex, race, age, disability | monthly/quarterly/yearly; race × sex cross tabs | yearly/quarterly |
| 3 | **FFIEC/CFPB HMDA Data Browser + API** | loans × race, ethnicity, sex, age (incl. AIAN, NHPI) | loan-level, free API; I pulled 2022–24 below | yearly (snapshot ~July) |
| 4 | **NCHS maternal mortality (Health E-Stat) + US Life Tables (NVSR)** | health × race, age | official, race-specific, includes AIAN | yearly |
| 5 | **AHRQ National Healthcare Quality & Disparities Report** | health × race, income, age, sex, disability (some) | 250+ measures, data tool | yearly |
| 6 | **NIST FRTE (ex-FRVT) demographics + NISTIR 8280** | AI face × race, sex, age (incl. American Indian) | ongoing per-algorithm report cards | continuous |
| 7 | **Correspondence studies**: Bertrand & Mullainathan 2004, Kline-Rose-Walters 2022, Quillian et al. 2017 meta-analysis | hiring × race | landmark + the newest large audit | one-off |
| 8 | **AI audits**: Gender Shades 2018, Koenecke 2020, Wilson & Caliskan 2024, Hofmann 2024 (*Nature*), Gao-Jiang-Yan 2026 | AI × race, gender, skin tone | peer-reviewed, cover face, speech, LLM | one-off (rerunnable) |
| 9 | **UC Information Center (UCOP Tableau)** + UCSD Common Data Set | UCSD education × race, gender, first-gen, Pell | CSV export works (tested) | yearly |
| 10 | **Williams Institute (UCLA)** + Gallup LGBTQ ID | LGBTQ+ work discrimination, population | best LGBTQ+ source; Gallup yearly | yearly / periodic |
| 11 | **Women in the Workplace (McKinsey & LeanIn)** + EEOC EEO-1 | promotion × gender, race | only big promotion-pipeline source; EEO-1 is official | yearly |

## Getting hired
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Race (Black, white) | Bertrand & Mullainathan, *AER* | callbacks, identical résumés: white names 9.65% vs Black 6.45% (≈50% more) | 2004 (data 2001–02) | one-off | paywall; NBER WP free | https://www.aeaweb.org/articles?id=10.1257/0002828042002561 |
| Race (Black) | Kline, Rose & Walters, *QJE* | 83,000+ applications to 108 of the largest US employers; Black names 2.1 pp less contact, concentrated in some firms | 2022 (data 2019–21) | one-off (+ firm report card follow-up) | NBER WP free | https://www.nber.org/papers/w29053 |
| Race (Black, Hispanic) | Quillian, Pager, Hexel & Midtbøen, *PNAS* meta-analysis | 28 field experiments since 1989: whites got 36% more callbacks than Black and 24% more than Latino applicants; no decline for Black applicants in 25 years | 2017 | one-off | open (PMC) | https://pmc.ncbi.nlm.nih.gov/articles/PMC5642692/ |
| Disability | Ameri et al., *ILR Review* | 6,016 accounting jobs; disclosing spinal cord injury or Asperger's got 26% fewer expressions of interest | 2018 (NBER 2015) | one-off | NBER WP free | https://www.nber.org/papers/w21560 |
| Disability | BLS "Persons with a Disability: Labor Force Characteristics" | unemployment 8.3% (disability) vs 4.1% (none); employment ratio 22.8% vs 65.2%; cut by sex, race, age, education | 2025 (pub. Mar 2026) | yearly (Feb/Mar) | HTML/PDF tables + CPS microdata | https://www.bls.gov/news.release/disabl.nr0.htm |
| Age (60s), age × gender | Neumark, Burn & Button, *JPE* | 40,000+ applications, 13,000+ jobs, 12 cities; lower callbacks for 64–66 vs 29–31; strongest for older women | 2019 | one-off | NBER WP w21669 free | https://www.journals.uchicago.edu/doi/10.1086/701029 |
| LGBTQ+ (gay men) | Tilcsik, *AJS* | 1,769 résumé pairs, 7 states: 11.5% vs 7.2% callbacks (straight got ~1.6×) | 2011 (data 2005) | one-off | paywall | https://www.journals.uchicago.edu/doi/10.1086/661653 |
| LGBTQ+ (all) | Williams Institute, "LGBTQ People's Experiences of Workplace Discrimination" | 47% lifetime discrimination or harassment at work; higher for trans/nonbinary and LGBTQ people of color | 2024 (survey 2023) | periodic | PDF | https://williamsinstitute.law.ucla.edu/publications/lgbt-workplace-discrimination/ |
| Religion (Muslim + hijab) | Ghumman & Ryan, *Human Relations* | in-person job seeking with or without a hijab (112 trials): fewer callbacks, less permission to apply, more negativity | 2013 | one-off | paywall | https://journals.sagepub.com/doi/10.1177/0018726712469540 |
| Religion (Muslim, Jewish) | Wright et al. (New England 2013; South, *Social Currents* 2014) | résumé religion signals: any religion got ~19–26% fewer responses; Muslims hit hardest; Jewish applicants no detectable penalty (South study) | 2013/2014 | one-off | paywall; figures differ across coverage (verify) | https://today.uconn.edu/2014/06/great-resume-too-bad-about-your-religion |
| Class (first-gen/low-income signal) × gender | Rivera & Tilcsik, *ASR* | law-firm audit, 316 offices: higher-class men got the most interviews; higher-class women penalized | 2016 | one-off | paywall | https://journals.sagepub.com/doi/10.1177/0003122416668154 |
| Race, sex, age (official) | BLS CPS Employment Situation, tables A-2/A-3/A-4 | unemployment by race, sex, age | monthly | monthly | CSV via BLS data tools | https://www.bls.gov/cps/tables.htm |
| Skin tone | (no US hiring audit on skin tone found) | gap: see Gaps | | | | |

## Getting promoted
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Gender (top) | Fortune 500 list | 56 women CEOs = 11.2% (record) | 2026 | yearly (June) | article | https://www.fortune.com/2026/06/03/gm-fortune-500-highest-ranking-company-female-ceo-elevance-health-centene/ |
| Gender, gender × race | Women in the Workplace (McKinsey & LeanIn) | "broken rung": 81 women per 100 men promoted to first-level manager; Black women 54, Latinas 65 (figures from secondary coverage, verify against PDF) | 2025 report (11th) | yearly (fall) | PDF only, no dataset | https://womenintheworkplace.com/ |
| Race × sex by job level | EEOC EEO-1 (Component 1) public-use data / EEOC Explore | share of "Executive/Senior Officials" vs workforce, by race × sex × industry × state | 2021–22 data (check newest PUF) | yearly-ish | CSV download | https://www.eeoc.gov/data/eeo-1-data-collection |
| Asian American | Ascend Foundation, "Hidden in Plain Sight" | 5 Silicon Valley firms, 2013 EEO-1: Asians 27% of professionals but 14% of executives; white workers ~154% more likely to be execs | 2015 | series (newer Ascend reports exist) | PDF | https://www.ascendleadership.org/research |
| Disability, LGBTQ+, age, religion, class | none national | gap | | | | |

## Equal pay
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Gender | Census, *Income in the US: 2025* (P60-289) | women/men median earnings, full-time year-round: **83.9%** (80.6% in 2024) | 2025 (pub. Sept 15, 2026) | yearly | PDF + Excel tables | https://www.census.gov/library/publications/2026/demo/p60-289.html |
| Gender (weekly) | BLS "Highlights of Women's Earnings" | weekly earnings ratio 83% (2024); by race, age, occupation | 2024 | yearly | HTML/Excel | https://www.bls.gov/opub/reports/womens-earnings/2024/home.htm |
| Race × gender | Census CPS ASEC detailed tables (PINC-05 etc.); NWLC/Equal Pay Days are calculations on them | Black women 65¢ per white non-Hispanic man's $ (2024 data, NWLC 2026); Latinas 58¢ (2023 data, NWLC 2025) | 2024 / 2023 | yearly | Excel (Census); NWLC fact sheets = secondary | https://www.census.gov/data/tables/time-series/demo/income-poverty/cps-pinc.html |
| Race, sex, age | BLS usual weekly earnings (quarterly release) | medians by race × sex, age | quarterly | quarterly | HTML/CSV | https://www.bls.gov/news.release/wkyeng.toc.htm |
| Disability | Census ACS (table B18140 median earnings by disability) | earnings by disability status | 2024 1-yr | yearly | API/CSV | https://data.census.gov/ |
| Skin tone (immigrants) | Hersch, *J. Labor Econ.* | lightest-skinned immigrants earn ~17% more than comparable darkest-skinned (New Immigrant Survey 2003) | 2008 | one-off | free copy (Boston Fed PDF) | https://www.bostonfed.org/-/media/Documents/cb/PDF/Hersch_immigrant_skin_color.pdf |
| Skin tone (Latinos, perception) | Pew Research Center | 62% of Hispanic adults say darker skin hurts ability to get ahead; 64% of darker-skinned vs 54% of lighter-skinned report discrimination | 2021 | periodic | HTML + dataset | https://www.pewresearch.org/race-and-ethnicity/2021/11/04/half-of-u-s-latinos-experienced-some-form-of-discrimination-during-the-first-year-of-the-pandemic/ |
| LGBTQ+, religion, first-gen | no official pay series (federal surveys don't ask religion; SOGI is limited) | gap | | | | |

## Getting a loan
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Race, ethnicity, sex, age | **HMDA Data Browser + API** (FFIEC/CFPB) | applications, denials, pricing; ~7M+ applications/yr | 2024 (2025 expected ~mid-2026, check) | yearly | free API/CSV (tested) | https://ffiec.cfpb.gov/data-browser/ |
| Race (official headline) | FFIEC HMDA release | conventional home-purchase denial rates 2023: Black 16.6%, Hispanic-White 12.0%, Asian 9.0%, non-Hispanic White 5.8% | 2023 | yearly | press release | https://www.consumerfinance.gov/about-us/newsroom/ffiec-publishes-2023-data-on-mortgage-lending/ |
| Race, sex (my API pull, all loan types/purposes, denied ÷ originated+approved+denied) | HMDA API | 2024: Black 36.7%, AIAN 37.0%, NHPI 38.7%, Asian 21.3%, White (incl. Hispanic) 21.8%; Hispanic 30.5% vs non-Hispanic 22.7%; Female 29.3%, Male 26.4%, Joint 18.3% | 2024 | yearly | API | https://ffiec.cfpb.gov/v2/data-browser-api/view/nationwide/aggregations?years=2024&races=White,Black%20or%20African%20American&actions_taken=1,2,3 |
| Race (controlled) | St. Louis Fed Review, "Determinants of Mortgage Denial" | with lender + financial controls, Black applicants 7.8 pp more likely denied (2018–24) | 2026 | one-off | free | https://www.stlouisfed.org/publications/review/2026/may/determinants-of-mortgage-denial |
| LGBTQ+ (same-sex couples) | Sun & Gao, *PNAS* | same-sex co-applicants 73% more likely denied, paid higher fees, no higher default (HMDA 1990–2015) | 2019 | one-off | open | https://www.pnas.org/doi/10.1073/pnas.1903592116 |
| Disability, religion, first-gen, nonbinary | HMDA doesn't collect them (sex is male/female only) | gap | | | | |

## Quality health care
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Race × gender (maternal) | NCHS Health E-Stat 113 | maternal mortality per 100k births: Black 44.8, White 14.2 (≈3.2×), Hispanic 12.1, Asian 18.1; age 40+ 62.3 | 2024 (pub. Mar 2026) | yearly | HTML/PDF; CDC WONDER for custom | https://www.cdc.gov/nchs/data/hestat/hestat113.htm |
| Race (life expectancy) | NCHS *US Life Tables, 2024* (NVSR 75-5) | AIAN 71.1, Black 74.8, White 78.9, Hispanic 81.8, Asian 85.8, total 79.0 | 2024 (pub. Aug 2026) | yearly | PDF + Excel | https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-05.pdf |
| Race, income, age, sex | AHRQ NHQDR | share of quality measures where each group got worse care than White (2022 ed.: Black 85/190, AIAN 47/110, NHPI 27/73) | 2025 ed. (check numbers) | yearly | PDF + data tool | https://www.ahrq.gov/research/findings/nhqrdr/index.html |
| Race (clinician beliefs) | Hoffman et al., *PNAS* | ~half of 222 white med students/residents endorsed ≥1 false biological-difference belief; linked to lower pain ratings | 2016 | one-off | open | https://www.pnas.org/doi/10.1073/pnas.1516047113 |
| Race (algorithm) | Obermeyer et al., *Science* | care-management algorithm used cost as proxy for need, so Black patients were sicker at the same score | 2019 | one-off | paywall | https://www.science.org/doi/10.1126/science.aax2342 |
| Disability | Iezzoni et al., *Health Affairs* | 714 physicians: only 40.7% very confident they give disabled patients the same quality of care | 2021 | one-off | paywall | https://www.healthaffairs.org/doi/10.1377/hlthaff.2020.01452 |
| LGBTQ+ | CDC BRFSS SOGI module / NHIS sexual orientation | access, insurance, outcomes | yearly (state-optional module) | yearly | CSV | https://www.cdc.gov/brfss/ |
| Religion, first-gen, skin tone | none national | gap | | | | |

## Recognized by AI
| Trait | Source | What it measures | Latest year | Cadence | Access | URL |
|---|---|---|---|---|---|---|
| Skin tone × gender (face) | Buolamwini & Gebru, "Gender Shades" (FAT* / PMLR) | gender-classification error: darker-skinned women up to 34.7%, lighter-skinned men 0.8% (3 commercial APIs, 2017) | 2018 | one-off (2019 follow-up: Raji & Buolamwini) | open | https://proceedings.mlr.press/v81/buolamwini18a.html |
| Race, sex, age (face) | NIST NISTIR 8280 + FRTE 1:1 report cards | false matches higher for African American, Asian and **American Indian** faces in US-developed algorithms (AI highest in domestic mugshots); women > men | 2019 report; report cards ongoing | continuous | PDF + per-algorithm HTML | https://pages.nist.gov/frvt/html/frvt_demographics.html |
| Gender identity (trans, nonbinary) | Scheuerman, Paul & Brubaker, CSCW | 10 commercial face services: worse on trans people; nonbinary people misclassified every time (binary labels only) | 2019 | one-off | open PDF | https://cmci.colorado.edu/idlab/assets/bibliography/pdf/Scheuerman2019-cscw-gender.pdf |
| Race (speech) | Koenecke et al., *PNAS* | 5 ASR systems: word error rate 0.35 Black vs 0.19 white speakers | 2020 (2019 systems) | one-off | open | https://www.pnas.org/doi/10.1073/pnas.1915768117 |
| Deaf (speech) | Zhao, Choi, Koenecke & Rameau, *Laryngoscope* | 4 APIs incl. Whisper: WER 52.6% deaf/hard-of-hearing vs 5.0% hearing speakers | 2024 | one-off | free PDF | https://koenecke.infosci.cornell.edu/files/Laryngoscope_Zhao2024.pdf |
| Race (dialect, LLM) | Hofmann, Kalluri, Jurafsky & King, *Nature* | LLMs covertly assign African American English speakers less prestigious jobs and harsher sentences | 2024 | one-off | open | https://www.nature.com/articles/s41586-024-07856-5 |
| Race × gender (LLM hiring) | Wilson & Caliskan, AIES | embedding résumé retrieval favored white names in 85.1% of tests, women's names 11.1%; Black men disadvantaged in up to 100% | 2024 | one-off | open | https://ojs.aaai.org/index.php/AIES/article/view/31748 |
| Race, gender (LLM hiring, newest) | Gao, Jiang & Yan, arXiv | 14 LLMs: GPT-3.5 (2023) shows +2.12 pp pro-white gap; 2024+ models no gap or a pro-Black gap up to ~3 pp; same on gender | 2026 (preprint) | one-off | open | https://arxiv.org/abs/2606.28978 |
| Race (LLM hiring, journalism) | Bloomberg, GPT-3.5/4 résumé ranking | Black-distinct names least likely ranked top for some roles; data on GitHub (methods disputed by interviewing.io) | 2024 | one-off | open data | https://github.com/BloombergGraphics/2024-openai-gpt-hiring-racial-discrimination |
| Disability (LLM hiring) | Glazko et al., FAccT | GPT-4 ranked résumés with disability-related awards lower; custom instructions cut bias for 5 of 6 | 2024 | one-off | open | https://facctconference.org/static/papers24/facct24-48.pdf |
| Religion (Muslim, LLM) | Abid, Farooqi & Zou, AIES | GPT-3 completed "Two Muslims walked into a…" with violence 66% of the time | 2021 | one-off | open | https://arxiv.org/abs/2101.05783 |
| Age (LLM hiring) | none found (only Mobley v. Workday lawsuit allegations) | gap | | | | |

## Other traits: population context (for denominators)
| Trait | Source | Latest | URL |
|---|---|---|---|
| LGBTQ+ share | Gallup: ~9% of US adults (9.3% in 2024); 23% of under-30s | 2025 (pub. Feb 2026) | https://news.gallup.com/topic/lgbt.aspx |
| Muslim Americans' discrimination | Pew 2017 Survey of US Muslims (verify figures) | 2017 | https://www.pewresearch.org/religion/2017/07/26/u-s-muslims-concerned-about-their-place-in-society-but-continue-to-believe-in-the-american-dream/ |
| Disability in games (meta card) | Abbott & Cornwell, Meaningful Play 2016 abstract | 2016 | https://meaningfulplay.msu.edu/proceedings2016/abstract.php?paperid=6 |

## UCSD education data
**Bottom line:** the data *is* downloadable, but via UCOP's Tableau server, not UCSD's.

| Source | Breakdowns | Download? | URL |
|---|---|---|---|
| UCSD IR "Undergraduate Demographics" page | embeds **UCOP** dashboard (fall enrollment at a glance): residency, gender, race/ethnicity, first-gen, Pell, sexual orientation (per IR index page) | **Yes.** Append `.csv` to the view: `https://visualizedata.ucop.edu/t/Public/views/fallenrollmentataglance/Ataglance.csv?CAMPUS=San%20Diego` returned UCSD rows (total 45,087 matches the CDS) | https://ir.ucsd.edu/stats/undergrad/undergrad-demogr.html |
| UCSD IR graduation & retention; degrees conferred | school, college, major dept, gender, race/ethnicity; first-year vs transfer; **no Pell/first-gen** listed | **Not by URL.** Hosted on `tableaupublic.ucsd.edu`; `.csv` returns 404 for guests. Toolbar "Download → Crosstab" untested (try in a browser), else email ir@ucsd.edu | https://ir.ucsd.edu/stats/undergrad/ug-retention.html |
| UCSD grad admissions | Tableau `HistoricalAdmissions` on tableaupublic.ucsd.edu; breakdowns unconfirmed (page didn't render) | same as above (unconfirmed) | https://grad.ucsd.edu/about/grad-data/admissions.html |
| UC Info Center: undergrad admissions summary | applicants/admits/enrollees by race/ethnicity (incl. American Indian, Pacific Islander), by campus | **Yes**, `.csv` works (tested `UGAdmissionsSummaryDataTable_0/Freshmen.csv`, 2017–) | https://www.universityofcalifornia.edu/about-us/information-center/undergraduate-admissions-summary |
| UC Info Center: graduation rates dashboard | freshman/transfer retention + graduation by campus, cohort, demographics; Highlights sheet shows overall vs **first-gen, Pell, underrepresented** | **Yes**, `.csv` works (tested `GraduationDashboardFinalRates/Highlights.csv`) | https://www.universityofcalifornia.edu/about-us/information-center/undergraduate-graduation-rates |
| UC Info Center: first-gen dashboard; degrees awarded tables | first-gen; degrees by discipline × residency, race, gender, first-gen | likely the same `.csv` pattern (untested) | https://www.universityofcalifornia.edu/about-us/information-center/first-generation-college-students |
| UCSD Common Data Set | B2 enrollment by race; B4–B21 6-yr graduation by **Pell / Stafford-only / neither** (2019 cohort: 81% / 86% / 89%, total 86%); B22 retention; C admissions by sex | PDF (2005–2026) | https://ir.ucsd.edu/stats/undergrad/common-data-set.html |
| IPEDS (NCES) | graduation rates by **race × sex** (an intersection) and by Pell; enrollment by race × sex | CSV via Data Center (UCSD unit ID 110680, verify) | https://nces.ed.gov/ipeds/ |
| College Scorecard | completion and earnings by Pell, first-gen | CSV + API | https://collegescorecard.ed.gov/data/ |

Intersections: UCOP/UCSD dashboards filter one dimension at a time (no race × gender × first-gen seen; unconfirmed). IPEDS has race × sex. Small cells are suppressed, so show them as "no data". UCOP update schedule: https://www.universityofcalifornia.edu/about-us/information-center/dashboard-update-schedule. Filter field names in the `.csv` URL must match Tableau field names (`CAMPUS` worked).

## Gaps ("no data" is a finding)
| Trait × area | What's missing | Why |
|---|---|---|
| Nonbinary × pay, hiring, loans, health | BLS CPS and HMDA record sex as male/female only; Census Household Pulse added gender identity in 2021, and in Feb 2025 Census asked to drop it (EO 14168); NHIS and NCVS gender-identity items also cut | federal policy; AI gender classifiers are binary (Scheuerman 2019) |
| Native American × AI speech/LLM | Koenecke, Gender Shades and LLM hiring audits don't report AIAN. **Exception:** NIST 8280 reports American Indian faces (highest false positives) | small samples |
| Pacific Islander × most areas | often merged with Asian or suppressed (KFF flags NHPI data gaps). HMDA, NCHS and UCOP do report NHPI separately | small n; OMB has required NHPI as a separate category since 1997 |
| Religion × pay, loans, health | federal surveys don't ask religion; lenders can't ask (ECOA/Reg B) | law + survey design |
| Jewish × hiring/AI | only one résumé audit (no penalty found, South 2014); no AI audit beyond Abid's analogy test | few studies |
| Disability × loans, promotion | HMDA has no disability field; no promotion data | not collected |
| LGBTQ+ × promotion, pay (official) | no federal series; Williams Institute surveys only | SOGI not in CPS |
| Age × AI | no peer-reviewed LLM age audit found (Workday lawsuit only) | new area |
| Skin tone (separate from race) × hiring, loans, health | nearly all US data is by race category, not skin tone | Pew 2021 and Hersch 2008 are the main exceptions |
| First-gen / Pell × everything but education | adult surveys use income or education, not first-gen | definitions |

## Placeholder fact check (27 `FACTS`)
| # | Fact (short) | Verdict | Correct figure / fix | Source URL |
|---|---|---|---|---|
| 1 | Black names ~⅓ fewer callbacks (B&M 2004) | **Correct** | 6.45% vs 9.65% (2001–02, Boston & Chicago) | https://www.aeaweb.org/articles?id=10.1257/0002828042002561 |
| 2 | White names ~50% more callbacks | **Correct** | same study | same |
| 3 | Women ~1 in 10 F500 CEOs (Fortune 2024) | **Correct, outdated** | 2024: 52 (10.4%); **2026: 56 (11.2%)** | https://www.fortune.com/2026/06/03/gm-fortune-500-highest-ranking-company-female-ceo-elevance-health-centene/ |
| 4 | Men ~9 in 10 F500 CEOs | **Correct** | 88.8% (2026) | same |
| 5 | Women earn 84¢ (Census 2023) | **Right number, wrong year** | 2023 data was 82.7¢, 2024 80.6¢; **2025 data: 83.9¢** (P60-289, Sept 2026). Cite "Census, 2025 data" | https://www.census.gov/library/publications/2026/demo/p60-289.html |
| 6 | Black women 67¢ (NWLC 2023) | **Roughly right, outdated** | 67¢ was the pandemic-era figure; **65¢ (2024 data, NWLC 2026)**. Better: compute from Census tables | https://nwlc.org/nwlc-in-the-press/how-black-womens-equal-pay-day-underscores-a-wage-gap-that-continues-to-persist/ |
| 7 | Latinas 55¢ (NWLC 2023) | **Wrong** | full-time year-round **58¢** (2023 data, NWLC Mar 2025); all workers 54¢. 55 matches neither | https://www.congress.gov/119/bills/hconres56/BILLS-119hconres56ih.htm |
| 8 | Darker women up to 34.7% vs lighter men 0.8% | **Correct** | note it's *gender classification*, not face recognition | https://proceedings.mlr.press/v81/buolamwini18a.html |
| 9 | Lighter men lowest error (<1%) | **Correct** | 0.0–0.8% by vendor | same |
| 10 | Speech recognition ~2× errors for Black speakers | **Correct** | WER 0.35 vs 0.19 (2019 systems) | https://www.pnas.org/doi/10.1073/pnas.1915768117 |
| 11 | Black women 2.6× maternal deaths (CDC 2021) | **Correct for 2021, outdated; wording** | 2021: 69.9 vs 26.6. **2024: 44.8 vs 14.2 (≈3.2×)**. NCHS counts "maternal" deaths (to 42 days); "pregnancy-related" is a different CDC system | https://www.cdc.gov/nchs/data/hestat/hestat113.htm |
| 12 | ~half of white med students held false beliefs (Hoffman 2016) | **Correct** | ~50% endorsed ≥1 false belief (n=222) | https://www.pnas.org/doi/10.1073/pnas.1516047113 |
| 13 | Black mortgage applicants denied ~2× white | **Roughly right (understated)** | conventional home purchase 2023: **16.6% vs 5.8% (2.9×)**; all applications 2024: 36.7% vs 21.8% (1.7×). Say which loan type | https://www.consumerfinance.gov/about-us/newsroom/ffiec-publishes-2023-data-on-mortgage-lending/ |
| 14 | Hispanic applicants denied more often | **Correct** | 12.0% vs 5.8% (2023, conventional home purchase) | same |
| 15 | Disability unemployment ~2× (BLS 2023) | **Correct, outdated** | 2023: 7.2% vs 3.5%; **2025: 8.3% vs 4.1%** | https://www.bls.gov/news.release/disabl.nr0.htm |
| 16 | ~4 in 10 doctors very confident (Iezzoni 2021) | **Correct** | 40.7% | https://www.healthaffairs.org/doi/10.1377/hlthaff.2020.01452 |
| 17 | ~1 in 5 games allow a disabled character (MSU 2016) | **Correct per abstract** | ~20%; conference abstract by Abbott & Cornwell, sample size unknown (weak source) | https://meaningfulplay.msu.edu/proceedings2016/abstract.php?paperid=6 |
| 18 | Hijab: fewer callbacks + hostile treatment | **Roughly right** | in-person applications, not résumés; "more negativity, less interest" rather than "hostile"; exact rates paywalled (unconfirmed) | https://journals.sagepub.com/doi/10.1177/0018726712469540 |
| 19 | 40,000 résumés, older applicants fewer callbacks | **Correct** | 40,000+ applications, 13,000+ jobs | https://www.journals.uchicago.edu/doi/10.1086/701029 |
| 20 | Age discrimination strongest for older women | **Correct** | authors find much less robust evidence for older men | same |
| 21 | Gay men ~40% fewer callbacks (Tilcsik 2011) | **Roughly right** | 7.2% vs 11.5% = **~37% fewer** (straight ~1.6× more) | https://www.journals.uchicago.edu/doi/10.1086/661653 |
| 22 | Asian Americans most likely hired, least likely promoted (Ascend 2015) | **Roughly right, overstated** | 5 firms, 2013 data: 27% of professionals, 14% of executives. "Most likely hired" isn't what it measured | https://www.ascendleadership.org/research |
| 23 | AIAN life expectancy ~11 yrs shorter (CDC 2021) | **Correct for 2021, outdated** | 2021: 65.2 vs 76.4; **2024: 71.1 vs 79.0 (7.9 yrs)** | https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-05.pdf |
| 24 | AI audits don't report Native Americans | **Roughly right, needs exception** | true for speech and LLM audits, but NIST 8280 found American Indians had the highest false-match rates in US mugshot data | https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf |
| 25 | Pacific Islanders folded into "Asian" | **Roughly right** | common in studies; but federal datasets (HMDA, NCHS, UCOP) do separate NHPI. Cite KFF/AHRQ on data gaps | https://www.kff.org/key-data-on-health-and-health-care-by-race-and-ethnicity |
| 26 | Federal labor surveys didn't collect nonbinary until recently | **Roughly right, update** | BLS CPS still doesn't; Census Pulse did 2021–25, then removal requested under EO 14168 | https://www.kpbs.org/news/politics/2025/02/21/census-bureau-stopped-work-on-data-for-protecting-trans-rights-former-director-says (secondary; find the OMB/Census notice) |
| 27 | Darker-skinned immigrants earn less (Hersch 2008) | **Correct** | lightest earn **~17% more** than comparable darkest (NIS 2003); `eff: .9` understates | https://www.bostonfed.org/-/media/Documents/cb/PDF/Hersch_immigrant_skin_color.pdf |

**Tally:** 1 wrong (#7); 18 correct, 5 of them outdated or misdated (#3, #5, #11, #15, #23); 8 roughly right (wording or a missing caveat: #6, #13, #18, #21, #22, #24, #25, #26). None fully unverifiable, but #18's rates and #17's sample are paywalled or unknown.

Link note: journal DOI links (PNAS, Health Affairs, U. Chicago Press) block scripted checks (403), so they were cited from the DOI, not opened. Click through once before publishing.

Design notes from the check:
- `eff` weights don't match the sources (B&M is 1.5×, coded 1.15/.67; Hersch 17% coded .9). Either derive `eff` from the cited ratio or drop the multiplier and just show the numbers.
- Put **data year** (not publication year) on every card, e.g. "Census, 2025 data".
- Prefer the agency table over the advocacy summary (NWLC → Census PINC tables; Fortune is fine as the list owner).
