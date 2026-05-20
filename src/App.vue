<script setup>
import { ref, computed, onMounted } from 'vue';
import api from './services/api';
import EmployeeForm from './components/EmployeeForm.vue';
import EmployeeList from './components/EmployeeList.vue';
import SearchSortControls from './components/SearchSortControls.vue';

const employees = ref([]);
const editingEmployee = ref(null);
const searchQuery = ref('');
const sortBy = ref('empId');
const order = ref('asc');
const loading = ref(false);
const errorMessage = ref('');

const activeCount = computed(() => {
  return employees.value.filter((employee) => Boolean(employee.active)).length;
});

async function fetchEmployees() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await api.get('/employees', {
      params: {
        q: searchQuery.value,
        sortBy: sortBy.value,
        order: order.value
      }
    });

    employees.value = response.data;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

async function saveEmployee(employeeData) {
  loading.value = true;
  errorMessage.value = '';

  try {
    if (editingEmployee.value) {
      await api.put(`/employees/${editingEmployee.value.id}`, employeeData);
      editingEmployee.value = null;
    } else {
      await api.post('/employees', employeeData);
    }

    await fetchEmployees();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

function startEdit(employee) {
  editingEmployee.value = { ...employee };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingEmployee.value = null;
}

async function deleteEmployee(id) {
  const confirmed = confirm('Are you sure you want to delete this employee?');

  if (!confirmed) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    await api.delete(`/employees/${id}`);
    await fetchEmployees();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchEmployees);
</script>

<template>
  <main class="app">
    <section class="hero">
      <div>
        <h1>Employee Directory</h1>
        <p>Manage employee records for the HR office.</p>
      </div>

      <div class="summary-card">
        <span>Total Active Employees</span>
        <strong>{{ activeCount }}</strong>
      </div>
    </section>

    <p v-if="errorMessage" class="error-banner">
      {{ errorMessage }}
    </p>

    <EmployeeForm
      :editing-employee="editingEmployee"
      @save="saveEmployee"
      @cancel="cancelEdit"
    />

    <SearchSortControls
      v-model:search-query="searchQuery"
      v-model:sort-by="sortBy"
      v-model:order="order"
      @search="fetchEmployees"
    />

    <p v-if="loading" class="loading">Loading...</p>

    <EmployeeList
      :employees="employees"
      @edit="startEdit"
      @delete="deleteEmployee"
    />
  </main>
</template>