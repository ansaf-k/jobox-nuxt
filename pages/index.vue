<script setup>
const selectedCategory = ref('');
const searchQuery = ref('');


const { data: jobs, error, status } = await useAsyncData(
  '/api/jobss',
  () => $fetch('/api/jobs', {
    query: {
      category: selectedCategory.value,
      search: searchQuery.value,
    }
  }), { transform: (data) => data.jobs, watch: [selectedCategory, searchQuery] }
);

</script>


<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Job Listings</h1>

    <select v-model="selectedCategory" class="p-2 border rounded mb-4">
      <option value="">All Categories</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Full Stack">Full Stack</option>
      <option value="UI/UX">UI/UX</option>
    </select>

    <input v-model="searchQuery" type="text" placeholder="Search jobs..." class="p-2 border rounded mb-4 w-full" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in jobs" :key="job.id"
        class="p-6 border rounded-lg shadow-lg custom-gradient text-white hover:shadow-xl transition-shadow">
        <h2 class="text-xl font-semibold">{{ job.title }}</h2>
        <p class="mt-2">{{ job.company }}</p>
        <p class="mt-2">{{ job.category }}</p>
        <p class="mt-2">{{ job.salary }}</p>
        <NuxtLink :to="`/jobs/${job.id}`" class="text-blue-500 hover:underline">
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
