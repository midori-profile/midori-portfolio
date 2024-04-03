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
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-700 dark:bg-neutral-800"
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
            <p className="font-bold text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
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
    <p className="text-neutral-600 dark:text-neutral-400">
      {counts} {name === "Professional Experience" ? "views" : "followers"}
    </p>
  );
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
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

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        Hi 👋, I'm Midori.
      </h1>
      <p className="prose-lg prose-neutral text-gray-500">
        {`A passionate full stack developer currently living in 🇯🇵 Tokyo, Japan. You can check out some of my work on my Github or Portfolio:`}
      </p>
      <div className="my-6 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <ChannelLink
          img={avatar}
          name="@Midori"
          link="https://github.com/midori-profile"
        />
        <ChannelLink name="Professional Experience" link="/work" />
      </div>
      <p className="prose-lg prose-neutral text-gray-500">
        {`I've outlined some of my key technical strengths, which are divided into three main categories: Front-End Technology Stack, Efficiency & Performance Optimization, and Full-Stack Development.`}
      </p>
      <div className="prose-lg max-w-screen-xl mx-auto bg-white min-h-sceen w-full">
        <div className="divide-y divide-neutral-200 mx-auto mt-8">
          <div className="py-5">
            <details className="group" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="font-bold text-neutral-900">
                  {" "}
                  Front-End Technology Stack
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
              Expert in large-scale front-end frameworks, such as Vue and React,Had deep dive into React's source code
              </p>
              <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
              Designed and developed the Baidu Mini-App framework, serving 300k mini-program,
              and obtained 2 technical patents.

              </p>
              <p>
              Experienced in Javascript and Typescript, Founder and instructor of Baidu Front End Academy, delivering Javascript/Typescript courses to over 60k college students.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="font-bold text-neutral-900">
                  {" "}
                  Efficiency & Performance Optimization:
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
                SAAS platform is a cloud-based software service that allows
                users to access and use a variety of tools and functionality.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="font-bold text-neutral-900">
                  {" "}
                  Front-End Technology Stack
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-500 mt-3 group-open:animate-fadeIn">
                SAAS platform is a cloud-based software service that allows
                users to access and use a variety of tools and functionality.
              </p>
            </details>
          </div>
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
        I enjoy creating tools to enhance work efficiency and quality. Give it a try!
        </p>
      </div>
      <div className="my-8 flex h-14 w-full flex-row space-x-2 overflow-x-auto">
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
          <a href="https://linear.app">
            <svg width="78" height="20" role="img" aria-label="Linear logo">
              <use href="/sprite.svg#linear" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
          <a href="https://supabase.com">
            <svg width="100" height="19" role="img" aria-label="Supabase logo">
              <use href="/sprite.svg#supabase" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
          <a href="https://www.makeswift.com/blog/makeswift-is-joining-bigcommerce">
            <svg width="96" height="19" role="img" aria-label="Makeswift logo">
              <use href="/sprite.svg#makeswift" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
          <a href="https://resend.com">
            <svg width="70" height="17" role="img" aria-label="Resend logo">
              <use href="/sprite.svg#resend" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
          <a href="https://bun.sh">
            <svg width="35" height="27" role="img" aria-label="Bun logo">
              <use href="/sprite.svg#bun" />
            </svg>
          </a>
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
        I enjoy learning and sharing. Below are some of my past works and shares (confidential content removed)
        </p>
      </div>
      <div className="my-8 flex w-full flex-col space-y-4">
        <BlogLink
          name="What Makes A Great Developer Experience?"
          slug="developer-experience-examples"
        />
      </div>
      <div className="prose-lg prose-neutral dark:prose-invert">
        <p>
          I've worked with and advised companies on{" "}
          <Link href="/blog/developer-marketing">developer marketing</Link>,{" "}
          <Link href="/blog/devrel-at-vercel">developer relations</Link>,
          building open-source communities, product-led growth, and more.
        </p>
      </div>
      <h3>IV. Languages I Speak</h3>
<table>
  <tr>
    <th>Language</th>
    <th>Proficiency</th>
  </tr>
  <tr>
    <td>Chinese</td>
    <td>Native Speaker</td>
  </tr>
  <tr>
    <td>English</td>
    <td>IELTS score of 7. Worked in an English-speaking environment for years.</td>
  </tr>
  <tr>
    <td>Japanese</td>
    <td>Conversational proficiency for daily life.</td>
  </tr>
</table>
<h3>V. Some Interesting Things</h3>
<p>Besides programming, I also enjoy photography and design. Check some of my works:</p>

<table>
  <tr>
    <th>Design</th>
    <th>Photography</th>
  </tr>
  <tr>
    <td>
      Served as a designer for the <a href="https://echarts.apache.org/" target="_blank">echarts team</a> for two years. <br>View some of my design work on 
      <a href="https://dribbble.com/ceadatian" target="_blank">Dribbble</a>
    </td>
    <td>
      Check out my photography work:
      <a href="" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png" width="20"/> @ivymidori</a>
    </td>
  </tr>
</table>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://leerob.substack.com"
          >
            <ArrowIcon />
            <p className="ml-2 h-7"> Send me email</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
