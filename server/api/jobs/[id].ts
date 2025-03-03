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
    ];
  
    // Get the query parameter `id`
    const id = Number(getQuery(event).id);
  
    if (id) {
      // Return a single job if `id` is provided
      const job = jobs.find((j) => j.id === id);
      if (!job) {
        throw createError({
          statusCode: 404,
          statusMessage: "Job not found",
        });
      }
      return job;
    }
  
    // Return all jobs if no `id` is provided
    return { jobs };
  });