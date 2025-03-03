export default defineEventHandler((event) => {
  const jobs = [
    {
      id: 1,
      title: "Vue.js Developer",
      company: "TechCorp",
      category: "Frontend",
      salary: "$60,000 - $80,000",
      description: "We are looking for a Vue.js developer to join our team.",
    },
    {
      id: 2,
      title: "Nuxt.js Engineer",
      company: "StartupX",
      category: "Full Stack",
      salary: "$70,000 - $90,000",
      description: "Build amazing applications using Nuxt.js!",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignCo",
      category: "UI/UX",
      salary: "$50,000 - $70,000",
      description: "We need a creative UI/UX designer to join our team.",
    },
  ];

  const { id, category, search } = getQuery(event);

  if (id) {
    const job = jobs.find((job) => job.id === Number(id));
    if (!job) {
      throw createError({
        statusCode: 404,
        statusMessage: "Job not found",
      });
    }
    return job;
  }

  let filteredJobs = jobs;

  if (category) {
    filteredJobs = filteredJobs.filter((job) => job.category === category);
  }

  if (search) {
    const searchLower = typeof search === 'string' ? search.toLowerCase() : '';
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
    );
  }

  return { jobs: filteredJobs };
});