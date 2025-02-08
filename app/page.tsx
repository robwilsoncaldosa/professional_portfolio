import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";
export default function Home() {
  return (
    <main className="grid  min-h-screen prose  prose-headings:text-foreground px-6 py-12 bg-primary">
      <section title="left-section" className="text-foreground">
        <h1 className="mb-0">
          Rob Caldosa <br />
          <span className="text-lg font-medium">Full Stack Developer</span>
        </h1>
        <p className="mt-4 text-secondary">
          I build and maintain accessible, user-friendly web applications.
        </p>
        <article className="flex justify-start gap-8 mb-16 mt-6 text-secondary">
          <GithubIcon />
          <LinkedinIcon />
          <FacebookIcon />
        </article>
      </section>
      <section title="right-section" className="text-secondary">
        <h4 className="font-bold">ABOUT</h4>
        <p>
          I'm a developer passionate about creating simple, clean, and elegant
          interfaces that are accessible and user-friendly. I also prioritize{" "}
          performance and enjoy exploring and developing experiences that are
          both user-friendly and developer-friendly.
        </p>
        <p>
          Currently, I'm a Full Stack Developer at{" "}
          <strong className="text-foreground">DNA Micro Inc</strong>,
          specializing in exploring tech and components. I contribute to the
          creation and maintenance of{" "}
          <strong className="text-foreground">UI Components</strong> that power
          DNA Micro's frontend, ensuring our platform meets{" "}
          <strong className="text-foreground">
            web accessibility standards
          </strong>{" "}
          and best practices to deliver an inclusive user and developer
          experience.
        </p>

        <p>
          In the past, I've had the opportunity to develop software for a
          <strong className="text-foreground">
            {" "}
            non-governmental organization (NGO)
          </strong>{" "}
          that offers guesthouse booking services to fund their beneficiaries,
          and in my spare time, I work with clients on various projects,
          including professional and capstone projects. This role exposes me to
          various languages such as{" "}
          <strong className="text-foreground">PHP</strong>,{" "}
          <strong className="text-foreground">C#</strong>, and
          <strong className="text-foreground"> JavaScript/TypeScript</strong>.
        </p>
        <p>
          Additionally, I am eager to learn and adapt quickly to new
          technologies and frameworks. I am flexible and open to exploring
          various ecosystems and other emerging technologies.
        </p>
        <h4 className="font-bold">EXPERIENCE</h4>
        <article>
          <Card className="bg-transparent text-secondary border-none shadow-none">
            <CardTitle className="!text-xs opacity-60 tracking-widest ">
              2024 - PRESENT
            </CardTitle>
            <CardDescription>
              <h3 className="mt-0 mb-0">
                <strong className="text-foreground">
                  Full Stack Developer <br />
                </strong>
              </h3>
              <span className="text-secondary text-sm font-semibold">
                DNA Micro Software Inc
              </span>
            </CardDescription>
            <CardContent className="px-0 text-sm">
              <p className="mt-2">
                Build and maintain critical components used in DNA Micro's
                frontend across all projects. Work closely with Business
                Analysts, cross-functional teams, including developers,
                designers, functional managers, and product managers.
              </p>
              <div className="flex gap-1 flex-wrap gap-y-2">
                <Badge>
                  <span>JavaScript</span>
                </Badge>
                <Badge>
                  <span>TypeScript</span>
                </Badge>
                <Badge>
                  <span>React</span>
                </Badge>
                <Badge>
                  <span>Next.js</span>
                </Badge>
                <Badge>
                  <span>Node.js</span>
                </Badge>

                <Badge>
                  <span>Tailwind</span>
                </Badge>
                <Badge>
                  <span>Storybook</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent text-secondary border-none shadow-none">
            <CardTitle className="!text-xs opacity-60 tracking-widest ">
              FEB - NOV 2023
            </CardTitle>
            <CardDescription>
              <h3 className="mt-0 mb-0">
                <strong className="text-foreground">
                  Full Stack Developer <br />
                </strong>
              </h3>
              <span className="text-secondary text-sm font-semibold">
                Prince Retail Group of Companies
              </span>
            </CardDescription>
            <CardContent className="px-0 text-sm">
              <p className="mt-2">
                Developed and styled interactive web apps for the company's
                infrastructure department data and marketing data with a focus
                on user experience and performance optimization. Collaborated
                with cross-functional teams to ensure seamless integration and
                functionality.
              </p>
              <div className="flex gap-1 flex-wrap gap-y-2">
                <Badge>
                  <span>C#</span>
                </Badge>
                <Badge>
                  <span>.NET Core</span>
                </Badge>
                <Badge>
                  <span>JavaScript</span>
                </Badge>
                <Badge>
                  <span>JQuery</span>
                </Badge>
                <Badge>
                  <span>Bootstrap</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </article>
        <Button
          effect="hoverUnderline"
          className="text-md ps-0 font-bold my-10"
          size={"lg"}
          icon={ArrowRightIcon}
          iconPlacement="right"
        >
          View Resume
        </Button>
        <h4 className="font-bold ">PROJECTS</h4>

        <Card className="bg-transparent text-secondary border-none shadow-none">
  
            <CardDescription>
              <h3 className="mt-0 mb-0">
                <strong className="text-foreground">
                  Full Stack Developer <br />
                </strong>
              </h3>
            </CardDescription>
            <CardContent className="px-0 text-sm">
              <p className="mt-2">
                Developed and styled interactive web apps for the company's
                infrastructure department data and marketing data with a focus
                on user experience and performance optimization. Collaborated
                with cross-functional teams to ensure seamless integration and
                functionality.
              </p>
              <div className="flex gap-1 flex-wrap gap-y-2">
                <Badge>
                  <span>C#</span>
                </Badge>
                <Badge>
                  <span>.NET Core</span>
                </Badge>
                <Badge>
                  <span>JavaScript</span>
                </Badge>
                <Badge>
                  <span>JQuery</span>
                </Badge>
                <Badge>
                  <span>Bootstrap</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-transparent text-secondary border-none shadow-none">
  
            <CardDescription>
              <h3 className="mt-0 mb-0">
                <strong className="text-foreground">
                  Full Stack Developer <br />
                </strong>
              </h3>
            </CardDescription>
            <CardContent className="px-0 text-sm">
              <p className="mt-2">
                Developed and styled interactive web apps for the company's
                infrastructure department data and marketing data with a focus
                on user experience and performance optimization. Collaborated
                with cross-functional teams to ensure seamless integration and
                functionality.
              </p>
              <div className="flex gap-1 flex-wrap gap-y-2">
                <Badge>
                  <span>C#</span>
                </Badge>
                <Badge>
                  <span>.NET Core</span>
                </Badge>
                <Badge>
                  <span>JavaScript</span>
                </Badge>
                <Badge>
                  <span>JQuery</span>
                </Badge>
                <Badge>
                  <span>Bootstrap</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
      </section>
    </main>
  );
}
