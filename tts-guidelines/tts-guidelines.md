# Connected TV Screen-Reader / TTS Style Guide (WCAG 2.2 AA)

## Scope

|  |  |
| --- | --- |
| **Target** | WCAG 2.2 Level AA (A + AA criteria) |
| **Platforms** | Apple tvOS, Android TV / Google TV, Amazon Fire TV, Roku, Samsung Tizen, LG webOS, Vizio SmartCast, Comcast X1, and other connected TVs. D-pad / remote navigation only. |
| **Covers** | Screen-reader / text-to-speech behavior only: semantics, name/role/state, announcements, reading & focus order, non-text alternatives, links, forms, sensory cues, component patterns. |
| **Out of scope** | Visual criteria (contrast, text resize, reflow, focus-indicator appearance), captions/audio description (1.2.x), non-screen-reader input methods, motion/timing. These belong in separate guides. |
| **Non-web applicability** | WCAG 2.2 is written technology-neutrally; this guide applies it to connected-TV apps per W3C's **WCAG2ICT** guidance for non-web software (screen = page, D-pad = keyboard interface, platform accessibility API = markup semantics). EN 301 549 applies WCAG-derived requirements to software, including TV apps. |

All criteria cited below were verified against the W3C WCAG 2.2 Recommendation (w3.org/TR/WCAG22) and its Understanding documents. **4.1.1 Parsing was removed in WCAG 2.2** and is not cited anywhere in this guide.

---

## How to use this guide

This guide is applied to *any* screen. It defines rules and patterns, never screen-specific text. Apply Section 2 (core rules) to every screen, Section 3 to each component type present, Section 5 as the per-screen checklist, and Section 6 as the acceptance-test template.

> ### 🥇 Golden rule: never hard-code spoken strings
> 
> A control's **accessible name is derived from its visible label at runtime**. Role and state are carried by **accessibility properties** (traits, roles, state descriptions) — never concatenated into the name string. Do not write "the screen reader must say '…'" requirements. This keeps guidance correct when copy changes, keeps localization in one place, and lets each platform's screen reader phrase role and state natively.
> 
> Corollaries: refer to elements by **purpose/role**, not wording; supply text only where nothing visible exists (icon-only controls, images); never bake role words ("button") or state words ("selected") into a name — the platform speaks them from properties.

---

## 1. WCAG 2.2 criteria covered

⭐ = the two most-failed criteria on TV/OTT. Wire these first.

