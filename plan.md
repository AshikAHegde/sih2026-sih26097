# Master Implementation Plan: Livelihood Evidence Loop Prototype
**Document Reference:** Livelihood Evidence Loop Blueprint (Oct 2, 2026)  
**Beneficiary Spoken Name:** *Hunar Line* | **Scope:** 1 District (5 Blocks, 20 Village Clusters, 4 Sectors, 7 Pathways)  
**Architecture:** Offline-First, Event-Sourced (`State = Seed + Event Log`), Deterministic Rule-Based Engine  

---

## 1. Executive Summary & Strict Constraints

### Product Thesis
We are not building an AI counsellor. We are building the instrument a district uses to decide what to fund. The voice conversation is how that instrument is fed, and good advice is how the person is repaid for feeding it.

### Strict System Directives (What NOT to Build)
1. **NEVER use an LLM for decision making, ranking, or diagnostics in application logic.** All 7 engines are 100% deterministic rules with config-driven thresholds.
2. **NEVER invent numbers.** Every figure is derived strictly from the seeded demo dataset (Oct 2, 2026).
3. **Strict Privacy:** Zero fields for caste, surname, religion, identity number (Aadhaar), or full street address anywhere in code, seed data, or database.
4. **Honesty Labels:** The non-dismissible banner *"Simulated district. Every figure here is demo data."* must appear on every screen. Every number and chart carries a provenance chip and simulated indicator.
5. **No Mutation:** Seed data is strictly immutable. All user choices, confirmations, and administrative overrides are stored as appended events in the `eventLog`.
6. **Zero External Network Dependencies:** The prototype runs 100% offline from static bundles.

---

## 2. Implementation Phases & Ledger

### Phase 0: Foundation (10% Effort)
**Goal:** Build the shell, load seed data, establish role switching, and stub rule modules.
- [x] **0.1 Frontend Scaffold:** Vite + React 18 + TypeScript + Tailwind CSS with offline bundle build (`/app/dist`).
- [x] **0.2 Design System Tokens:** Strict implementation of `ui_spec.md` tokens (Paper `#F5F7FA`, Surface `#FFFFFF`, Ink `#1A2233`, Ink Soft `#55607A`, Rule `#D8DEE8`, Indigo `#2F3E9E`, Marigold `#F2A20C`, Room `#0E7C6B`, Uncertain `#6B7385`, Crowded `#B5471B`).
- [x] **0.3 Top Bar & Honesty Header:** District name (*Chandauli / Pragati*), permanent simulated honesty banner, data date ("Oct 2, 2026"), role switcher, story mode toggle, and Reset Demo button.
- [x] **0.4 Seed Loader & Event Store:** Strict event-sourcing store (`useEventStore`), append-only event logging, deterministic resets.
- [x] **0.5 The Seven Deterministic Rule Modules:**
  1. Skill Evidence (`skillEvidence.ts`)
  2. Diagnosis (`diagnosis.ts`)
  3. Pathways (`pathways.ts`)
  4. Signals (`signals.ts`)
  5. Verdict (`verdict.ts`)
  6. Allocation (`allocation.ts`)
  7. Outcomes (`outcomes.ts`)
- [x] **0.6 Validation Test Suite:** Automated test runner (`npm run validate-seed`) verifying exact seed numbers (Devgaon: 84 existing, 27 recent, 9 median days, 34% verified; 5 blocks, 20 clusters, 5 personas, 0 privacy leaks).
- [x] **Phase 0 Verification Check:** Passes 19/19 automated test assertions; offline build succeeds with zero errors.

---

### Phase 1: Beneficiary Flow (12% Effort)
**Goal:** Complete Sunita's scripted conversation on the phone view.
- [x] **1.1 Phone Frame:** Realistic 390x844px mobile viewport with iOS/Android frame and responsive positioning.
- [x] **1.2 Script Player:** Audio level visualization meter, turn-by-turn playback (Turns A1 through A16), bilingual subtitles (Hindi & English), 1x/1.5x playback speed toggle.
- [x] **1.3 Screen Inventory Implementation:**
  - `V0` Language Selection (Hindi default)
  - `V1` Three-part Consent (Advice, District Planning, Follow-up check-in)
  - `V2` Live Voice Conversation with active transcript and speaking indicators
  - `V3` Fact Confirmation Screen with granular "Not right" re-prompts
  - `V4` Skill Summary with RPL Pre-Screen Banner (Likely ready)
  - `V5` Ranked Option Tiles with expandable "Why?" drawers
  - `V6` Final Choice Confirmation
  - `V7` Next Step Action Guidance (venue, helper contact, time)
  - `V8` Follow-up Outcome Check-in (4 questions)
  - `V9` Immediate Privacy Pause (blanks screen & cuts audio in 1 tap)
  - `H2` Helper New Session Screen (phone and WhatsApp entry permanently disabled)
