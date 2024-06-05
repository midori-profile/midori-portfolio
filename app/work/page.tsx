import type { Metadata } from "next";
import Link from "next/link";
import { LinkComponent } from "../page";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my professional experience.",
};

async function Stars() {
  let res = await fetch("https://api.github.com/repos/vercel/next.js");
  let json = await res.json();
  let count = Math.round(json.stargazers_count / 1000);
  return `${count}k stars`;
}

export default function WorkPage() {
  return (
    <section>
      <h1 className="text-2xl font-medium tracking-tighter">
        Professional Experience
      </h1>
      <div className="pt-6">
        <p className="prose prose-neutral mb-6">
          As a senior front-end engineer at Tencent and Baidu , I've delivered
          engineering solutions to both internal and external engineers to
          maximize quality and Efficiency of development.
        </p>
        <hr className="border-neutral-100" />
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Current Phase: Spearheading Team's Technical Architecture and
          Toolchain
        </h2>
        <p className="mb-4 text-neutral-600 text-sm">
          maximize quality & Efficiency of development, Dec. 2021 ~ Now
        </p>
        <p className="prose prose-neutral mb-4">
          <span className="font-bold">
            Monorepo & Micro Front-End Architecture:
          </span>{" "}
          Integrated SPA applications into one Tencent's Cloud system, supports
          <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
            TypeScript and Rust mixed development.
          </LinkComponent>
        </p>
        <p className="prose prose-neutral mb-4">
          <span className="font-bold">Engineering Efficiency: </span>Developed
          an
          <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
            APImock platform supporting both GraphQL
          </LinkComponent>
          and RESTful for Tencent's CSIG as a full-stack engineer. <br></br>
          Primary responsibility for team's CI/CD pipeline, facilitating
          multi-environment deployment and PR-level E2E validation. conducted
          multiple
          <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
            sharing on Kubernetes
          </LinkComponent>
          , Pulumi, and Helm. <br></br>
          Provided comprehensive E2E test and{" "}
          <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
            cypress tool{" "}
          </LinkComponent>
          for the team.
        </p>
        <div>
          <p className="my-0 font-bold"> Achievement：</p>
          <div className="prose prose-neutral">
            <ul className="list-disc list-inside">
              <li>
                <span>
                  {" "}
                  Successfully reduced project bundle size by 30% through
                  monorepo adoption, Micro Front-End facilitating seamless
                  collaboration across diverse domains within the Tencent Cloud
                  Team.
                </span>
              </li>
              <li>
                <span>
                  APImock platform reduced the manpower needed for debugging
                  single API from 2-3 people to 1 person
                </span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-neutral-100" />
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Phase II: Addressing Business System Challenges
        </h2>
        <p className="mb-4 text-neutral-600">
          Leading project to address business challenges and solve system
          issues, Jun. 2020 ~ Sep. 2021
        </p>
        <p className="prose prose-neutral mb-4">
          <span className="font-bold">
            Performance Monitoring and Optimization:
          </span>{" "}
          Implement a complete performance monitoring system, including
          performance monitoring, error monitoring, and risk monitoring for
          Tencent Cloud Products(serving tens of millions of users).
        </p>
        <div>
          <p className="my-0 font-bold"> Achievement：</p>
          <div className="prose prose-neutral">
            <ul className="list-disc list-inside">
              <li>
                <span>
                  Designed a cross-platform SDK that supports batch event
                  reporting in weak network and offline environments, Used
                  JavaScript for data collection and Node.js, Koa, Kafka, Flink,
                  Elasticsearch, and Clickhouse for data reporting, calculation,
                  and storage.
                </span>
              </li>
              <li>
                <span>
                  Solved performance issues such as slow start and poor runtime
                  performance of business, resulting in a 50% reduction in
                  startup time and a 62% reduction in first screen rendering
                  time. Also reduced page memory consumption by 90% in extreme
                  conditions.{" "}
                  <LinkComponent href="https://en.wikipedia.org/wiki/Tencent">
                    see more detils here.
                  </LinkComponent>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-neutral-100" />
      </div>
      <div className="pt-6">
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Phase I: Business Requirement Implementation
        </h2>
        <p className="mb-4 text-neutral-600 text-sm">
          Concentrated on individual tasks, completing them with high quality
          and innovation, Jun. 2017 ~ Mar. 2020
        </p>
        <p className="prose prose-neutral mb-4">
          <span className="font-bold">Baidu Mini-App framework: </span> Leading
          technical innovations obtained 2 technical patents in Baidu. <br></br>
          including an innovative transparent video animation solution using
          webGL, video, and canvas that converts video files into transparent
          channel-supported animations.<br></br> Design and develop the
          same-layer rendering solution that allows native and HTML5 components
          to overlap and interact with each other.
        </p>
        <div>
          <p className="my-0 font-bold"> Achievement：</p>
          <div className="prose prose-neutral">
            <ul className="list-disc list-inside">
              <li>
                <span>
                  Dramatically cut the cost of implementing complex animations
                  to zero and shrunk animation resource sizes by 90% compared to
                  PNG sequences. Enhanced Baidu APP products, influencing
                  billions of page views.
                </span>
              </li>
              <li>
                <span>
                  Enabled 300k mini-program developers to seamlessly integrate
                  native and web components, greatly enhancing usability and
                  developer experience.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