| SC | Title | Level | What it means for us |
| --- | --- | --- | --- |
| **4.1.2** ⭐ | **Name, Role, Value** | **A** | Every UI component exposes an accessible name, a correct role, and its current states/values through the platform accessibility API — and notifies the API when they change. The root cause of most TV screen-reader failures (unlabeled tiles, custom controls with no role, toggles that don't report state). |
| **4.1.3** ⭐ | **Status Messages** | **AA** | Content changes that don't receive focus (loading finished, row updated, item added, inline error) are announced programmatically without moving focus. The second-biggest TV failure: silent spinners, silent errors, silent content swaps. |
| 1.1.1 | Non-text Content | A | Every meaningful image/icon has a text alternative; decorative ones are hidden from the accessibility tree. |
| 1.3.1 | Info and Relationships | A | Structure conveyed visually (headings, rows, groups, lists, label↔field pairing) is exposed programmatically. |
| 1.3.2 | Meaningful Sequence | A | Screen-reader reading order matches the logical order of the content. |
| 1.3.3 | Sensory Characteristics | A | Instructions never rely only on shape, color, position, or sound. |
| 1.3.5 | Identify Input Purpose | AA | Inputs collecting common personal data (email, name, etc.) expose their purpose programmatically (e.g., HTML `autocomplete` on web-based TVs) so assistive tech can announce it and autofill can help. Applies only to screens with such inputs. |
| 1.4.1 | Use of Color | A | Color is never the only carrier of information; the equivalent must be programmatic so it can be spoken. |
| 1.4.2 | Audio Control | A | Auto-playing audio (previews, trailers) can be paused/stopped/muted so it doesn't drown out TTS. |
| 2.1.1 | Keyboard | A | All functionality operable through the keyboard interface — on TV, the D-pad/remote is that interface. |
| 2.1.2 | No Keyboard Trap | A | Focus can always leave any component/overlay via the remote. See the D2 exception for required-choice dialogs: completing the dialog via any of its actions is the keyboard exit. |
| 2.4.2 | Page Titled | A | Every screen has a programmatic title describing its purpose. |
| 2.4.3 | Focus Order | A | D-pad focus moves in an order that preserves meaning and operability. |
| 2.4.4 | Link Purpose (In Context) | A | The purpose of every link/navigational action is determinable from its accessible name plus programmatic context. |
| 2.4.6 | Headings and Labels | AA | Headings and labels describe topic or purpose. |
| 2.5.3 | Label in Name | A | Where a control has a visible text label, the accessible name contains that text (automatic if the name is derived from the label — see golden rule). |
| 3.1.1 | Language of Page | A | The screen's default human language is programmatically set so TTS uses the right voice/pronunciation. |
| 3.1.2 | Language of Parts | AA | Content in another language (e.g., foreign-language titles where the platform supports it) is marked so TTS can switch. |
| 3.2.1 | On Focus | A | Receiving D-pad focus never triggers a change of context. |
| 3.2.2 | On Input | A | Changing a setting/control value never triggers an unexpected change of context. |
| 3.2.3 | Consistent Navigation | AA | Repeated navigation (nav rails, menus) appears in the same relative order on every screen. |
| 3.2.4 | Consistent Identification | AA | Components with the same function have consistent accessible names/roles across screens. |
| 3.3.1 | Error Identification | A | Input errors are identified and described to the user in text. |
| 3.3.2 | Labels or Instructions | A | Inputs have labels; required formats are stated. |
| 3.3.3 | Error Suggestion | AA | Known fixes for an error are suggested. |
| 3.3.7 | Redundant Entry | A | *(New in 2.2)* Information already entered in a process is auto-populated or selectable, not re-typed — critical with on-screen TV keyboards. |
| 3.3.8 | Accessible Authentication (Minimum) | AA | *(New in 2.2)* No cognitive function test to sign in; support alternatives (e.g., device/code-based activation flows rather than transcription puzzles). |

---

## 2. Core rules — apply to every screen

### A. Structure & reading order

| # | Rule | SC |
| --- | --- | --- |
| A1 | Expose visual structure programmatically: mark headings as headings, lists as lists, groups as groups. A style change alone (size, weight, color) is not structure. | 1.3.1 (A) |
| A2 | The accessibility tree's reading order must match the logical visual order (typically top→bottom, start→end per locale). Verify after any absolute-positioning or z-order layout. | 1.3.2 (A) |
| A3 | Every screen exposes a programmatic title (screen/window/page title per platform) announced on entry, describing the screen's purpose. | 2.4.2 (A) |
| A4 | Headings and section labels describe the topic of the content they introduce; container purpose (e.g., a content row's category) is announced before or with its first item. | 2.4.6 (AA), 1.3.1 (A) |
| A5 | Set the screen's default language on the accessibility root; mark differently-languaged parts where the platform API supports it. | 3.1.1 (A), 3.1.2 (AA) |
| A6 | Purely decorative elements (background art, gradients, dividers) are excluded from the accessibility tree. | 1.1.1 (A) |

### B. Name / role / state

| # | Rule | SC |
| --- | --- | --- |
| B1 | Every focusable/interactive element exposes: **name** (derived from its visible label at runtime), **role** (from a native control or explicit role property), and **current state/value** (selected, checked, expanded, disabled, position, value). | 4.1.2 (A) |
| B2 | Prefer the platform's native control/role. Only build custom when no native role fits — and then set role + state properties explicitly. Never simulate role or state by appending words to the name. | 4.1.2 (A) |
| B3 | When a control has visible text, its accessible name is that text (plus optional non-visible suffix context, never a replacement). Deriving name from label at runtime satisfies this automatically. | 2.5.3 (A) |
| B4 | When state or value changes (toggle flips, selection moves, value adjusts), update the accessibility property so the platform notifies the screen reader. Changing only the visual is a failure. | 4.1.2 (A) |
| B5 | Same function ⇒ same name/role pattern on every screen (e.g., the primary playback action, the add-to-list action). Keep a shared component vocabulary. | 3.2.4 (AA) |
| B6 | Disabled/unavailable states are exposed as a programmatic state, not conveyed only by dimming. | 4.1.2 (A), 1.4.1 (A) |

### C. Announce changes without moving focus

| # | Rule | SC |
| --- | --- | --- |
| C1 | Any status message — content loaded, action succeeded/failed, item added/removed, count changed — is exposed via the platform's announcement/live-region mechanism so it is spoken **without** receiving focus. | 4.1.3 (AA) |
| C2 | Never steal focus to announce. Moving focus to a message is a change of context; reserve focus moves for true context changes (modals). | 4.1.3 (AA), 3.2.1 (A) |
| C3 | If content under or near focus is replaced (e.g., a row refreshes, details pane updates on selection), announce the update or ensure the newly focused element re-announces with fresh name/state. | 4.1.3 (AA), 4.1.2 (A) |
| C4 | Rate-limit announcements: coalesce rapid updates; a progress announcement pattern should announce start, meaningful milestones, and completion — not every tick. | 4.1.3 (AA) |
| C5 | Auto-playing preview/trailer audio must be pausable/stoppable/mutable so it cannot mask TTS output; prefer suppressing autoplay audio while the screen reader is active where the platform exposes that signal. | 1.4.2 (A) |

### D. D-pad focus management

| # | Rule | SC |
| --- | --- | --- |
| D1 | Everything operable is reachable and operable by D-pad/remote alone; focus order preserves meaning (matches reading order unless a purposeful deviation is justified). | 2.1.1 (A), 2.4.3 (A) |
| D2 | No focus traps: every overlay, keyboard, and component can be exited with standard remote input (Back at minimum). **Exception — required-choice dialogs:** a dialog may require an explicit choice before dismissal (e.g., legally required consent) provided (a) focus moves freely among all of the dialog's elements, (b) every exit action is D-pad operable — completing the dialog via any of its actions *is* the keyboard exit, and (c) a Back press is **never silent**: it produces a status announcement plus a visible equivalent conveying that a selection is required. Use sparingly, only where a choice is genuinely mandatory, and only when the choice is reversible afterward. | 2.1.2 (A), 4.1.3 (AA), 2.1.1 (A) |
| D3 | Receiving focus never triggers navigation, playback, submission, or any context change. Focus previews (peek/expand on focus) must not move focus or open new contexts. | 3.2.1 (A) |
| D4 | On screen entry, initial focus lands on a predictable, meaningful element and its announcement (screen title + focused element name/role/state) plays. On return from a deeper screen, focus is restored to the element that opened it. **Before defaulting to the primary control, apply the D7 decision test.** | 2.4.3 (A) |
| D5 | Repeated navigation components keep the same relative order and position across screens. | 3.2.3 (AA) |
| D6 | When focus moves into a new container, its group context (container purpose, item position such as "x of y") is available from accessibility properties — provided via container semantics, not concatenated into item names. | 1.3.1 (A), 4.1.2 (A) |
| D7 | **Content-first screens (including dialogs):** when a screen presents content that must be understood before acting — consent, legal terms, or explanation that informs the choice the screen exists to offer — initial focus lands on a static element at the top (typically the primary heading or dialog title), so traversal reads the content *forward* and reaches the actions *last*. Never start focus on an action whose activation commits the user to content they haven't yet encountered. **Decision test, applied to every screen at design time:** (1) *"If the user activates the initially focused control without reading anything else, could they misunderstand what they just agreed to or changed?"* Yes → content-first. (2) *If the screen appeared without the user asking for it* (error, unavailability, forced interstitial): *"Does the announced screen title alone convey why it appeared — and was the triggering event announced via the status mechanism when it occurred (4.1.3)?"* Either answer no → content-first. Otherwise → default D4 (focus the primary control). Apply the same answer on every visit — don't vary focus by visit count. (Adapted from the W3C ARIA Authoring Practices dialog pattern — non-normative guidance; the normative basis is a focus order that preserves meaning.) | 2.4.3 (A), 1.3.2 (A), 4.1.3 (AA) |

### E. Images & non-text content

| # | Rule | SC |
| --- | --- | --- |
| E1 | Every meaningful image (artwork used as the only representation of an item, badges, rating icons, channel logos) has a text alternative equivalent to its purpose, sourced from metadata at runtime. | 1.1.1 (A) |
| E2 | An image inside a focusable item does not get its own alternative if the item's accessible name already conveys it — avoid double-speak; mark the image decorative in that case. | 1.1.1 (A), 1.3.2 (A) |
| E3 | Icon-only controls take their accessible name from the icon's purpose (defined once in the design system), not its appearance. | 1.1.1 (A), 4.1.2 (A) |
| E4 | Information rendered only as an image or glyph (quality badge, live indicator, progress bar fill) has a programmatic text/value equivalent. | 1.1.1 (A), 1.4.1 (A) |

### F. Links & actions

| # | Rule | SC |
| --- | --- | --- |
| F1 | The purpose of every navigational element is determinable from its accessible name together with its programmatic context (enclosing group/row/heading). Avoid names that are ambiguous outside their visual context. | 2.4.4 (A) |
| F2 | Actions that leave the current context (open details, start playback, external destination) are activated only on explicit selection (OK/Select), never on focus or passive input. | 3.2.1 (A), 3.2.2 (A) |
| F3 | Where an element both selects and navigates, expose the primary action as the role's default action; secondary actions use the platform's custom-actions mechanism so the screen reader lists them. | 4.1.2 (A), 2.1.1 (A) |

### G. No visual-only or sensory-only cues

| # | Rule | SC |
| --- | --- | --- |
| G1 | Never instruct by position, shape, color, or sound alone ("the item on the right", "the highlighted one"). Reference elements by their label/role, which the screen reader can speak. | 1.3.3 (A) |
| G2 | Any meaning carried by color (selected, live, error, unavailable) is also carried by a programmatic state or text. | 1.4.1 (A), 4.1.2 (A) |
| G3 | Earcons/sound effects that carry meaning have a spoken or programmatic equivalent. | 1.3.3 (A) |

### H. Forms & input (search, sign-in, settings, profiles)

| # | Rule | SC |
| --- | --- | --- |
| H1 | Every input has a programmatically associated label describing its purpose; required state and expected format are part of the field's accessibility properties or associated instruction text. | 3.3.2 (A), 1.3.1 (A), 4.1.2 (A) |
| H2 | On validation failure: the field in error is identified programmatically (error state on the field) and the error is described in text; the description is announced without moving focus (or focus is moved to the first error as a deliberate, announced context change — pick one pattern app-wide). | 3.3.1 (A), 4.1.3 (AA) |
| H3 | Error text states how to fix the problem when a fix is known. | 3.3.3 (AA) |
| H4 | Changing a control's value never auto-submits or auto-navigates unless the behavior is described to the user beforehand. | 3.2.2 (A) |
| H5 | Data already provided in a flow is pre-filled or selectable — never re-typed on a TV keyboard. | 3.3.7 (A) |
| H6 | Authentication offers at least one path with no transcription/memorization puzzle (e.g., code-on-second-device activation); any code shown on the TV to be entered elsewhere is exposed as text to the screen reader. | 3.3.8 (AA), 1.1.1 (A) |
| H7 | On-screen keyboard: each key is a native control with name/role; the target field's current contents and cursor context are exposed; committed input is confirmed via the field's value, not a hard-coded phrase. Secure fields expose masked values per platform convention. | 4.1.2 (A), 2.1.1 (A) |
| H8 | Inputs that collect common personal data (email, name, phone, etc.) expose their purpose programmatically using the platform's input-purpose mechanism (`autocomplete` on HTML platforms; content types / autofill hints on native stacks) where supported. | 1.3.5 (AA) |

---

## 3. Component patterns (Connected TV)

For every pattern: **name is derived from the visible label/metadata at runtime; role and state come from accessibility properties.** Wire the change notification listed; never narrate it manually if the platform announces it from the property change.

| Component | Role | Name source | States/values to expose | Change announcement to wire | SC |
| --- | --- | --- | --- | --- | --- |
| **Button** | Native button | Visible label; icon-purpose if icon-only | disabled | None beyond focus announcement; if activation triggers a status change elsewhere, announce that via live region | 4.1.2 (A) |
| **Toggle / switch** | Native switch/toggle (or button + checked state) | Visible setting label | on/off (checked), disabled | State property change on activation → platform speaks new state | 4.1.2 (A), 4.1.3 (AA) |
| **Selectable item** (profile, quality option, filter) | Native selectable/radio-style role within a group | Item label from data | selected/not selected, position in set | Selection-state property change; if selection updates other content, announce that separately | 4.1.2 (A), 4.1.3 (AA) |
| **Tabs / category rows** | Native tab role in a tab group (or labeled group) | Tab label | selected, position in set | Selected-tab state change; new panel content availability announced or exposed as the next reading target | 4.1.2 (A), 1.3.1 (A), 4.1.3 (AA) |
| **List / grid (browse rows, tiles)** | Native collection role with items | Item name from content metadata; row/group name from its heading | position (x of y), item states (watched/progress, locked) as properties or value text | If the collection reloads or paginates under focus, announce update; lazy-loaded items must be fully named before focusable | 1.3.1 (A), 4.1.2 (A), 4.1.3 (AA), 1.1.1 (A) |
| **Dialog / modal** | Native dialog/alert role | Dialog title | modality (focus contained), initial-focus element | On open: title announced, focus moves into dialog (a legitimate context change on request). **Content-first dialogs (a subset of D7's content-first screens — consent, legal, destructive confirmation): initial focus goes to the dialog title, not an action — see D7.** On close: focus returns to invoker. Back exits — or, in a required-choice dialog (D2 exception), Back is answered with an announced + visible "selection required" response, never silence | 4.1.2 (A), 2.1.2 (A), 2.4.3 (A), 3.2.1 (A), 4.1.3 (AA) |
| **Loading / progress** | Native progress role (or status region) | Purpose label of the operation | busy state; value if determinate | Start announced once; completion (or failure) announced via live region without focus move; coalesce intermediate updates | 4.1.3 (AA), 4.1.2 (A) |
| **Media controls (transport)** | Native buttons/sliders in a labeled group | Control purpose labels; scrubber exposes current position/duration as value | play/pause state on the primary control, slider value, live vs on-demand state | State/value property changes on the controls; auto-hiding of the control bar must not trap or silently drop focus | 4.1.2 (A), 2.1.2 (A), 1.4.2 (A) |
| **Toast / inline error / banner** | Status or alert region (non-focusable unless actionable) | Message text itself | severity if the platform supports it | Announced via live region/announcement API without moving focus; if actionable, the action is reachable by D-pad and announced as such | 4.1.3 (AA), 3.3.1 (A), 2.1.1 (A) |

---

## 4. Per-platform notes

| Screen reader | Platform | Native accessibility API to target |
| --- | --- | --- |
| **VoiceOver** | Apple tvOS | UIKit/SwiftUI accessibility: `accessibilityLabel` (from visible text by default), `accessibilityTraits` (role/state), `accessibilityValue`, `UIAccessibility.post(notification:)` (`.announcement`, `.layoutChanged`, `.screenChanged`) for status messages, `accessibilityViewIsModal` for dialogs. **D7 content-first screens:** post `.screenChanged` with the top static element (heading/title) as the argument to place VoiceOver focus there. |
| **TalkBack** | Android TV / Google TV | Android accessibility framework: `contentDescription` only when no visible text, roles/state via `AccessibilityNodeInfo` (or Compose semantics: `role`, `stateDescription`, `selected`, `toggleableState`), live regions (`accessibilityLiveRegion`) and `AccessibilityEvent` for status messages, `paneTitle` for screen titles. **D7 content-first screens:** set initial accessibility focus to the pane title / first text block. |
| **VoiceView** | Amazon Fire TV | Android accessibility framework (Fire OS is Android-based): same APIs as TalkBack above, **including the same D7 wiring — set initial accessibility focus to the title/first text block.** Verify behavior separately — VoiceView's phrasing and event handling differ from TalkBack, and its handling of programmatic initial-focus requests must be confirmed on hardware. |
| **Roku Screen Reader** (Audio Guide) | Roku | SceneGraph: built-in components are voiced automatically; custom components rely on limited accessibility hooks. **D7 content-first screens:** the standard SceneGraph `Dialog` reads title → message → buttons in order, satisfying content-first natively for dialogs; for non-dialog content-first screens, confirm focus/voicing can start at the top static content before committing to the design. ⚠️ **Roku support is the most limited of these platforms — confirm its current capabilities (custom-component labeling, state exposure, programmatic announcements) against current Roku developer documentation before committing patterns.** |
| *Voice Guide / Audio Guidance / TTS on web-based TVs* | Samsung Tizen, LG webOS, Vizio SmartCast, Comcast X1 (HTML app platforms) | WAI-ARIA + HTML semantics: native elements first, `aria-label`/`aria-labelledby`, `role`, `aria-checked`/`aria-selected`/`aria-expanded`, `aria-live`/`role="status"`/`role="alert"` for status messages, `lang`, document `<title>`. Verify each vendor's reader honors live regions — support varies. **D7 content-first screens:** send focus to the top heading (`tabindex="-1"`) on entry (inside `role="dialog"`/`aria-modal="true"` when the screen is a dialog). |

**Every rule in this guide must be verified on the real screen reader, on real hardware, per platform.** Emulator/simulator TTS behavior is not evidence of conformance.

---

## 5. Per-screen checklist

Copy per screen. Every unchecked box is a blocker for AA sign-off.

- [ ] Screen exposes a programmatic title, announced on entry — 2.4.2 (A)
- [ ] Screen's language is set on the accessibility root — 3.1.1 (A)
- [ ] Reading order of the accessibility tree matches logical order — 1.3.2 (A)
- [ ] Headings/groups/lists exposed as such, not just styled — 1.3.1 (A)
- [ ] Every focusable element has a name derived from its visible label/metadata — 4.1.2 (A), 2.5.3 (A)
- [ ] Every focusable element exposes a correct role (native control preferred) — 4.1.2 (A)
- [ ] Every stateful element exposes current state/value, and updates it on change — 4.1.2 (A)
- [ ] No role/state words concatenated into any accessible name — 4.1.2 (A)
- [ ] All meaningful images/icons have runtime text alternatives; decorative ones hidden; no double-speak — 1.1.1 (A)
- [ ] All functionality reachable and operable by D-pad alone; no focus traps — Back always works, or in a required-choice dialog Back is answered with an announced + visible response, never silence (D2 exception) — 2.1.1 (A), 2.1.2 (A), 4.1.3 (AA)
- [ ] Focus order preserves meaning; initial focus predictable; focus restored on return — 2.4.3 (A)
- [ ] **D7 decision test applied and recorded:** (1) *"could the user misunderstand what they just agreed to or changed?"* (2) *if the screen interrupted the user:* *"does the announced title alone convey why, and was the trigger announced when it occurred?"* Content-first (initial focus on a static top element; actions last) if (1) is yes or (2) has any no — D7 · 2.4.3 (A), 1.3.2 (A), 4.1.3 (AA)
- [ ] Nothing navigates/submits/changes context on focus alone — 3.2.1 (A)
- [ ] No control value change causes an unannounced context change — 3.2.2 (A)
- [ ] Repeated navigation in consistent order; repeated components consistently named — 3.2.3 (AA), 3.2.4 (AA)
- [ ] Every status change (load complete, success, failure, count/content update) announced without moving focus — 4.1.3 (AA)
- [ ] No information conveyed by color/position/shape/sound only — 1.3.3 (A), 1.4.1 (A)
- [ ] Navigational elements' purpose clear from name + programmatic context — 2.4.4 (A)
- [ ] Auto-playing audio can be paused/stopped/muted — 1.4.2 (A)
- [ ] *(If inputs)* Fields labeled with formats/instructions exposed — 3.3.2 (A)
- [ ] *(If inputs)* Errors identified on the field, described in text, announced, with fix suggested where known — 3.3.1 (A), 3.3.3 (AA), 4.1.3 (AA)
- [ ] *(If inputs)* Input purpose programmatically identified where the platform supports it — 1.3.5 (AA)
- [ ] *(If flow)* Previously entered data not re-typed — 3.3.7 (A)
- [ ] *(If auth)* A no-cognitive-test sign-in path exists; on-screen codes exposed as text — 3.3.8 (AA), 1.1.1 (A)

---

## 6. Acceptance-test template (fill in per screen)

Run the full set once per platform screen reader (VoiceOver, TalkBack, VoiceView, Roku Screen Reader, and each vendor TTS in scope), on hardware.

```none
Feature: <Screen name> — screen-reader conformance (WCAG 2.2 AA)

# 1. Focus announcement — 4.1.2 (A), 2.4.2 (A), 2.4.3 (A)
Scenario: Entering the screen
  Given the platform screen reader is enabled
  When I navigate to <screen>
  Then the screen title is announced
  And focus lands on <expected initial element by role/purpose>
    # For content-first screens (D7): the expected initial element is a static
    # top element (typically the primary heading or dialog title), and the
    # actions are last in traversal. Record both D7 decision-test answers here:
    # (1) misunderstanding risk; (2) for interruptions, whether the title
    # conveys why and the trigger was announced when it occurred.
  And its announcement includes its visible-label-derived name, its role, and its current state
  And no spoken text duplicates role or state words inside the name

# 2. State change — 4.1.2 (A)
Scenario: Changing a stateful control
  Given focus is on <stateful element by role/purpose>
  When I activate it with the Select button
  Then the new state is announced from the updated accessibility property
  And focus does not move
  And re-focusing the element announces the new state

# 3. Dynamic content / status message — 4.1.3 (AA)
Scenario: A status change occurs without user focus on it
  Given <the triggering condition, e.g., content finishes loading / an action succeeds or fails>
  When the change occurs
  Then it is announced without focus moving
  And the announcement does not interrupt or trap D-pad navigation

# 4. Reading order — 1.3.2 (A), 2.4.3 (A)
Scenario: Traversing the screen
  When I move focus through every focusable element with the D-pad
  Then the traversal order matches the logical order of the screen
  And every element is reachable and announces name, role, and state
  And I can exit every component and the screen with the Back button
    # Required-choice dialogs (D2 exception): instead of exiting, Back produces
    # an announced + visible "selection required" response — never silence —
    # and completing the dialog via any of its actions is the exit.

# 5. Repeat on each platform
Scenario Outline: Platform parity
  Given the screen reader is <screen reader> on <platform hardware>
  Then scenarios 1–4 pass with platform-native phrasing
  Examples:
    | screen reader      | platform hardware      |
    | VoiceOver          | Apple TV               |
    | TalkBack           | Android TV / Google TV |
    | VoiceView          | Fire TV                |
    | Roku Screen Reader | Roku                   |
    | <vendor TTS>       | <web-based TV>         |
```

**Pass condition:** every scenario passes on every in-scope platform with the platform's native phrasing — spoken wording will differ per platform; name/role/state/announcement *presence and correctness* is what's asserted.

---

## Changelog

**v2.4 (2026-07-17)** — **D7 decision test extended for interruption screens.** The test now has two questions: (1) the original misunderstanding-risk question; (2) for screens that appear without the user asking (errors, unavailability, forced interstitials): does the announced title alone convey why, and was the triggering event announced via the status mechanism when it occurred? Either "no" → content-first. Checklist and test template updated to record both answers. Prompted by the Privacy Settings Unavailable screen, where the original test's letter permitted control-first focus on an information-only screen. **v2.3 (2026-07-16)** — D7 generalized from dialogs to content-first screens, with a per-screen decision test. Prompted by the Privacy Settings screen review. **v2.2 (2026-07-16)** — Added the required-choice dialog exception to D2. Prompted by the VPPA consent prompt decision to disable Back. **v2.1 (2026-07-16)** — Made D7 wiring explicit for every platform in §4. **v2 (2026-07-16)** — Added D7 (content-first dialogs), SC 1.3.5 (§1, H8, checklist), WCAG2ICT scope note. Prompted by the VPPA consent prompt review — see subpages.
