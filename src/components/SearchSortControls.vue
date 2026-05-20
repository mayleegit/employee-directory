<script setup>
defineProps({
    searchQuery: String,
    sortBy: String,
    order: String
});

const emit = defineEmits([
    'update:searchQuery',
    'update:sortBy',
    'update:order',
    'search'
]);
</script>

<template>
    <div class="controls">
    <input
        :value="searchQuery"
        type="text"
        placeholder="Search by name, employee ID, or email"
        @input="emit('update:searchQuery', $event.target.value)"
        @keyup.enter="emit('search')"
    />

    <select :value="sortBy" @change="emit('update:sortBy', $event.target.value)">
        <option value="empId">Sort by Employee ID</option>
        <option value="name">Sort by Name</option>
        <option value="hireDate">Sort by Hire Date</option>
        <option value="salary">Sort by Salary</option>
    </select>

    <select :value="order" @change="emit('update:order', $event.target.value)">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>

    <button type="button" @click="emit('search')">
        Apply
    </button>
    </div>
</template>