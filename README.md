# ResearchBridge MVP demo

A responsive, dependency-free web app based on the supplied ResearchBridge designs and the research marketplace spec.

## Run locally

With Node (no `npm install` needed — the dev server has zero dependencies):

```sh
npm run dev
```

Or without Node: `python3 -m http.server 8765 --directory dist`

Either way, open http://localhost:8765. No build step is required. Optional AI uses a key you paste in Settings; matching works without it.

Other scripts: `npm test` (syntax check + logic tests), `npm run verify` (check SHA256SUMS.txt), `npm run checksums` (regenerate it).

## Suggested demo

1. On Home, choose a workspace role (Researcher, Organization, or Investor).
2. Open People. Add a researcher with a name, institution, topics, and publication title.
3. Search for the new person, edit their profile, and refresh to confirm persistence.
4. Open Matches. Save an opportunity such as “computer vision for industrial quality inspection” and choose Research collaboration.
5. View ranked matches, evidence, and the relevance score. Request an introduction, edit the draft, check the review box, and send the demo request.
6. In Introductions, accept or decline as the researcher.
7. Switch to Opportunities for you to express interest in a saved opportunity.
8. Open Dashboard for completeness, pending intros, and saved people.
9. Add a research post; edit, bookmark, search, or delete it.
10. Explore Collaboration documents, messages, milestones, and activity ledger.
11. Use Industry settings to edit the organization, optionally add an AI key, export or import JSON, or reset the demo.

## Scope

All people and publications are demonstration data. Matching is deterministic topic/method/evidence scoring. Optional AI (if a key is provided) is used only for extraction, match explanations, and outreach drafts. Scores are internal ranking signals, not calibrated probabilities or investment advice. Only public (or limited) profiles with a compatible opportunity type and publication evidence appear in matching results.

Data is stored in localStorage per browser and origin. It is not synchronized between devices, localhost, and the hosted site. JSON export strips API keys. No external messages are sent unless you configure optional AI. All records are editable within this single-user demo workspace; this is not production authentication or access control.

Validation: JavaScript syntax check and automated logic tests cover profile create/edit/search/delete, persistence serialization, matching and no-match, reverse matching, introduction acceptance, posts/bookmarks, dashboard rendering, NDA-route removal, and rendering of all views.