- [x] **Phase 1 Verification Check:** C-01 script plays A1 to A16 successfully, pause blanks the screen and logs an event, option choice commits an event.

---

### Phase 2: Skill Evidence & Diagnosis (15% Effort)
**Goal:** Convert spoken words into unit evidence, pre-screen results, and barriers.
- [x] **2.1 Skill Catalogue:** Three trades mapped to National Qualifications Register (NQR):
  - Self Employed Tailor (`AMH/Q1947`, Level 3, 7 core units)
  - Rural Mason (`CON/Q0103`, Level 3, 7 core units)
  - Two-Wheeler Service Technician (`ASC/Q1411`, Level 4, 6 core units)
- [x] **2.2 Skill Evidence Engine:** Level 0–4 assessment marking based on direct transcript quotes:
  - Level 0: No mention
  - Level 1: Mentioned
  - Level 2: Stated specific tools/tasks
  - Level 3: Verified past work
  - Level 4: Tested/Demonstrated
- [x] **2.3 RPL Pre-screen Rule:**
  - Likely ready ($\ge 70\%$ of core units)
  - Partly ready ($40\% - 69\%$)
  - Not yet ($< 40\%$)
  - Non-dismissible pre-screen banner: *"This is a pre-screen, not a certification. An on-site assessor makes the formal decision."*
- [x] **2.4 Diagnosis Module:** 7 barrier markers (Skill, Certification, Capital, Market Access, Mobility, Information, Placement) producing plain-text diagnostics and support packages.
- [x] **2.5 Person-Only Ranking Engine:** Deterministic baseline ranking without spatial market evidence.
- [x] **2.6 Skill Evidence Pane & Modal:** Dual-pane inspection modal (`C5a`) displaying Level 0–4 markers with bidirectional quote-to-unit highlighting.
- [x] **Phase 2 Verification Check:** Sunita evaluates to 5/7 core units (71% → Likely ready) and diagnosis: *"Certification and customer access. Not skill."*

---

### Phase 3: Local Intelligence (18% Effort)
**Goal:** Signals, verdicts, Livelihood Map, drawer, and the re-rank animation.
- [x] **3.1 Simulated Cells:** 72 cells crossing village clusters with pathways.
- [x] **3.2 Signals A through F Module:**
  - Signal A: Active local workers (Worker Directory proxy)
  - Signal B: Recent trainees in last 2 years (Training MIS proxy)
  - Signal C: Median paid days / month (SHG survey proxy)
  - Signal D: Past batch outcome verification (Independent check-in proxy)
  - Signal E: Enterprise & order density (Cluster enterprise census proxy)
  - Signal F: Absorptive capital & credit access (SHG loan ledger proxy)
- [x] **3.3 Verdict Engine:** Deterministic rule generating *Likely room*, *Uncertain*, or *Likely crowded* with *High*, *Medium*, or *Low* confidence. (No decimals or black-box scores).
- [x] **3.4 Livelihood Map (`C2`):** 20-cluster grid tile map with sector/pathway filters and distinct hatched texture for *Uncertain* cells.
- [x] **3.5 Evidence Drawer (`C2a`):** Slide-over drawer with 6 signal meters, provenance chips ("Real public source", "Verified sample"), sample sizes, and plain-language recommendation sentences.
- [x] **3.6 Re-rank Animation:** Animated option reordering (600ms transition) triggered by local evidence toggle (`L` key), leaving an outlined *"was 1st"* badge on displaced options.
- [x] **Phase 3 Verification Check:** Devgaon own tailoring evaluates to *Likely crowded, Medium confidence*. Re-rank moves own tailoring from 1st to 3rd.

---

### Phase 4: Officer Console (10% Effort)
**Goal:** Dashboard navigation, people management, and data trust screens.
- [x] **4.1 Navigation Rail:** Left sidebar connecting all officer views (Overview, Map, Opportunities, Plan Builder, People, Outcomes, Data & Trust).
- [x] **4.2 C1 Overview:** Actionable change feed with deep links, urgent decisions waiting, mini district map, and core metrics.
- [x] **4.3 C5 People Management:** High-density data table with tabular lining figures, search, multi-faceted filtering, and zero caste/PII fields.
- [x] **4.4 C5a Person Profile Modal:** Complete history with Skill Evidence breakdown, Barrier Diagnosis, and Audit Timeline.
- [x] **4.5 C7 Data & Trust Audit Suite:**
  - Sources tab (catalog of real public proxies)
  - Rules tab (inspectable thresholds read dynamically from config)
  - Privacy & Consent audit log
  - Immutable event log viewer
- [x] **Phase 4 Verification Check:** Opening any profile or drawer logs an audit event; feed items deep-link directly to target screens.

---

