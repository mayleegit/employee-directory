<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  editingEmployee: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save', 'cancel']);

const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];

const emptyForm = () => ({
    empId: '',
    name: '',
    email: '',
    department: '',
    position: '',
    hireDate: '',
    salary: null,
    active: true
});

const form = ref(emptyForm());
const errors = ref({});

const isEditing = computed(() => Boolean(props.editingEmployee));

watch(
    () => props.editingEmployee,
    (employee) => {
    form.value = employee ? { ...employee } : emptyForm();

    if (form.value.hireDate) {
      form.value.hireDate = form.value.hireDate.slice(0, 10);
    }

    errors.value = {};
  },
  { immediate: true }
);

function validate() {
  const newErrors = {};
  const empIdRegex = /^EMP[0-9]{3,5}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const today = new Date().toISOString().slice(0, 10);

  if (!form.value.empId) {
    newErrors.empId = 'Employee ID is required.';
  } else if (!empIdRegex.test(form.value.empId)) {
    newErrors.empId = 'Employee ID must be like EMP001.';
  }

  if (!form.value.name) {
    newErrors.name = 'Name is required.';
  } else if (form.value.name.length < 3) {
    newErrors.name = 'Name must be at least 3 characters.';
  }

  if (!form.value.email) {
    newErrors.email = 'Email is required.';
  } else if (!emailRegex.test(form.value.email)) {
    newErrors.email = 'Please enter a valid email.';
  }

  if (!form.value.department) {
    newErrors.department = 'Department is required.';
  }

  if (!form.value.position) {
    newErrors.position = 'Position is required.';
  }

  if (!form.value.hireDate) {
    newErrors.hireDate = 'Hire date is required.';
  } else if (form.value.hireDate > today) {
    newErrors.hireDate = 'Hire date cannot be in the future.';
  }

  if (form.value.salary === null || form.value.salary === '') {
    newErrors.salary = 'Salary is required.';
  } else if (Number(form.value.salary) < 1500 || Number(form.value.salary) > 50000) {
    newErrors.salary = 'Salary must be between RM1,500 and RM50,000.';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
}

function submitForm() {
  if (!validate()) return;

  emit('save', {
    ...form.value,
    salary: Number(form.value.salary),
    active: Boolean(form.value.active)
  });

  if (!isEditing.value) {
    form.value = emptyForm();
  }
}

function cancelEdit() {
  form.value = emptyForm();
  errors.value = {};
  emit('cancel');
}
</script>

<template>
  <form class="employee-form" @submit.prevent="submitForm">
    <h2>{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</h2>

    <div class="form-grid">
      <div class="form-group">
        <label>Employee ID</label>
        <input v-model.trim="form.empId" type="text" placeholder="EMP001" />
        <p v-if="errors.empId" class="error">{{ errors.empId }}</p>
      </div>

      <div class="form-group">
        <label>Name</label>
        <input v-model.trim="form.name" type="text" placeholder="Full name" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model.trim="form.email" type="email" placeholder="name@company.com" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label>Department</label>
        <select v-model="form.department">
          <option value="">Select department</option>
          <option v-for="dept in departments" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
        <p v-if="errors.department" class="error">{{ errors.department }}</p>
      </div>

      <div class="form-group">
        <label>Position</label>
        <input v-model.trim="form.position" type="text" placeholder="Job title" />
        <p v-if="errors.position" class="error">{{ errors.position }}</p>
      </div>

      <div class="form-group">
        <label>Hire Date</label>
        <input v-model="form.hireDate" type="date" />
        <p v-if="errors.hireDate" class="error">{{ errors.hireDate }}</p>
      </div>

      <div class="form-group">
        <label>Salary RM</label>
        <input v-model.number="form.salary" type="number" min="1500" max="50000" />
        <p v-if="errors.salary" class="error">{{ errors.salary }}</p>
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input v-model="form.active" type="checkbox" />
          Active employee
        </label>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit">
        {{ isEditing ? 'Update Employee' : 'Add Employee' }}
      </button>

      <button v-if="isEditing" type="button" class="secondary" @click="cancelEdit">
        Cancel
      </button>
    </div>
  </form>
</template>