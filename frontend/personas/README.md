# Persona exports

Drop one JSON file per department persona here. The playbook loads every `*.json` file in this folder at build time.

## Naming

Use a short slug for the filename:

- `marketing.json`
- `it.json`
- `hr.json`

The slug is used in Editor mode and for matching accounts. The persona `id` inside the JSON is preserved as the canonical ID.

## Expected shape

Each file should match the persona export format:

```json
{
  "persona": { "id": "...", "name": "Marketing", ... },
  "guidanceMap": { "capabilities": { ... } },
  "allCapabilities": [ ... ]
}
```

## After adding a file

1. Save the JSON here
2. Restart the dev server (`npm run dev`) so Vite picks up the new file
3. Open **Editor → Personas** to see uploaded files and versions (not visible to CSMs)

## Current files

| File | Persona |
|------|---------|
| `marketing.json` | Marketing |
