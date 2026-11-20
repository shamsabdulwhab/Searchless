# Searchless Library — Branching Discovery

An early single-page prototype. Visitors start with one row of three cards. Clicking a card reveals exactly one new row of three related offerings underneath. Earlier rows stay visible. Nothing advances on its own.

Hover only highlights a card. It does not reveal extra text. **See More** opens a detail view and does not add a row. **Back** removes the latest row. Choosing a different card in an earlier row replaces the rows below it.

## Run

```bash
npm install
npm run dev
```

Open the address Vite prints, usually http://localhost:5173.

## Try this

1. Click **CoderDojo**. A row appears with DigiCafé beside two sample neighbors.
2. Click **See More** on DigiCafé. The rows do not change.
3. Close the detail, then click **Back**.
4. Click **Storytelling sessions**, then **Saturday at the library**. The next row shows real Saturday times for DigiCafé, MakersClub, and CoderDojo.

Cards marked **Sample** were written for this demo. They are not confirmed current listings. MakersClub, the MakersPlaats machines, CoderDojo, and DigiCafé follow public descriptions from Bibliotheek Eindhoven. Some cards are facets of those offerings (a project or a tool), not separate events. The detail view says so.

Illustrations are drawn for this prototype in the library palette. They are not publisher covers.
