const galleryItems = [
  {
    id: 1,
    title: "Winter Clothes Drive",
    category: "WARMTH FOR THE NEEDY",
    location: "Barandipara, Jessore",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Winter_Clothes_Distribution_in_Bangladesh.jpg",
    color: "bg-teal-600",
  },
  {
    id: 2,
    title: "Night Blanket Relief",
    category: "SHELTERLESS NIGHT SUPPORT",
    location: "Jessore Sadar, Jessore",
    image:
      "https://ecdn.dhakatribune.net/contents/cache/images/640x0x1/uploads/media/2025/08/13/IMG-20250812-WA0024-0258f7bca2b08a3ac8c8bc796eb644cd.jpg",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Canal Clean-Up",
    category: "ECO PLASTIC-FREE WATERS",
    location: "Jashore, Bangladesh",
    image:
      "https://d2u0ktu8omkpf6.cloudfront.net/6b213687be323f1ab0d94a72e184018eaddf98046d6857d0.jpg",
    color: "bg-teal-600",
  },
  {
    id: 4,
    title: "Urban Tree Plantation",
    category: "1000 GREEN SAPLINGS",
    location: "Jashore, Bangladesh",
    image:
      "https://d2u0ktu8omkpf6.cloudfront.net/6b213687be323f1ab0d94a72e184018eaddf98046d6857d0.jpg",
    color: "bg-red-500",
  },
  {
    id: 5,
    title: "Community Food Relief",
    category: "FRESH MEALS SHARING",
    location: "Jessore Sadar, Jessore",
    image:
      "https://www.gramerkagoj.com/assets/news_photos/2026/05/29/image-308012-1780065967.webp",
    color: "bg-teal-600",
  },
  {
    id: 6,
    title: "Children Book & Bag Drive",
    category: "EDUCATION FOR UNDERPRIVILEGED",
    location: "Jessore, Bangladesh",
    image:
      "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dshc-jessore/2024/12/c25862bbb6c3437c80601aa0da243e4f.jpg",
    color: "bg-red-500",
  },
];

const JoinedEventPage = () => {
  return (
    <main className="min-h-screen bg-[#071a17] px-4 py-12 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[11px] font-bold tracking-[0.15em] text-teal-400">
            VISUAL STORIES
          </p>

          <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Community in Action
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-6 text-slate-300">
            Moments from volunteer drives, relief distributions and green
            initiatives across Jashore and beyond.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 sm:h-56 lg:h-56"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03110e] via-black/25 to-transparent" />

              {/* Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span
                  className={`mb-2 inline-flex max-w-full rounded-md px-2 py-1 text-[9px] font-extrabold tracking-wide text-white ${item.color}`}
                >
                  {item.category}
                </span>

                <h2 className="mb-1 text-base font-bold leading-tight text-white">
                  {item.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-teal-400"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                  <span>{item.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View Full Gallery */}
        <div className="mt-6 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center gap-1 border-b border-teal-400 pb-0.5 text-xs font-semibold text-teal-400 transition-colors hover:border-teal-300 hover:text-teal-300"
          >
            View full gallery
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default JoinedEventPage;
