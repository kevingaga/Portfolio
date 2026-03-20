import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetail from "@/components/ProjectDetail";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Projet non trouvé" };

  return {
    title: `${project.title} — Gwenaël LIGER`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