### Phase 5: Allocation Engine (15% Effort)
**Goal:** Interventions, Plan Builder, and Cohort specifications.
- [x] **5.1 Allocation Rule Engine:** Computes viable intervention batches based on geographic reach limits, pre-screen readiness, and cluster viability thresholds.
- [x] **5.2 C3 Opportunities Ledger:** Tracks candidate pools for RPL camps, SHG uniform orders, and local training batches.
- [x] **5.3 C4 Plan Builder:**
  - Before/After segmented seat distribution bar
  - Line replacement action requiring a mandatory typed reason
  - Automatic flagging of beginner training lines (`L1`) when crowded
- [x] **5.4 C4a Cohort Specification:** Complete work order detailing target skills, assessor requirements, and travel radii.
- [x] **5.5 Provider Desk (`P1` & `P2`):**
  - `P1` Cohort Inbox for training partners
  - `P2` Capacity Confirmation and assessor assignment
- [x] **Phase 5 Verification Check:** Sunita choosing uniform orders increments Opportunity `O1` from 19 to 20/20, tripping the viability threshold and marking Beginner Line `L1` for replacement.

---

### Phase 6: Outcome Verification (8% Effort)
**Goal:** Check-ins, verified outcomes, and feedback loops.
- [x] **6.1 Outcomes Rule Engine:** Compares claimed training provider completion rates against independent ground check-ins.
- [x] **6.2 V8 Check-in Flow & Helper Desk (`H1`, `H3`, `H4`):**
  - 4-question phone check-in for past trainees
  - Helper task management screen for in-person follow-ups
- [x] **6.3 C6 Outcomes Screen:** Side-by-side Claimed vs. Verified charts, discrepancy callouts, and Learning Events ledger.
- [x] **6.4 Feedback Loop:** Independent check-in updates Signal D for the cell, raising confidence to High and triggering a district Learning Event.
- [x] **Phase 6 Verification Check:** Asha's check-in updates Devgaon verified count to 20 reached, updates confidence to High, and fires Learning Event `LE-01`.

---



