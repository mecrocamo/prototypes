# Design Prototypes — guide for AI agents

This repo is Mary Crocamo's **design prototype workbench**: a landing page that lists ongoing design prototypes (newest first) so they can be shared with coworkers by link.

- Live site: https://mecrocamo.github.io/prototypes/ (GitHub Pages, served from the root of `main`)
- PBS style link: https://mecrocamo.github.io/prototypes/?style=pbs
- Everything here is an unfinished work in progress.

## Repo layout

```
index.html                  Landing page (all HTML, CSS, JS in one file)
.nojekyll                   Tells GitHub Pages to serve files as-is
<prototype-name>/index.html One folder per prototype, served at /<prototype-name>/
```

Some prototypes live in other repos and are linked by full URL. For example, Moods in Media Manager lives in `mecrocamo/personalization`.

## Adding a prototype

1. Put the prototype in a new folder named in lowercase kebab-case, e.g. `ctv-nav-focus/index.html`. A single self-contained HTML file, with images embedded, is preferred.
2. Add one entry to the `PROTOTYPES` list near the bottom of `index.html`:

   ```js
   {
     date: "YYYY-MM-DD",          // used only for ordering (newest first); not shown
     title: "CTV Nav Focus States",
     kicker: "CTV",               // exactly one product category
     color: "periwinkle",         // the category's color, see below
     href: "ctv-nav-focus/",      // folder in this repo, or a full URL
     desc: "One or two sentences.",
     tags: ["Navigation", "Focus"] // any number of topic tags
   }
   ```

3. Preview it, then publish using the workflow below.

**Category colors.** Keep each product on the same color:

| Category | `color` |
|---|---|
| CTV | `periwinkle` |
| Consoles | `coral` |
| (next product) | `marigold` |
| (next product) | `blush` |

If a fifth product is needed, add a new color to both themes (see Styling) instead of reusing one.

## Rules

- **Never rename or delete a prototype folder after its link has been shared.** The folder name is part of the URL. To retire a prototype, remove its card and keep the folder.
- **To keep an old version visible,** add it as a subfolder, e.g. `hero-motion-comparison/v2/`, rather than overwriting the original.
- **This repo and site are public.** Don't add anything that shouldn't be on the open internet. That includes unreleased program content or air dates, internal or personal data, credentials, and third-party artwork or show key art PBS may not have rights to share. If in doubt, ask Mary first.
- **Don't commit font files or logos.** PBS Sans is licensed, so the page lists it in the font stack and relies on it being installed locally, with Helvetica Neue as the fallback.

## Styling

`index.html` has two themes, each with light and dark modes. Both are driven by CSS custom properties on `:root`:

- **Personal (default):** styled after marycrocamo.com. Inter, Crimson Pro for intro and description text, Fragment Mono for tags, and the Dela Gothic One wordmark. Warm stone in light mode, navy with cool lavender-tinted grays in dark mode. Accents use the chalk palette (periwinkle, coral, marigold, blush).
- **PBS (`<html data-brand="pbs">`):** follows the PBS brand guidelines. PBS Sans, Navy and PBS Blue on white and Cloud, Navy and Medium Blue surfaces in dark mode, and brand accents for the categories. Use only PBS palette colors, and avoid the brand's forbidden text and background pairs. For example, Teal, Coral and Yellow are never text on white.
- **Switches:** the footer link ("PBS-ify this page" / "Make it Mary") switches themes, and the header "◑ Theme" button switches light and dark mode. Both choices are saved in `localStorage`, and `?style=pbs` or `?style=personal` overrides the theme.
- **Every text color must meet WCAG AA contrast (at least 4.5:1)** in all four combinations: personal or PBS, light or dark. Check new colors before adding them.
- **Keep the layout working at phone width** (375px) with no horizontal scrolling.

## Previewing locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765/. Check both themes, light and dark mode, and phone width before publishing.

## Git workflow

Mary is learning git, so explain each step in plain language.

1. **Start from an up-to-date `main`:** `git switch main && git pull --ff-only`.
2. **Create a branch** for the change, with a short kebab-case name like `add-ctv-nav-prototype`.
3. **Work, preview and commit** with clear messages.
4. **Push the branch and open a pull request** against `main`. Describe what changed and how to review it.
5. **Further adjustments go on the same branch,** and the pull request updates automatically. Keep its description current.
6. **Mary merges the pull request on GitHub** unless asked to do it for them. Merging publishes to the live site in about a minute.
7. **After the merge,** switch to `main`, pull, delete the local branch, and confirm the live site updated.

**Commit identity** is set for this repo only: `Mary Crocamo <151085435+mecrocamo@users.noreply.github.com>`, which is Mary's private GitHub email. Don't change it, and don't commit with any other email.
