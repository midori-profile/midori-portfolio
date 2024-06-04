import Link from "next/link";

const navItems = {
  "/": {
    name: "About me",
  },
  "/work": {
    name: "Work",
  },
  "/blog": {
    name: "Blog",
  },
  "/guestbook": {
    name: "Guestbook",
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-3">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <div className="transition-all hover:bg-gray-100 rounded-full">
                  <Link
                    key={path}
                    href={path}
                    className="flex align-middle relative py-1 px-2"
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
