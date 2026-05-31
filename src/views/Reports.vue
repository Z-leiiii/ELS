<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-800">Reports</h2>
          <p class="text-sm text-gray-600 mt-1">Generate and view various reports</p>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="generateCustomReport"
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Report Type Selection -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Select Report Type</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="reportType in reportTypes"
          :key="reportType.id"
          @click="selectedReportType = reportType.id"
          :class="[
            'p-4 rounded-lg border-2 transition-all',
            selectedReportType === reportType.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <component :is="reportType.icon" class="w-8 h-8 mx-auto mb-2" :class="reportType.iconColor" />
          <h4 class="font-medium text-gray-900">{{ reportType.name }}</h4>
          <p class="text-sm text-gray-600 mt-1">{{ reportType.description }}</p>
        </button>
      </div>
    </div>

    <!-- Date Range Selection -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Date Range</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            v-model="dateRange.start"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            v-model="dateRange.end"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Quick Select</label>
          <select
            @change="setQuickDateRange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Custom Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Report Display -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ getCurrentReportName() }}
          </h3>
          <div class="flex gap-2">
            <button
              @click="exportReport"
              class="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Export
            </button>
            <button
              @click="printReport"
              class="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      <!-- Leave Summary Report -->
      <div v-if="selectedReportType === 'leave-summary'" class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Leave by Type Chart -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-800 mb-4">Leave by Type</h4>
            <canvas ref="leaveTypeChart"></canvas>
          </div>
          
          <!-- Leave by Department Chart -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-800 mb-4">Leave by Department</h4>
            <canvas ref="departmentChart"></canvas>
          </div>
        </div>

        <!-- Summary Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Leaves</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sick Leave</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vacation</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Personal</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Others</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="dept in leaveSummaryData" :key="dept.department">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ dept.department }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.total }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.sick }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.vacation }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.personal }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.others }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Attendance Report -->
      <div v-else-if="selectedReportType === 'attendance'" class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-green-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-green-800 mb-2">Overall Attendance Rate</h4>
            <p class="text-3xl font-bold text-green-900">94.5%</p>
            <p class="text-sm text-green-600 mt-1">↑ 2.3% from last month</p>
          </div>
          
          <div class="bg-yellow-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-yellow-800 mb-2">Late Arrivals</h4>
            <p class="text-3xl font-bold text-yellow-900">127</p>
            <p class="text-sm text-yellow-600 mt-1">↓ 5.1% from last month</p>
          </div>
          
          <div class="bg-red-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-red-800 mb-2">Absenteeism Rate</h4>
            <p class="text-3xl font-bold text-red-900">3.2%</p>
            <p class="text-sm text-red-600 mt-1">↓ 0.8% from last month</p>
          </div>
        </div>

        <!-- Attendance Trend Chart -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 class="text-md font-semibold text-gray-800 mb-4">Monthly Attendance Trend</h4>
          <canvas ref="attendanceTrendChart"></canvas>
        </div>

        <!-- Department Attendance Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Faculty</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present Days</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late Days</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent Days</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="dept in attendanceData" :key="dept.department">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ dept.department }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.totalFaculty }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.presentDays }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.lateDays }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.absentDays }}</td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getAttendanceRateClass(dept.attendanceRate)">
                    {{ dept.attendanceRate }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Faculty Performance Report -->
      <div v-else-if="selectedReportType === 'faculty-performance'" class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Top Performers -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-800 mb-4">Top Performers (Best Attendance)</h4>
            <div class="space-y-3">
              <div v-for="(faculty, index) in topPerformers" :key="faculty.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ faculty.name }}</p>
                    <p class="text-xs text-gray-500">{{ faculty.department }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-green-600">{{ faculty.attendanceRate }}%</p>
                  <p class="text-xs text-gray-500">{{ faculty.presentDays }} days</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Areas of Concern -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-gray-800 mb-4">Areas of Concern</h4>
            <div class="space-y-3">
              <div v-for="faculty in concernAreas" :key="faculty.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                    !
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ faculty.name }}</p>
                    <p class="text-xs text-gray-500">{{ faculty.department }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-red-600">{{ faculty.attendanceRate }}%</p>
                  <p class="text-xs text-gray-500">{{ faculty.absentDays }} absent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Distribution -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-md font-semibold text-gray-800 mb-4">Performance Distribution</h4>
          <canvas ref="performanceChart"></canvas>
        </div>
      </div>

      <!-- Leave Credits Report -->
      <div v-else-if="selectedReportType === 'leave-credits'" class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-blue-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-blue-800 mb-2">Total Sick Leave Credits</h4>
            <p class="text-2xl font-bold text-blue-900">780</p>
            <p class="text-sm text-blue-600 mt-1">156 faculty × 5 days</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-green-800 mb-2">Total Vacation Credits</h4>
            <p class="text-2xl font-bold text-green-900">1,560</p>
            <p class="text-sm text-green-600 mt-1">156 faculty × 10 days</p>
          </div>
          
          <div class="bg-yellow-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-yellow-800 mb-2">Total Personal Credits</h4>
            <p class="text-2xl font-bold text-yellow-900">468</p>
            <p class="text-sm text-yellow-600 mt-1">156 faculty × 3 days</p>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-4">
            <h4 class="text-md font-semibold text-purple-800 mb-2">Credits Used This Month</h4>
            <p class="text-2xl font-bold text-purple-900">87</p>
            <p class="text-sm text-purple-600 mt-1">5.6% of total credits</p>
          </div>
        </div>

        <!-- Credits Usage Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Credits</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage Rate</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="dept in creditsData" :key="dept.department">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ dept.department }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.totalCredits }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.used }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ dept.available }}</td>
                <td class="px-6 py-4 text-sm">
                  <div class="flex items-center">
                    <div class="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-blue-600 h-2 rounded-full"
                        :style="{ width: dept.usageRate + '%' }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600">{{ dept.usageRate }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  FileText,
  Users,
  Calendar,
  TrendingUp,
  CreditCard
} from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
)

