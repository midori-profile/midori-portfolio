import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import smashing from "public/images/home/smashing.jpg";
import summit from "public/images/home/summit.jpg";
import reactathon from "public/images/home/reactathon.jpg";
import ship from "public/images/home/ship.jpg";
import filming from "public/images/home/filming.jpg";
import meetups from "public/images/home/meetups.jpg";
import vercel from "public/images/home/vercel.jpg";
import avatar from "app/avatar.jpg";
import ViewCounter from "app/blog/view-counter";
import { PreloadResources } from "app/preload";
import Accordion from "./accordiont";
import {
  getLeeYouTubeSubs,
  getVercelYouTubeSubs,
  getViewsCount,
} from "app/db/queries";

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChannelLink({
  img,
  link,
  name,
}: {
  img?: StaticImageData;
  link: string;
  name: string;
}) {
  return (
    <div className="group flex w-full">
      <a
        href={link}
        target="_blank"
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex items-center space-x-3">
          {img && (
            <div className="relative h-16">
              <Image
                alt={name}
                src={img}
                height={64}
                width={64}
                sizes="33vw"
                className="h-16 w-16 rounded-full border border-neutral-200 dark:border-neutral-700"
                priority
              />
              <div className="relative -right-10 -top-6 inline-flex h-6 w-6 items-center rounded-full border border-neutral-200 bg-white p-1">
                <img
                  alt="GitHub logo"
                  src="/github-logo.svg"
                  width="20"
                  height="20"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p className="font-medium prose prose-neutral">{name}</p>

            {/* <p className="font-bold text-neutral-900 dark:text-neutral-100">
              {name}
            </p> */}
            <Suspense fallback={<p className="h-6" />}>
              <Subs name={name} />
            </Suspense>
          </div>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

async function getMidoriFollowers() {
  const response = await fetch("https://api.github.com/users/midori-profile");
  const data = await response.json();
  return data.followers;
}

async function Subs({ name }: { name: string }) {
  noStore();
  let counts;
  if (name === "@Midori") {
    // Replace this with the actual function to get @Midori's followers
    counts = await getMidoriFollowers();
  } else if (name === "Professional Experience") {
    // Replace this with the actual function to get the total article views
    // counts = await getTotalArticleViews();
  } else {
    counts = 200;
  }

  return (
    <p className="prose prose-neutral pl-1">
      {counts} {name === "Professional Experience" ? "views" : "followers"}
    </p>
  );
}

function BlogLink({ slug, name, subName }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium prose prose-neutral">{name}</p>
          <Suspense fallback={<p className="h-6" />}>
            <div className="flex flex-col sm:flex-row">
              <p className="prose prose-neutral pr-2">{subName}</p>
              <Views slug={slug} />
            </div>
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

interface LinkComponentProps {
  href: string;
  children: React.ReactNode;
}

const LinkComponent: React.FC<LinkComponentProps> = ({ href, children }) => (
  <span>
    {" "}
    <a href={href} className="underline text-black hover:text-gray-800">
      {children}
    </a>{" "}
  </span>
);

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <h1 className="text-2xl font-medium tracking-tighter">
        Hi 👋, I'm Midori.{" "}
      </h1>
      <div className="pt-6">
        <p className="prose prose-neutral">
          {`A passionate full stack developer currently living in 🇯🇵 Tokyo, Japan. I am well-adapted to remote work cultures, Feel free to explore my projects on Github or my Portfolio:`}
        </p>
        <div className="my-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <ChannelLink
            img={avatar}
            name="@Midori"
            link="https://github.com/midori-profile"
          />
          <ChannelLink name="Professional Experience" link="/work" />
        </div>
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          I. Technical Highlights
        </h2>
        <p className="prose prose-neutral">
          {`I've outlined some of my key technical strengths, which are divided into three main categories, click to show details`}
        </p>
        <div className="my-4 max-w-screen-xl mx-auto min-h-sceen w-full border border-neutral-200">
          <div className="divide-y divide-neutral-200 mx-auto">
            <details className="group" open>
              <summary className="flex justify-between items-center cursor-pointer list-none rounded px-3 py-4 bg-neutral-50">
                <p className="prose prose-neutral font-medium">
                  1. Front-End Technology Stack
                </p>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="22"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="22"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="px-3 py-4">
                <p className="prose prose-neutral">
                  Expert in large-scale front-end frameworks, such as Vue and
                  React , Had
                  <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
                    deep dive into React's source code
                  </LinkComponent>
                </p>
                <p className="prose prose-neutral">
                  Designed and developed the
                  <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
                    Baidu Mini-App framework
                  </LinkComponent>
                  , serving 300k mini-program merchants, obtained
                  <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
                    2 technical patents.
                  </LinkComponent>
                </p>
                <p className="prose prose-neutral">
                  Experienced in Javascript and Typescript, Founder and
                  instructor of
                  <LinkComponent href="https://ife.baidu.com/introduction.html">
                    Baidu Front End Academy
                  </LinkComponent>
                  , delivering Javascript/Typescript courses to over 60k college
                  students.
                </p>
              </div>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none rounded px-3 py-4 bg-neutral-50">
                <p className="prose prose-neutral font-medium">
                  2. Efficiency & Performance Optimization
                </p>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="22"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="22"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="px-3 py-4">
                <p className="prose prose-neutral">
                  Led the team's CI/CD works, Experienced in CI/CD
                  methodologies,
                  <LinkComponent href="https://ife.baidu.com/introduction.html">
                    Kubernetes
                  </LinkComponent>
                  , Helm , Shell scripting, GitHub Actions, and{" "}
                  <LinkComponent href="https://ife.baidu.com/introduction.html">
                    Pulumi.
                  </LinkComponent>
                </p>
                <p className="prose prose-neutral">
                  Specializing in front-end performance optimization. Developed
                  <LinkComponent href="https://ife.baidu.com/introduction.html">
                    monitoring and optimization tools{" "}
                  </LinkComponent>
                  for{" "}
                  <LinkComponent href="https://www.tencentcloud.com/">
                    Tencent Cloud{" "}
                  </LinkComponent>
                  Products, serving tens of millions of users.
                </p>
                <p className="prose prose-neutral">
                  Led Team's front-end testing strategy, provided comprehensive
                  E2E test and{" "}
                  <LinkComponent href="https://www.tencentcloud.com/">
                    Cypress automation tool
                  </LinkComponent>
                </p>
              </div>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none rounded px-3 py-4 bg-neutral-50">
                <p className="prose prose-neutral font-medium">3. Full Stack</p>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="22"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="22"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="px-3 py-4">
                <p className="prose prose-neutral">
                  Proficient in Node.js, with experience in Koa, Express, and
                  NestJS
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          II. Open source projects
        </h2>
        <p className="prose prose-neutral">
          I enjoy creating tools to enhance work efficiency and quality. Here
          are some tools I've developed, give it a try!
        </p>
        <div className="my-4 flex flex-col sm:flex-row w-full space-y-2 sm:space-x-2 sm:space-y-0 overflow-x-auto">
          <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4">
            <a href="https://linear.app">
              <svg width="78" height="20" role="img" aria-label="Linear logo">
                <use href="/sprite.svg#linear" />
              </svg>
            </a>
          </div>
          <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4">
            <a href="https://supabase.com">
              <svg
                width="100"
                height="19"
                role="img"
                aria-label="Supabase logo"
              >
                <use href="/sprite.svg#supabase" />
              </svg>
            </a>
          </div>
          <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4">
            <a href="https://www.makeswift.com/blog/makeswift-is-joining-bigcommerce">
              <svg
                width="96"
                height="19"
                role="img"
                aria-label="Makeswift logo"
              >
                <use href="/sprite.svg#makeswift" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          III. My Technique Posts
        </h2>
        <p className="prose prose-neutral dark:prose-invert">
          I enjoy learning and sharing. Below are some of my past works and
          shares (confidential content removed).
        </p>
        <div className="my-4 flex w-full flex-col space-y-4">
          <BlogLink
            name="What Makes A Great Developer Experience?"
            subName={"cross-platform development, and browser."}
            slug="developer-experience-examples"
          />
          <BlogLink
            name="What Makes A Great Developer Experience?"
            subName={"cross-platform development, and browser."}
            slug="developer-experience-examples"
          />
          <BlogLink
            name="What Makes A Great Developer Experience?"
            subName={
              "cross-platform development, and browser.platform development"
            }
            slug="developer-experience-examples"
          />
        </div>
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          IV. Languages I Speak
        </h2>
        <p className="prose prose-neutral">
          {`I can speak three languages and can work in English smoothly.`}
        </p>
        <div className="prose prose-neutral my-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span>Chinese -- </span>
              <span>Native Speaker</span>
            </li>
            <li>
              <span>English -- </span>
              <span>
                IELTS score of 7. Worked in an English-speaking environment for
                years.
              </span>
            </li>
            <li>
              <span>Japanese -- </span>
              <span>Capable of daily conversations and living.</span>
            </li>
          </ul>
        </div>
        {/* <table className="prose prose-neutral my-4 min-w-full overflow-hidden text-left rounded border border-neutral-200">
          <thead className="bg-neutral-50 rounded w-full">
            <tr>
              <th className="px-3 py-4">Language</th>
              <th className="prose prose-neutral px-3 py-4">Proficiency</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-neutral-200 bg-white">
              <td className="px-3 py-4">Chinese</td>
              <td className="px-3 py-4">Native Speaker</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-3 py-4">English</td>
              <td className="px-3 py-4">
                IELTS score of 7. Worked in an English-speaking environment for
                years.
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-3 py-4">Japanese</td>
              <td className="px-3 py-4">
                Conversational proficiency for daily life.
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          V. Some Interesting Things
        </h2>
        <p className="prose prose-neutral">
          Besides programming, I also served as a designer for
          <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
            Echarts
          </LinkComponent>
          team for two years. I enjoy photography and design a lot. Check some
          of my works:
        </p>

        <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://leerob.substack.com"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">View my design work</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://leerob.substack.com"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">My photography work</p>
            </a>
          </li>
        </ul>
      </div>
      {/* put it into guest book */}
      {/* <a
        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
        rel="noopener noreferrer"
        target="_blank"
        href="https://leerob.substack.com"
      >
        <ArrowIcon />
        <p className="ml-2 h-7"> Send me email</p>
      </a> */}
    </section>
  );
}
