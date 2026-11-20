/**
 * Branching cards for the prototype.
 * sample: not a confirmed Bibliotheek Eindhoven listing.
 * facet: a real detail of a larger offering, not its own event.
 */
export const roots = [
  {
    id: "makersclub",
    title: "MakersClub",
    type: "Workshop",
    motif: "makers",
    teaser: "Weekly making for ages 7–13. Children follow their own ideas with 3D prints, tools, and circuits.",
    detail:
      "MakersClub meets in the MakersPlaats at Bibliotheek Eindhoven on Fridays from 15:30 to 17:00 and Saturdays from 10:30 to 12:00. A maker on staff leads the session with volunteers. Children try ideas such as a 3D-printed keyring, a small powered car, or a simple programmed game, and practice sketching, sawing, 3D drawing, circuits, and soldering. A city listing shows a €5 contribution — confirm the current amount at the library.",
    when: "Fridays 15:30–17:00 and Saturdays 10:30–12:00",
    where: "Bibliotheek Eindhoven, MakersPlaats",
    because: "A starting point for hands-on making.",
    children: [
      {
        id: "keyring",
        title: "3D-printed keyring",
        type: "Project",
        facet: true,
        motif: "print",
        teaser: "Draw a small keyring and print it. The library names this as something children try in the club.",
        detail:
          "Bibliotheek Eindhoven describes drawing and 3D-printing a keyring as an example of MakersClub, alongside a powered car and a simple game. It is an example of the club, not a separate ticketed workshop.",
        where: "MakersPlaats, during MakersClub",
        because: "It is one of the projects the club itself describes.",
        children: [
          {
            id: "draw-3d",
            title: "Draw it in 3D",
            type: "Skill",
            facet: true,
            motif: "sketch",
            teaser: "A first technical sketch, then a shape in a 3D drawing program.",
            detail:
              "MakersClub lists a simple technical sketch and drawing in a 3D program among the skills children can practice. This card is that step of the keyring project, not a class of its own.",
            because: "The keyring starts as a drawing before it becomes a print.",
          },
          {
            id: "ender-print",
            title: "Print it on the Ender",
            type: "Tool",
            facet: true,
            motif: "print",
            teaser: "The workshop’s 3D printer is an Ender 6, with a build volume of 250 × 250 × 400 mm.",
            detail:
              "The MakersPlaats lists an Ender 6 3D printer (250 × 250 × 400 mm) and a 3D scanner. Printing happens as part of the making space, not as a walk-up service this prototype can book.",
            because: "The drawing needs the printer that sits in the same room.",
          },
          {
            id: "keep-keyring",
            title: "Leave with a keyring",
            type: "Project",
            sample: true,
            motif: "makers",
            teaser: "A sample ending: the printed keyring goes home on a bag or a coat.",
            detail:
              "Sample content. The keyring project is described by the library; this card only imagines taking the result home. It is not a confirmed listing.",
            because: "A small object is an easy way to remember the visit.",
          },
        ],
      },
      {
        id: "machines",
        title: "MakersPlaats machines",
        type: "Space",
        facet: true,
        motif: "laser",
        teaser: "Laser cutter, 3D printer, scanner, vacuum former, and hand tools in the library workshop.",
        detail:
          "The MakersPlaats at Bibliotheek Eindhoven publishes this kit: a laser cutter for wood, MDF, acrylic, felt, cork, and cardboard up to 6 mm and 600 × 300 mm; an Ender 6 3D printer; a 3D scanner; a vacuum former; soldering irons; and basic woodworking tools. The machines support the club and other workshops. This card is the room’s equipment, not a self-service booking page.",
        where: "MakersPlaats, Bibliotheek Eindhoven",
        because: "MakersClub happens inside this equipped room.",
        children: [
          {
            id: "laser-cutter",
            title: "Laser cutter",
            type: "Tool",
            facet: true,
            motif: "laser",
            teaser: "Cuts wood, MDF, acrylic, felt, cork, and cardboard up to 6 mm thick.",
            detail:
              "The library lists the laser bed at a maximum of 600 × 300 mm and materials up to 6 mm. It lives in the MakersPlaats and is used with staff, not as an unsupervised machine.",
            because: "It is one of the machines named in the MakersPlaats.",
          },
          {
            id: "printer-3d",
            title: "3D printer and scanner",
            type: "Tool",
            facet: true,
            motif: "print",
            teaser: "An Ender 6 printer and a 3D scanner sit with the other making tools.",
            detail:
              "Both are listed on the MakersPlaats page. The printer’s build volume is given as 250 × 250 × 400 mm. Scanning and printing are part of supervised making.",
            because: "Printing and scanning are the digital half of the same workshop.",
          },
          {
            id: "wood-vacuum",
            title: "Wood tools and vacuum former",
            type: "Tool",
            facet: true,
            motif: "wood",
            teaser: "Hand woodworking tools, plus a vacuum former for shaping sheet material.",
            detail:
              "The MakersPlaats lists basic woodworking tools and a vacuum former next to the laser and printer. Sawing wood is also named as a skill practiced in MakersClub.",
            because: "Not every project in the room starts on a screen.",
          },
        ],
      },
      {
        id: "circuits",
        title: "Circuits and soldering",
        type: "Skill",
        facet: true,
        motif: "circuit",
        teaser: "Build a simple circuit and try a soldering iron, as the club already teaches.",
        detail:
          "MakersClub names “een stroomkring maken” and soldering among the skills on offer, and a small powered car among the example builds. This card groups that electrical side of the club. It is not a separate published course.",
        where: "During MakersClub",
        because: "Making in this club includes electricity, not only printing.",
        children: [
          {
            id: "simple-circuit",
            title: "A simple circuit",
            type: "Skill",
            facet: true,
            motif: "circuit",
            teaser: "Close a loop, light something small, and see why the connection matters.",
            detail:
              "Making a circuit is one of the basic techniques Bibliotheek Eindhoven lists for MakersClub. This card is that technique, practiced inside the session.",
            because: "Soldering makes more sense after a circuit already works.",
          },
          {
            id: "soldering",
            title: "Soldering irons",
            type: "Tool",
            facet: true,
            motif: "circuit",
            teaser: "The workshop has soldering irons, and the club treats soldering as a skill to try.",
            detail:
              "Soldering irons are on the MakersPlaats equipment list, and soldering is named as something children can learn in MakersClub, with staff and volunteers in the room.",
            because: "The irons are already in the same space as the circuits.",
          },
          {
            id: "powered-car",
            title: "A small powered car",
            type: "Project",
            facet: true,
            motif: "car",
            teaser: "An example from the library: build a little car that actually drives.",
            detail:
              "“Het maken van een autootje met aandrijving” is one of the examples Bibliotheek Eindhoven gives for MakersClub. It shows what a session can hold. It is not listed here as its own event.",
            because: "A moving car is a playful reason to care about circuits.",
          },
        ],
      },
    ],
  },
  {
    id: "coderdojo",
    title: "CoderDojo",
    type: "Workshop",
    motif: "code",
    teaser: "Program something together. Saturday sessions at the library, from 10:15 to 12:00.",
    detail:
      "CoderDojo Eindhoven is listed at Bibliotheek Eindhoven: come learn to program and build projects together. Published dates fall on Saturdays from 10:15 to 12:00. The agenda shows individual dates, so treat it as scheduled sessions rather than a promise of every Saturday. No fee is shown in the listing used here.",
    when: "Saturdays 10:15–12:00, on published dates",
    where: "Bibliotheek Eindhoven",
    because: "A starting point for learning to code with other people.",
    children: [
      {
        id: "digicafe",
        title: "DigiCafé",
        type: "Service",
        motif: "cafe",
        teaser: "Free help with e-books, apps, and DigiD. No need to sign up.",
        detail:
          "DigiCafé is drop-in help from library staff and volunteers. Bring questions about borrowing e-books, using an e-reader, installing apps, or applying for DigiD, and bring your own laptop, phone, tablet, or e-reader if you can. In Eindhoven it runs every Tuesday and Saturday morning from 11:00 to 12:00 at De Witte Dame. In Waalre it runs on Tuesdays from 14:00 to 15:00 at Het Huis van Waalre. Registration is not required.",
        when: "Eindhoven: Tue & Sat 11:00–12:00. Waalre: Tue 14:00–15:00",
        where: "De Witte Dame, and Het Huis van Waalre",
        because: "Coding club is one digital door. DigiCafé is the quieter one next to it: everyday questions, no project required.",
        children: [
          {
            id: "ebooks",
            title: "E-books and e-readers",
            type: "Service",
            facet: true,
            motif: "book",
            teaser: "How to borrow an e-book, and how an e-reader fits the library card.",
            detail:
              "E-books and e-readers are named topics at DigiCafé. Staff and volunteers sit with you and work through the question. This card is that part of the café, not a separate class.",
            because: "It is one of the questions DigiCafé invites people to bring.",
          },
          {
            id: "digid",
            title: "Help with DigiD",
            type: "Service",
            facet: true,
            motif: "id",
            teaser: "Sit down with someone while you apply for or sort out DigiD.",
            detail:
              "Help applying for DigiD is explicitly part of DigiCafé. Bring the device you will use. It is assistance during café hours, not a formal appointment system in this prototype.",
            because: "A lot of digital library questions are really account questions.",
          },
          {
            id: "phone-apps",
            title: "Apps on your phone",
            type: "Service",
            facet: true,
            motif: "apps",
            teaser: "Install a useful app on a phone or tablet, with someone beside you.",
            detail:
              "DigiCafé offers help installing apps on a smartphone or tablet. The point is to leave with it working, not with a certificate.",
            because: "The same volunteers who explain e-books also help with the phone in your pocket.",
          },
        ],
      },
      {
        id: "scratch",
        title: "Scratch starter",
        type: "Workshop",
        sample: true,
        motif: "sprite",
        teaser: "A sample first hour: a sprite, some motion, and a tiny game.",
        detail:
          "Sample content. CoderDojo sessions are real and the projects change. This Scratch hour is an illustration of a first visit, not a title from the library agenda.",
        because: "A first coding session needs a gentle shape, even when the real agenda rotates.",
        children: [
          {
            id: "sprite",
            title: "Move a sprite",
            type: "Activity",
            sample: true,
            motif: "sprite",
            teaser: "Pick a character and make it walk when you press a key.",
            detail:
              "Sample content. A typical Scratch beginning, written so the branch has somewhere to go. Not a confirmed CoderDojo plan.",
            because: "Motion is the quickest sign that the program is yours.",
          },
          {
            id: "loops",
            title: "Loops and a score",
            type: "Activity",
            sample: true,
            motif: "loop",
            teaser: "Repeat an action, then count how many times it worked.",
            detail:
              "Sample content. Loops and a score are a familiar second step in beginner game-making. They are not a published library session.",
            because: "Once a sprite moves, repetition makes it feel like a game.",
          },
          {
            id: "show-game",
            title: "Show your game",
            type: "Activity",
            sample: true,
            motif: "game",
            teaser: "Play it for the person sitting next to you before you leave.",
            detail:
              "Sample content. CoderDojo’s public line is that you code cool things together. Showing the result is the spirit of that line, not a listed finale.",
            because: "The club is social. A game that nobody else sees only does half the job.",
          },
        ],
      },
      {
        id: "code-shelf",
        title: "Code and create shelf",
        type: "Book",
        sample: true,
        motif: "book",
        teaser: "A sample shelf of beginner coding and making books to take home.",
        detail:
          "Sample content. The library lends books; this shelf is a prototype grouping, not a confirmed display or a set of real titles.",
        because: "A Saturday session can send you home with something to read before the next one.",
        children: [
          {
            id: "first-code-book",
            title: "A first coding book",
            type: "Book",
            sample: true,
            motif: "book",
            teaser: "Short chapters, big type, and exercises you can retry at the next dojo.",
            detail:
              "Sample content. A kind of book, not a specific title on the shelf today.",
            because: "Beginners often want a paper backup of what they just clicked through.",
          },
          {
            id: "game-books",
            title: "Books about making games",
            type: "Book",
            sample: true,
            motif: "game",
            teaser: "Stories and how-tos about games, for after the sprite starts moving.",
            detail:
              "Sample content. Placed here because a coding club and game books share an appetite. Not a real display.",
            because: "Many first programs want to be games.",
          },
          {
            id: "sketch-first",
            title: "Sketch before you code",
            type: "Book",
            sample: true,
            motif: "sketch",
            teaser: "Notebooks and design books for planning a screen on paper.",
            detail:
              "Sample content. A reminder that the making club’s sketches and the coding club’s plans are neighbors. Not a listing.",
            because: "Paper is a calm place to decide what the program should do.",
          },
        ],
      },
    ],
  },
  {
    id: "storytelling",
    title: "Storytelling sessions",
    type: "Activity",
    sample: true,
    motif: "story",
    teaser: "A shared story, read aloud. A sample stand-in for library story hours.",
    detail:
      "Sample content. This card is not a confirmed Bibliotheek Eindhoven listing. It stands in for the kind of read-aloud session many libraries host, so the prototype can show a softer way into the building. The Saturday row beneath the visit is where real, scheduled offerings appear.",
    because: "A starting point that is about listening, not signing up for a course.",
    children: [
      {
        id: "picture-books",
        title: "Picture books to borrow",
        type: "Book",
        sample: true,
        motif: "book",
        teaser: "Sample kinds of picture books you might take home after hearing a story.",
        detail:
          "Sample content. Bibliotheek Eindhoven does lend children’s books. These three cards are kinds of books, not a featured list and not specific titles.",
        because: "A story hour only works if the books are within reach.",
        children: [
          {
            id: "inventions-book",
            title: "Books of inventions",
            type: "Book",
            sample: true,
            motif: "makers",
            teaser: "Picture books about inventors, machines, and ideas that get built.",
            detail:
              "Sample content. A bridge from stories toward MakersClub. Not a real display.",
            because: "Some stories leave the page and want a workshop.",
          },
          {
            id: "friends-book",
            title: "Stories about friends",
            type: "Book",
            sample: true,
            motif: "story",
            teaser: "Characters who meet, argue, and try again. Easy to talk about on the way home.",
            detail:
              "Sample content. A familiar picture-book mood, not a selected title.",
            because: "Stories told together often turn out to be about other people.",
          },
          {
            id: "wordless-book",
            title: "A wordless book",
            type: "Book",
            sample: true,
            motif: "book",
            teaser: "No text to get right. You tell the page in whatever language you have.",
            detail:
              "Sample content. Wordless books are a real format; this card does not point at a copy on the Eindhoven shelf.",
            because: "A room full of languages can still share one story.",
          },
        ],
      },
      {
        id: "story-craft",
        title: "Story craft table",
        type: "Activity",
        sample: true,
        motif: "craft",
        teaser: "After the story, make a puppet or the next page yourself.",
        detail:
          "Sample content. A making table imagined next to a read-aloud. It is not a published Bibliotheek Eindhoven activity.",
        because: "Listening can tip into making without becoming a formal workshop.",
        children: [
          {
            id: "puppet",
            title: "Paper puppet",
            type: "Activity",
            sample: true,
            motif: "craft",
            teaser: "Fold a character from the story so it can talk on the way out.",
            detail:
              "Sample content. A simple craft, invented for this branch.",
            because: "A character in the hand keeps the story going.",
          },
          {
            id: "next-page",
            title: "Draw the next page",
            type: "Activity",
            sample: true,
            motif: "sketch",
            teaser: "The book stops. You draw what you think happens next.",
            detail:
              "Sample content. Not a library program.",
            because: "Finishing a story yourself is still reading.",
          },
          {
            id: "tell-back",
            title: "Tell it back",
            type: "Activity",
            sample: true,
            motif: "story",
            teaser: "Retell the story to someone who has not heard it yet.",
            detail:
              "Sample content. The smallest possible performance, and not a listing.",
            because: "A story you can retell is one you get to keep.",
          },
        ],
      },
      {
        id: "saturday",
        title: "Saturday at the library",
        type: "Guide",
        sample: true,
        motif: "family",
        teaser: "Not an event. A sample stroll past three real Saturday morning offerings.",
        detail:
          "Sample content. There is no combined program by this name. The next row is different: DigiCafé, MakersClub, and CoderDojo really do show up on Saturday mornings at Bibliotheek Eindhoven. This card only puts those published times next to a story visit.",
        because: "A story visit on Saturday morning lands in a building where other things are already happening.",
        children: [
          {
            id: "saturday-digicafe",
            title: "DigiCafé at 11:00",
            type: "Service",
            motif: "cafe",
            teaser: "Every Saturday, 11:00–12:00 at De Witte Dame. Digital questions, no signup.",
            detail:
              "The Eindhoven DigiCafé runs every Saturday morning from 11:00 to 12:00 at De Witte Dame, and on Tuesday mornings as well. Questions can be about e-books, e-readers, apps, or DigiD. Bring your own device if you can. This is the same service as the DigiCafé card on the coding branch, reached from a different visit.",
            when: "Saturdays 11:00–12:00",
            where: "De Witte Dame",
            because: "If the morning started with a story, digital help is already open before noon.",
          },
          {
            id: "saturday-makers",
            title: "MakersClub at 10:30",
            type: "Workshop",
            motif: "makers",
            teaser: "Saturday making for ages 7–13, 10:30–12:00, in the MakersPlaats.",
            detail:
              "Saturday MakersClub runs from 10:30 to 12:00 at Bibliotheek Eindhoven for ages 7–13. It is the same weekly club as the opening card. A city listing shows €5; confirm at the desk. Placed here because a Saturday story visit overlaps the club’s hours.",
            when: "Saturdays 10:30–12:00",
            where: "MakersPlaats, Bibliotheek Eindhoven",
            because: "The club is already in the building during a Saturday morning visit.",
          },
          {
            id: "saturday-coder",
            title: "CoderDojo at 10:15",
            type: "Workshop",
            motif: "code",
            teaser: "Programming together from 10:15 to 12:00, on the Saturdays the agenda lists.",
            detail:
              "CoderDojo Eindhoven is published at the library on Saturdays from 10:15 to 12:00. Listings are dated sessions, not necessarily every week, so check the agenda. Same club as the opening card, seen from a Saturday stroll.",
            when: "Saturdays 10:15–12:00, on published dates",
            where: "Bibliotheek Eindhoven",
            because: "It starts fifteen minutes before MakersClub, in the same library.",
          },
        ],
      },
    ],
  },
];

export function countCards(nodes = roots) {
  return nodes.reduce(
    (total, node) => total + 1 + (node.children ? countCards(node.children) : 0),
    0
  );
}
