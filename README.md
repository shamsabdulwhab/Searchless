# Searchless Library

An early prototype for Bibliotheek Eindhoven with two ways to explore the collection.

## Pages

- `/` is the free-scrolling map. Drag to move, scroll to travel, and hold Ctrl while scrolling to zoom. The pictures sit in clusters named Technology, Planting, Languages, History, and Community.
- `/branching` is Branching Discovery. The page opens with three cards. Clicking a card adds one new row of three underneath. Earlier rows stay on the page. The trail runs for 25 levels. **See More** opens details and does not add a row. **Back** removes the latest row. Choosing a different card in an earlier row replaces the rows below it.

Each page links to the other.

## Content types on the map

Pictures on the scrolling map are mostly books, with some workshops and events mixed through every cluster:

- Books, about 80 percent, use a muted blue border (`#507DB0`)
- Workshops, about 10 percent, use a soft coral border (`#D97775`)
- Events and activities, about 10 percent, use an orange border (`#F28C28`)

A legend stays fixed at the bottom right. Hovering a picture shows its title and type.

Branching Discovery uses the History pictures. Each card is still labeled Book, Workshop, or Event, in about a 60 / 30 / 20 mix.

Cards marked **Sample** were written for this demo. They are not confirmed current listings. MakersClub, the MakersPlaats machines, CoderDojo, and DigiCafé follow public descriptions from Bibliotheek Eindhoven.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 for the scrolling map, or http://localhost:5173/branching for Branching Discovery.

## Deploy

The site is set up for Netlify. The build command is `npm run build` and the published folder is `dist`. The repository is https://github.com/shamsabdulwhab/Searchless.