### Phase 7: Story Mode & Presenter Experience (12% Effort)
**Goal:** The presenter mode, the "WOW" moment, animations, and final polish.
- [x] **7.1 S1 Story Mode:** Split-screen layout showing mobile Beneficiary View side-by-side with Officer Console, keyboard navigation (`←`, `→` arrow keys), beat progress bar, and speaker notes.
- [x] **7.2 The 12-Beat Demo Flow:**
  - Beat 1: The Problem (GIA beginner seats mismatch)
  - Beat 2: Sunita's Call (Spoken work history)
  - Beat 3: Evidence Extracted (Level 0–4 units)
  - Beat 4: Pre-screen & Diagnosis ("Not skill")
  - Beat 5: Person-Only Options (Own tailoring #1)
  - Beat 6: Local Evidence Applied (Re-rank animation, own tailoring drops to #3)
  - Beat 7: Sunita Chooses Uniform Orders
  - Beat 8: The WOW Sequence (Dot travels to map, O1 hits 20/20, L1 flagged)
  - Beat 9: Officer Replaces Plan Line with typed rationale
  - Beat 10: Provider Desk Confirms Assessor Capacity
  - Beat 11: Asha's Outcome Check-in (34% verified vs 78% claimed)
  - Beat 12: Loop Closed (District learning event updates next allocation)
- [x] **7.3 The WOW Moment Sequence:** Animated traveling Marigold dot from phone screen to district map, triggering threshold counter increment (19 → 20) and beginner line alert.
- [x] **7.4 Accessibility & Motion:** Full support for `prefers-reduced-motion` and keyboard focus traps.
- [x] **Phase 7 Verification Check:** Full 12-beat flow executes smoothly in under 7 minutes without errors.

---

### Phase 8: "Should-Have" Enhancements & Judge Defense Toolkit (Section 27.2 & 24)
**Goal:** Deliver the high-impact extensions specified in Blueprint Section 27.2 to harden the prototype against judge scrutiny and prove multi-persona generalization.
- [ ] **8.1 Live Sentence Parser & Evidence Extractor (§27.2):** Interactive sandbox in the Voice Session allowing judges to type arbitrary spoken work statements (Hindi/English) and watch the deterministic engine extract tasks, match NQR units, and assign Levels 0–4 with exact quote spans.
- [ ] **8.2 Raju & Manoj Multi-Persona Conversations (§27.2):** Playable scripted conversations and profiles for Raju (Rural Mason: 21/23 lacking Unit M1, proving bridge module need) and Manoj (Two-Wheeler Mechanic: selecting private repair shop against default ranking, proving beneficiary agency).
- [ ] **8.3 Extended Opportunity Modals O4–O8 (§27.2 & §11):** Detail specs and candidate cohorts for O4 (Mason Bridge), O5 (Kusumi Rural Site), O6 (Nahar 2-Wheeler Hub), O7 (Sadar Garment Operators), and O8 (Enterprise Capital Linkage).
- [ ] **8.4 4 Additional Livelihood Map Layers & Table View (§27.2 & §14):** Map layer toggles for Worker Density (Signal A), Recent Trainees (Signal B), Paid Days Workload (Signal C), Verified Outcomes (Signal D), plus an accessible tabular alternative.
- [ ] **8.5 Interactive 20-Question Judge Defense Panel (§24):** Modal accessible from the Top Bar containing the 20 hardest judge questions with deep links jumping directly to the proving screen or drawer.
- [ ] **8.6 Pre-Screen vs. Assessor Calibration on C6 (§27.2):** Visual audit row comparing pre-screen predictions against formal on-site assessor results to demonstrate self-correcting threshold calibration.

---

## 3. Section 21.4 Seed Data Verification Checklist

The prototype is verified against the exact values defined in Blueprint Section 21.4:

| Verification Item | Specification Requirement | Implemented & Verified |
| :--- | :--- | :---: |
| **Devgaon Own Tailoring Inputs** | 84 existing, 27 trained, 15 worker checks (median 9 days), 22 due / 19 reached / 6 working | ✅ Verified |
| **Devgaon Own Tailoring Verdict** | Likely crowded, Medium confidence | ✅ Verified |
| **Panchayat Hall Tailors Reach** | 19 ready tailors: Devgaon (8), Rampura (5), Bela (3), Sonpur (3) | ✅ Verified |
| **Block Office Reach** | 13 ready tailors; Sunita brings pool to 14 of 20 | ✅ Verified |
| **Uniform Orders Demand** | 12 people interested in Nadi Paar cluster | ✅ Verified |
| **Own Tailoring Demand** | 11 people in Devgaon | ✅ Verified |
| **Pahadi Rural Masons** | 23 partly ready (including Raju), 21 lack unit M1 | ✅ Verified |
| **Kusumi & Mahuadih Masons** | 18 beginners across 5 villages (11 with limits, 7 without) | ✅ Verified |
| **Nahar Two-Wheeler Mechanics** | 4 seeking own shop (including Manoj) | ✅ Verified |
| **Sadar Sewing Operators** | 26 skilled/trained operators | ✅ Verified |
| **Provider A Record** | 72 completed, 56 claimed working, 58 reached, 20 verified working (34%) | ✅ Verified |
| **Cluster Verdict Distribution** | 6 Likely crowded, 9 Uncertain, 5 Likely room | ✅ Verified |
| **Sunita Choice Transition** | O1 increments from 19 to 20/20; O2 at 13; Devgaon workload 16 | ✅ Verified |
| **Asha Check-In Transition** | Devgaon outcomes reach 20; confidence becomes High | ✅ Verified |

---

## 4. Acceptance Criteria Audit (Blueprint Section 30)

- [x] **30.1 The Three Proofs:**
  - *Diagnose:* C-01 yields 5/7 core units, Likely ready RPL band, and barrier: *"Certification and customer access. Not skill."*
  - *Allocate (Individual):* Local evidence moves own tailoring 1st → 3rd with *"was 1st"* outline tag and plain-text reasons.
  - *Allocate (District):* Sunita's choice trips Opportunity O1 (19 → 20), flags L1 beginner seats, and appends to feed.
  - *Verify:* Asha's check-in updates verified outcomes to 20 reached, updates confidence to High, and logs learning event.
- [x] **30.2 Data Honesty:**
  - Non-dismissible *"Simulated district"* banner present on all views.
  - Crop test: Any cropped chart or table retains visible "Simulated" tag.
  - Every signal row displays data provenance chip and links to real NQR standard.
  - Zero decimal percentages, scores, or black-box AI metrics displayed.
- [x] **30.3 Agency & Privacy:**
  - 3-part consent modal; refusal strictly omits person from district counts.
  - 1-tap privacy pause blanks screen and terminates audio immediately.
  - Zero PII (caste, surname, religion, Aadhaar, full address) anywhere in database.
  - Officer sees masked phone numbers and first name + initial only.
- [x] **30.4 Deterministic Rules & Explainability:**
  - All verdicts include plain-language vote summary and "What would change this".
  - Config threshold modifications recalculate verdicts without code changes.
  - Deterministic reset restores initial seed state instantly.
- [x] **30.5 Presentation & Polish:**
  - 12 beats navigate cleanly via keyboard arrow keys (`←`, `→`).
  - Strict compliance with 4px grid spacing, tabular numbers, and color tokens.
  - Full bundle compiles offline with zero console warnings.

---

## 5. Next Steps & Ongoing Maintenance
1. Keep automated validation tests active on every build (`npm run validate-seed`).
2. Maintain strict separation of deterministic rules from React presentation components.
3. Preserve event log immutability for all interactive demonstration sessions.
