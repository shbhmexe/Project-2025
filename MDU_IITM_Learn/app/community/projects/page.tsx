import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import ProjectSubmissionForm from "@/components/Community/ProjectSubmissionForm";
import CommunityClientWrapper from "@/components/Community/CommunityClientWrapper";

async function getProjects() {
    await dbConnect();
    const projects = await Project.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
}

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <CommunityClientWrapper
            title="Project Showcase"
            description="A gallery of amazing projects built by MDU & IITM students. Show off your skills and get noticed!"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Col: Grid of Projects */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">Featured Projects</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((project: any) => (
                                <div key={project._id} className="group relative flex flex-col p-6 bg-white dark:bg-gray-dark rounded-xl shadow-one border border-stroke dark:border-stroke-dark transition hover:shadow-two dark:hover:shadow-gray-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2 text-black dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-sm text-body-color dark:text-body-color-dark mb-4 line-clamp-3">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.map((tech: string, i: number) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-gray-light dark:bg-bg-color-dark rounded-md text-body-color dark:text-body-color-dark border border-stroke dark:border-stroke-dark">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-stroke dark:border-stroke-dark flex items-center justify-between">
                                        <span className="text-xs text-body-color dark:text-body-color-dark">By {project.author.split('@')[0]}</span>
                                        <div className="flex gap-3">
                                            {project.githubLink && (
                                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-body-color hover:text-black dark:hover:text-white transition">
                                                    Git
                                                </a>
                                            )}
                                            {project.demoLink && (
                                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {projects.length === 0 && (
                            <div className="text-center py-12 bg-white dark:bg-gray-dark rounded-lg border border-dashed border-stroke dark:border-stroke-dark">
                                <p className="text-body-color dark:text-body-color-dark">No projects yet. Show us what you've built!</p>
                            </div>
                        )}
                    </div>

                    {/* Right Col: Submission Form */}
                    <div>
                        <div className="sticky top-24">
                            <ProjectSubmissionForm />
                        </div>
                    </div>
                </div>
            </div>
        </CommunityClientWrapper>
    )
}
