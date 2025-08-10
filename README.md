# SBA-308-JavaScript-Fundamentals

## What I’d Do Differently 


* **Difine the data first:** define `Assignment`, `Submission`, result row; choose one lookup (`metaById`) and stick to naming.
* **Write pseudocode:** validate → filter due → index by id → group by learner → compute ratios & avg.

* **Plan logging:** debug once per stage, not inside inner loops.

# What was difficult
* Dates: Converting due_at strings to Date objects and ignoring future dates.

* Lookup & grouping: Making a stable index (metaById) and grouping submissions by learner.

* Math details: Correct ratio score / points_possible, clamping to 0..max, and rounding to 3 decimals.

* How to make it easier next time
* Write rules first: Define output shape, * ignore-future rule, ratio formula, and rounding policy.

* Plan with pseudocode: Validate → filter due → build index → group by learner → compute ratios and average.

## If I Had More Time

* **Type safety & structure:** Add JSDoc/TypeScript, split logic into small pure functions (`getDueAssignments`, `groupByLearner`, `computeRow`).
* **Configurable rules:** Make rounding (2 vs 3 decimals), ratio vs %, and late-penalty rules configurable.
* **Validation & errors:** Validate inputs, handle invalid dates, missing fields, and out-of-range scores with clear messages.
* **Tests & CI:** Write unit tests for edge cases (no due items, zero points, missing submissions) and add a simple CI run.
* **Better diagnostics:** Replace ad-hoc logs with a debug flag and stage-level summaries (after filter/index/group).
* **Docs & examples:** Add a quick example in the README showing input → output.

## Notes to Future Me

* **Dates:** Always convert `due_at` strings to `Date` objects before comparing. Ignore future dates.
* **Lookups:** Pick one name (`metaById`) and keep it everywhere. Prefer one array of objects, not parallel arrays.
* **Buckets:** Initialize before `push` (e.g., `obj[id] = obj[id] || []`).
* **Math:** Ratio = `score / points_possible`; clamp 0..max; rounding = `Math.round(x*1000)/1000` (not `/100`).
* **Loops & scope:** Use one loop variable name (`assignment`) consistently; compute `earned/ratio` **inside** that loop.
* **Guard clauses:** Early return on `course.id !== ag.course_id` and when there are no due assignments.