const selectedReportType = ref('leave-summary')
const dateRange = ref({
  start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const reportTypes = [
  {
    id: 'leave-summary',
    name: 'Leave Summary',
    description: 'Comprehensive leave statistics',
    icon: FileText,
    iconColor: 'text-blue-600'
  },
  {
    id: 'attendance',
    name: 'Attendance Report',
    description: 'Faculty attendance patterns',
    icon: Users,
    iconColor: 'text-green-600'
  },
  {
    id: 'faculty-performance',
    name: 'Faculty Performance',
    description: 'Individual performance metrics',
    icon: TrendingUp,
    iconColor: 'text-purple-600'
  },
  {
    id: 'leave-credits',
    name: 'Leave Credits',
    description: 'Credit usage and availability',
    icon: CreditCard,
    iconColor: 'text-yellow-600'
  }
]

const leaveSummaryData = [
  { department: 'Computer Science', total: 45, sick: 12, vacation: 25, personal: 5, others: 3 },
  { department: 'Mathematics', total: 38, sick: 10, vacation: 20, personal: 6, others: 2 },
  { department: 'English', total: 32, sick: 8, vacation: 18, personal: 4, others: 2 },
  { department: 'Science', total: 41, sick: 15, vacation: 20, personal: 4, others: 2 }
]

const attendanceData = [
  { department: 'Computer Science', totalFaculty: 45, presentDays: 1205, lateDays: 89, absentDays: 31, attendanceRate: 95.2 },
  { department: 'Mathematics', totalFaculty: 38, presentDays: 1012, lateDays: 76, absentDays: 28, attendanceRate: 94.8 },
  { department: 'English', totalFaculty: 32, presentDays: 845, lateDays: 58, absentDays: 22, attendanceRate: 94.1 },
  { department: 'Science', totalFaculty: 41, presentDays: 1089, lateDays: 92, absentDays: 35, attendanceRate: 93.5 }
]

const topPerformers = [
  { id: '1', name: 'John Smith', department: 'Computer Science', attendanceRate: 98.5, presentDays: 148 },
  { id: '2', name: 'Sarah Johnson', department: 'Mathematics', attendanceRate: 97.8, presentDays: 147 },
  { id: '3', name: 'Mike Davis', department: 'English', attendanceRate: 97.2, presentDays: 146 }
]

const concernAreas = [
  { id: '4', name: 'Emily Brown', department: 'Science', attendanceRate: 85.3, absentDays: 12 },
  { id: '5', name: 'David Wilson', department: 'Computer Science', attendanceRate: 87.1, absentDays: 10 }
]

const creditsData = [
  { department: 'Computer Science', totalCredits: 810, used: 87, available: 723, usageRate: 10.7 },
  { department: 'Mathematics', totalCredits: 684, used: 72, available: 612, usageRate: 10.5 },
  { department: 'English', totalCredits: 576, used: 58, available: 518, usageRate: 10.1 },
  { department: 'Science', totalCredits: 738, used: 85, available: 653, usageRate: 11.5 }
]

const getCurrentReportName = () => {
  const report = reportTypes.find(r => r.id === selectedReportType.value)
  return report ? report.name : 'Report'
}

const getAttendanceRateClass = (rate: number) => {
  if (rate >= 95) return 'bg-green-100 text-green-800'
  if (rate >= 90) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const setQuickDateRange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const value = select.value
  const today = new Date()
  let start = new Date()
  
  switch (value) {
    case 'today':
      start = today
      break
    case 'week':
      start.setDate(today.getDate() - 7)
      break
    case 'month':
      start = new Date(today.getFullYear(), today.getMonth(), 1)
      break
    case 'quarter':
      start = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
      break
    case 'year':
      start = new Date(today.getFullYear(), 0, 1)
      break
  }
  
  if (value) {
    dateRange.value.start = start.toISOString().split('T')[0]
    dateRange.value.end = today.toISOString().split('T')[0]
  }
}

const generateCustomReport = () => {
  console.log('Generate custom report')
}

const exportReport = () => {
  console.log('Export report')
}

const printReport = () => {
  window.print()
}

onMounted(async () => {
  await nextTick()
  // Initialize charts here
  console.log('Charts would be initialized here')
})
</script>
