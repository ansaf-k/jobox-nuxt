<template>
  <div class="container mx-auto p-4">
    <NuxtLink to="/" class="text-blue-500 hover:underline">
      &larr; Back to Jobs
    </NuxtLink>

    <!-- Job Details -->
    <div v-if="job" class="mt-6 p-6 border rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold">{{ job.title }}</h1>
      <p class="mt-2 text-gray-600">{{ job.company }}</p>
      <p class="mt-2 text-gray-600">{{ job.category }}</p>
      <p class="mt-2 text-gray-600">{{ job.salary }}</p>
      <p class="mt-4">{{ job.description }}</p>
    </div>

    <div v-else class="mt-6 text-red-500">
      Job not found.
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: job } = await useFetch(`/api/jobs?id=${route.params.id}`);

if (!job.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Job not found",
  });
}
</script>