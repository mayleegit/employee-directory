<script setup>
defineProps({
  employees: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const salaryFormatter = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR'
});

function formatSalary(value) {
  return salaryFormatter.format(Number(value));
}

function formatDate(value) {
  return value ? value.slice(0, 10) : '-';
}
</script>

<template>
  <div class="employee-list">
    <h2>Employee List</h2>

    <div v-if="employees.length === 0" class="empty">
      No employees found.
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Hire Date</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.empId }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ formatDate(employee.hireDate) }}</td>
            <td>{{ formatSalary(employee.salary) }}</td>
            <td>
              <span :class="['badge', employee.active ? 'active' : 'inactive']">
                {{ employee.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="actions">
              <button type="button" @click="emit('edit', employee)">Edit</button>
              <button type="button" class="danger" @click="emit('delete', employee.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>