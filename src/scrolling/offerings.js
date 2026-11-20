const photos = {
  makers: "/images/makers-3d.jpg",
  assemble: "/images/assemble-3d.jpg",
  printer: "/images/printer.jpg",
  printrbot: "/images/printrbot.jpg",
  fablab: "/images/fablab.jpg",
  laser: "/images/laser-cutter.jpg",
  solder: "/images/soldering.jpg",
  breadboard: "/images/breadboard.jpg",
  gadgets: "/images/gadgets.jpg",
  electronics: "/images/electronics-kids.jpg",
  stem: "/images/stem-workshop.jpg",
  code: "/images/tablet-coding.jpg",
  screen: "/images/code-screen.jpg",
  hello: "/images/hello-world.jpg",
  ereader: "/images/ereader.jpg",
  books: "/images/picture-books.jpg",
  page: "/images/picture-page.jpg",
  story: "/images/storytime.jpg",
  corner: "/images/story-corner.jpg",
  library: "/images/childrens-library.jpg",
};

const raw = [
  { id: "makersclub", title: "MakersClub", type: "Workshop", image: photos.makers, w: 340, h: 440, teaser: "Weekly making for ages 7–13, with 3D prints, tools, and circuits.", detail: "MakersClub meets in the MakersPlaats at Bibliotheek Eindhoven on Fridays from 15:30 to 17:00 and Saturdays from 10:30 to 12:00. A city listing shows a €5 contribution. Confirm the current amount at the desk.", verified: true },
  { id: "coderdojo", title: "CoderDojo", type: "Workshop", image: photos.code, w: 300, h: 380, teaser: "Program something together on Saturday mornings.", detail: "CoderDojo Eindhoven is listed at Bibliotheek Eindhoven on Saturdays from 10:15 to 12:00. The agenda publishes individual dates, so check the current schedule.", verified: true },
  { id: "digicafe", title: "DigiCafé", type: "Service", image: photos.library, w: 280, h: 360, teaser: "Free help with e-books, apps, and DigiD. No need to book.", detail: "DigiCafé runs in Eindhoven every Tuesday and Saturday from 11:00 to 12:00 at De Witte Dame, and on Tuesdays from 14:00 to 15:00 in Waalre. The photograph shows a library computer corner, not an official café photo.", verified: true },
  { id: "storytelling", title: "Storytelling sessions", type: "Activity", image: photos.story, w: 320, h: 240, sample: true, teaser: "A shared story, read aloud in the library.", detail: "Sample content. This stands in for a read-aloud hour. It is not a confirmed Bibliotheek Eindhoven listing. The photograph is a storytime at another public library." },
  { id: "ebooks", title: "E-books and e-readers", type: "Service", image: photos.ereader, w: 240, h: 320, teaser: "Borrow a book that fits in a bag.", detail: "E-books and e-readers are questions DigiCafé invites people to bring. This is that part of the café, not a separate class.", verified: true },
  { id: "laser", title: "Laser cutter", type: "Tool", image: photos.laser, w: 360, h: 250, teaser: "A cutter for wood, card, and acrylic, used with staff.", detail: "The MakersPlaats lists a laser cutter for materials up to 6 mm and a bed of 600 × 300 mm. The photograph is a library laser cutter, not a confirmed picture of the Eindhoven machine.", verified: true },
  { id: "printer", title: "3D printer", type: "Tool", image: photos.printer, w: 250, h: 330, teaser: "A printer sitting in a small making room.", detail: "Bibliotheek Eindhoven lists an Ender 6 in the MakersPlaats. This photograph shows a different printer in a makerspace, so you can see the kind of machine, not their exact model.", verified: true },
  { id: "picture-books", title: "Picture books", type: "Book", image: photos.books, w: 300, h: 220, sample: true, teaser: "Low shelves of illustrated books to take home.", detail: "Sample grouping. The children’s collection is real. This is not a featured list of titles." },
  { id: "hello-world", title: "Hello World Toolkit", type: "Book", image: photos.hello, w: 220, h: 300, sample: true, teaser: "A free coding book for children, with a cat on the cover.", detail: "Sample shelf card. The cover is the Hello World Toolkit from Open Commons Linz, licensed for reuse. It is not a confirmed item on the Eindhoven shelf." },
  { id: "picture-page", title: "A picture-led story", type: "Book", image: photos.page, w: 230, h: 310, sample: true, teaser: "An illustrated page you can tell without reading every word.", detail: "Sample content. The image is a public-domain picture-book illustration from 1908, not a current loan." },
  { id: "soldering", title: "Soldering irons", type: "Skill", image: photos.solder, w: 280, h: 200, teaser: "A supervised bench for a first solder joint.", detail: "MakersClub names soldering as a skill children can try, and the MakersPlaats lists soldering irons. This is part of the club, not its own course.", verified: true },
  { id: "circuit", title: "A simple circuit", type: "Skill", image: photos.breadboard, w: 260, h: 200, teaser: "Close a loop and light something small.", detail: "Making a circuit is one of the techniques Bibliotheek Eindhoven lists for MakersClub. Shown here as part of that club.", verified: true },
  { id: "keyring", title: "3D-printed keyring", type: "Project", image: photos.assemble, w: 270, h: 340, teaser: "Draw a small keyring and print it.", detail: "The library describes a 3D-printed keyring as an example of what happens at MakersClub. It is an example project, not a separate ticket.", verified: true },
  { id: "makersplaats", title: "MakersPlaats", type: "Space", image: photos.fablab, w: 340, h: 230, teaser: "The workshop room: printer, laser, and hand tools.", detail: "The MakersPlaats is the equipped room where MakersClub happens. The photograph is from another fablab, used to suggest the kind of space.", verified: true },
  { id: "draw-3d", title: "Draw it in 3D", type: "Skill", image: photos.printrbot, w: 300, h: 210, teaser: "A screen for shaping an idea before it is printed.", detail: "Drawing in a 3D program is listed among MakersClub skills. The photograph shows a printer beside its software.", verified: true },
  { id: "saturday", title: "Saturday in the building", type: "Guide", image: photos.corner, w: 320, h: 220, sample: true, teaser: "A morning when several real offerings overlap.", detail: "Sample guide, not an event. On Saturdays, CoderDojo is listed at 10:15, MakersClub at 10:30, and DigiCafé at 11:00." },
  { id: "code-screen", title: "Lines of a program", type: "Book", image: photos.screen, w: 260, h: 180, sample: true, teaser: "Code large enough to read across a table.", detail: "Sample content. A photograph of programming on a screen, not a library class." },
  { id: "build-together", title: "Build with someone", type: "Workshop", image: photos.stem, w: 310, h: 230, sample: true, teaser: "Two people, one small machine, a guide nearby.", detail: "Sample workshop. It suggests the social side of making. It is not a named Eindhoven session." },
  { id: "electronics", title: "Electronics table", type: "Workshop", image: photos.electronics, w: 300, h: 210, sample: true, teaser: "Components spread out, with a grown-up at the table.", detail: "Sample content for a hands-on electronics hour. Not a confirmed listing." },
  { id: "small-builds", title: "Small powered builds", type: "Project", image: photos.gadgets, w: 240, h: 240, sample: true, teaser: "Little machines people have already made.", detail: "Sample project card. MakersClub mentions a small powered car as an example. These objects are from another makerspace." },
  { id: "language", title: "Language practice", type: "Activity", image: photos.story, w: 260, h: 190, sample: true, teaser: "Talk through a story in whatever language you have.", detail: "Sample content. A stand-in for language learning in the library. Not confirmed as a current Eindhoven session." },
  { id: "exhibition", title: "Paper and print", type: "Exhibition", image: photos.page, w: 280, h: 360, sample: true, teaser: "Pages and prints hung so you can walk among them.", detail: "Sample exhibition. Not a current show at Bibliotheek Eindhoven." },
  { id: "community", title: "Community evening", type: "Event", image: photos.library, w: 300, h: 200, sample: true, teaser: "The room stays open for people who already know each other, and people who do not.", detail: "Sample event. Not a published library programme." },
  { id: "art-workshop", title: "Art from the workshop", type: "Workshop", image: photos.fablab, w: 250, h: 190, sample: true, teaser: "Color, cut paper, and a machine in the same afternoon.", detail: "Sample art workshop beside the making room. Not a confirmed listing." },
  { id: "first-code", title: "A first coding hour", type: "Workshop", image: photos.code, w: 240, h: 300, sample: true, teaser: "Blocks on a screen, and a game that almost works.", detail: "Sample hour in the spirit of CoderDojo. Not a titled session on the agenda." },
  { id: "take-reader", title: "Start an e-reader", type: "Service", image: photos.ereader, w: 200, h: 260, teaser: "Sit down until the library book is on the device.", detail: "Part of what DigiCafé offers: help with an e-reader. Not a separate appointment system.", verified: true },
  { id: "membership", title: "A library card", type: "Service", image: photos.corner, w: 240, h: 180, sample: true, teaser: "The small card that lets the books leave the building.", detail: "Sample prompt. Membership is a real library service. Terms and price are not shown here." },
  { id: "game-hour", title: "Show a small game", type: "Event", image: photos.stem, w: 270, h: 200, sample: true, teaser: "Play what you just made for the person beside you.", detail: "Sample event. A social ending to a coding visit, not a listing." },
  { id: "sketch", title: "Sketch before you make", type: "Activity", image: photos.printrbot, w: 280, h: 190, sample: true, teaser: "Paper first, then the screen.", detail: "Sample step. MakersClub does teach a simple technical sketch. This card is not its own event." },
  { id: "read-aloud", title: "Read-aloud corner", type: "Activity", image: photos.story, w: 250, h: 210, sample: true, teaser: "Cushions, a picture book, and someone who will read it.", detail: "Sample corner. Not a confirmed storytime slot." },
  { id: "quiet-room", title: "A quiet room", type: "Space", image: photos.corner, w: 300, h: 190, sample: true, teaser: "Somewhere to sit when the workshop is loud.", detail: "Sample space. A reminder that the building also holds silence." },
  { id: "family-make", title: "Make with a grown-up", type: "Workshop", image: photos.makers, w: 260, h: 320, sample: true, teaser: "One idea, two pairs of hands, a printer nearby.", detail: "Sample family workshop. MakersClub itself is for ages 7–13 with staff and volunteers." },
];

