# Demo localization

English is the source language. `ru.json` contains Russian UI messages; `node build.cjs` publishes the catalog as `dist/locale-ru.js` and includes the locale controls on every generated route.

- The header's EN / RU control saves `ecocharge-locale` in localStorage. `?lang=ru` or `?lang=en` explicitly selects a language when sharing a link. The default for a fresh browser is English.
- `dist/locale.js` localizes text nodes and accessible labels. It retains their original English text, observes changed UI fragments and switches without rerendering forms or changing financial records, input values, station IDs or navigation state.
- Use complete messages. Numbered placeholders such as `{0}` retain dynamic values; `validate.cjs` checks that every parameter survives translation. Do not use broad patterns for arbitrary user-generated text.
- Mark user-generated content with `translate="no"`. Message bodies and unsent text are excluded. Suggested questions and reply snippets are translated at insertion; sent messages keep the language in which they were written.
- Dates and amounts use Russian presentation conventions with USD unchanged. Source station names, addresses, operator brands and photo attribution stay in the original language. Analytics event IDs and JSON keys stay stable.
- `dist/locale-documents.js` translates the print preview and generates Russian sample PDFs using the existing local Manrope font with Cyrillic glyphs. These remain clearly labelled demonstration documents.

After changing a visible English message, update its Russian entry and test both languages. Run `node build.cjs` and `node validate.cjs`. Browser verification should cover language changes with a populated form, cross-tab state, client/manager workflows, narrow mobile screens and document downloads.