function overlaps(a, b, gap) {
  return !(
    a.x + a.w + gap <= b.x ||
    b.x + b.w + gap <= a.x ||
    a.y + a.h + gap <= b.y ||
    b.y + b.h + gap <= a.y
  );
}

export function fillVerticalGaps(upper, lower, blocked, sources) {
  const w = 300;
  const h = 220;
  const upperBox = upper.reduce(
    (box, card) => ({
      left: Math.min(box.left, card.x),
      right: Math.max(box.right, card.x + card.w),
    }),
    { left: Infinity, right: -Infinity }
  );
  const beneath = lower.filter((card) => card.x + card.w > upperBox.left && card.x < upperBox.right);
  const bandTop = Math.min(...beneath.map((card) => card.y)) - 980;
  const bandBottom = Math.min(...beneath.map((card) => card.y)) + 40;
  const placed = [];
  const rows = [];
  for (let y = bandTop; y + h <= bandBottom; y += h + 24) rows.push(y);
  let index = 0;
  for (const y of rows.reverse()) {
    if (index >= sources.length) break;
    for (let x = upperBox.left; x + w <= upperBox.right && index < sources.length; x += w + 24) {
      const rect = { x: Math.round(x), y: Math.round(y), w, h };
      const crowded = [...blocked, ...placed].some((card) => overlaps(card, rect, 8));
      if (crowded) continue;
      placed.push({ ...sources[index], ...rect });
      index += 1;
    }
  }
  return placed;
}

export function place(items, avoid) {
  const placed = [];
  items.forEach((item, index) => {
    const seed = index * 2.399963;
    let found = null;
    for (let attempt = 0; attempt < 400 && !found; attempt += 1) {
      const ring = 20 + attempt * 26;
      const angle = seed + attempt * 0.62;
      const rect = {
        x: Math.round(Math.cos(angle) * ring),
        y: Math.round(Math.sin(angle) * ring * 0.78),
        w: item.w,
        h: item.h,
      };
      if (avoid && overlaps(rect, avoid, 28)) continue;
      if (!placed.some((card) => overlaps(card, rect, 36))) found = rect;
    }
    placed.push({ ...item, ...(found || { x: index * 30, y: 2200, w: item.w, h: item.h }) });
  });
  return placed;
}

const technologyHole = { x: -210, y: -80, w: 420, h: 160 };

export const offerings = place(raw, technologyHole);

export { technologyHole };

export function openingFocus(cards) {
  const sample = cards.slice(0, 7);
  const cx = sample.reduce((sum, card) => sum + card.x + card.w / 2, 0) / sample.length;
  const cy = sample.reduce((sum, card) => sum + card.y + card.h / 2, 0) / sample.length;
  return { cx, cy };
}
