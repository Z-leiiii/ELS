<template>
  <div class="p-6">
    <!-- Admin Dashboard -->
    <div v-if="userRole === 'ADAS'" class="space-y-6">
      <!-- Admin Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div 
          @click="showAnalytics('faculty')" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer hover:scale-105 transition-transform"
        >
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <Users class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Faculty</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ totalFaculty }}</p>
            </div>
          </div>
        </div>
        
        <div 
          @click="showAnalytics('applications')" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer hover:scale-105 transition-transform"
        >
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <FileCheck class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Pending Applications</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ pendingApplications }}</p>
            </div>
          </div>
        </div>
        
        <div 
          @click="showAnalytics('leave')" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer hover:scale-105 transition-transform"
        >
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <Calendar class="w-6 h-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">On Leave Today</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ onLeaveToday }}</p>
            </div>
          </div>
        </div>
        
        <div 
          @click="showAnalytics('absent')" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer hover:scale-105 transition-transform"
        >
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
              <AlertCircle class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Absent Today</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ absentToday }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Leave Applications</h3>
        <div class="space-y-3">
          <div v-for="app in recentApplications" :key="app.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {{ app.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ app.name }} - {{ app.type }}</p>
                <p class="text-xs text-gray-500">{{ app.duration }} - {{ app.status }}</p>
              </div>
            </div>
            <span class="text-xs text-gray-500">{{ app.time }}</span>
          </div>
        </div>
      </div>

      <!-- Faculty Attendance Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Faculty Attendance Overview</h3>
          <canvas ref="attendanceChart" class="h-64"></canvas>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Department Statistics</h3>
          <div class="space-y-3">
            <div v-for="dept in departmentStats" :key="dept.name" class="flex items-center justify-between">
              <span class="text-sm text-gray-600">{{ dept.name }}</span>
              <span class="text-sm font-medium text-gray-900">{{ dept.count }} faculty</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Modal -->
      <div v-if="showAnalyticsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-lg bg-white max-h-[80vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">{{ analyticsTitle }}</h3>
            <button @click="showAnalyticsModal = false" class="text-gray-400 hover:text-gray-600">
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <div class="space-y-6">
            <!-- Analytics Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 rounded-lg p-4">
                <p class="text-sm text-gray-500">{{ analyticsSummary.label1 }}</p>
                <p class="text-2xl font-bold text-blue-800">{{ analyticsSummary.value1 }}</p>
              </div>
              <div class="bg-green-50 rounded-lg p-4">
                <p class="text-sm text-gray-500">{{ analyticsSummary.label2 }}</p>
                <p class="text-2xl font-bold text-green-800">{{ analyticsSummary.value2 }}</p>
              </div>
              <div class="bg-purple-50 rounded-lg p-4">
                <p class="text-sm text-gray-500">{{ analyticsSummary.label3 }}</p>
                <p class="text-2xl font-bold text-purple-800">{{ analyticsSummary.value3 }}</p>
              </div>
            </div>
            
            <!-- Line Graph -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-4">{{ analyticsChartTitle }}</h4>
              <canvas ref="analyticsChart" class="h-80"></canvas>
            </div>
            
            <!-- Detailed Statistics -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-4">Detailed Statistics</h4>
              <div class="space-y-3">
                <div v-for="(stat, index) in analyticsDetails" :key="index" class="flex items-center justify-between p-3 bg-white rounded">
                  <span class="text-sm text-gray-700">{{ stat.label }}</span>
                  <span class="text-sm font-medium text-gray-900">{{ stat.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Faculty Dashboard -->
    <div v-else class="space-y-6">
      <!-- Mood Rating Section -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        
        <!-- Rating Options -->
        <div class="flex justify-center gap-4 mb-6">
          <button
            v-for="option in moodOptions"
            :key="option.value"
            @click="submitMoodRating(option.value)"
            :class="[
              'flex flex-col items-center p-4 rounded-xl transition-all duration-200 hover:scale-110',
              userMoodRating === option.value ? 'ring-4 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            ]"
            :disabled="hasRatedToday"
          >
            <span class="text-5xl mb-2 filter drop-shadow-lg saturate-200 brightness-125 hue-rotate-10">{{ option.emoji }}</span>
            <span class="text-xs text-center text-gray-600 font-medium">{{ option.label }}</span>
          </button>
        </div>

        <!-- User's Current Rating -->
        <div v-if="userMoodRating" class="text-center text-sm text-gray-500 mb-4">
          <span>You rated: </span>
          <span class="font-semibold">{{ moodOptions.find(m => m.value === userMoodRating)?.label }}</span>
          <span class="ml-2">({{ moodOptions.find(m => m.value === userMoodRating)?.emoji }})</span>
        </div>

        <!-- Faculty Mood Overview -->
        <div class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Faculty Mood Overview</h4>
          
          <!-- Rating Counts -->
          <div class="grid grid-cols-5 gap-2 mb-4">
            <div
              v-for="option in moodOptions"
              :key="option.value"
              class="text-center p-2 rounded-lg bg-gray-50"
            >
              <span class="text-3xl filter drop-shadow-md saturate-200 brightness-125 hue-rotate-10">{{ option.emoji }}</span>
              <p class="text-lg font-bold text-gray-900">{{ getMoodCount(option.value) }}</p>
              <p class="text-xs text-gray-500">{{ option.label.split(' ')[0] }}</p>
            </div>
          </div>

          <!-- Recent Ratings -->
          <div v-if="recentMoodRatings.length > 0" class="mt-4">
            <h5 class="text-xs font-medium text-gray-500 mb-2">Recent Ratings</h5>
            <div class="space-y-2 max-h-32 overflow-y-auto">
              <div
                v-for="rating in recentMoodRatings.slice(0, 5)"
                :key="rating.id"
                class="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
              >
                <div class="flex items-center">
                  <span class="text-xl mr-2">{{ moodOptions.find(m => m.value === rating.mood)?.emoji }}</span>
                  <span class="text-gray-700">{{ rating.userName }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ formatTime(rating.timestamp) }}</span>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center text-sm text-gray-400 mt-4">
            No ratings yet. Be the first to share how you're feeling!
          </div>
        </div>
      </div>

      <!-- Personal Leave Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <FileText class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Leaves Filed This Year</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ annualLeavesFiled }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <CheckCircle class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Leave Credits</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ leaveCredits }} days</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
              <AlertCircle class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Absences This Year</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ annualAbsences }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <Calendar class="w-6 h-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Most Common Leave Type</h3>
              <p class="text-2xl font-semibold text-gray-900">{{ mostCommonLeaveType }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Type Breakdown -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Leave Types Filed This Year</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="leaveType in leaveTypesBreakdown" :key="leaveType.type" class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ leaveType.type }}</p>
                <p class="text-xs text-gray-500">{{ leaveType.count }} applications</p>
              </div>
              <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="leaveType.colorClass">
                <span class="text-white font-semibold">{{ leaveType.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Credits Breakdown -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Leave Credits Breakdown</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Vacation Leave</p>
            <p class="text-2xl font-bold text-blue-800">{{ leaveCreditsBreakdown.vacation }} days</p>
          </div>
          <div class="bg-green-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Sick Leave</p>
            <p class="text-2xl font-bold text-green-800">{{ leaveCreditsBreakdown.sick }} days</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Maternity Leave</p>
            <p class="text-2xl font-bold text-purple-800">{{ leaveCreditsBreakdown.maternity }} days</p>
          </div>
          <div class="bg-orange-50 rounded-lg p-4">
            <p class="text-sm text-gray-500">Paternity Leave</p>
            <p class="text-2xl font-bold text-orange-800">{{ leaveCreditsBreakdown.paternity }} days</p>
          </div>
        </div>
      </div>

      <!-- Absence History -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Absence History This Year</h3>
        <div class="space-y-3">
          <div v-for="(absence, index) in absenceHistory" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full mr-3" :class="absence.colorClass"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ absence.date }}</p>
                <p class="text-xs text-gray-500">{{ absence.reason }}</p>
              </div>
            </div>
            <span class="text-xs text-gray-500">{{ absence.duration }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  Users,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  X
} from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const router = useRouter()
const userRole = ref<'ADAS' | 'Faculty'>(localStorage.getItem('userRole') === 'ADAS' ? 'ADAS' : 'Faculty')

// Mood Rating Types
interface MoodRating {
  id: string
  userId: string
  userName: string
  mood: number
  timestamp: number
}

// Mood Rating Options
const moodOptions = [
  { value: 5, emoji: '😊', label: 'I am very happy' },
  { value: 4, emoji: '🙂', label: 'I am ok' },
  { value: 3, emoji: '😐', label: 'Just fine' },
  { value: 2, emoji: '😟', label: 'I am stressed' },
  { value: 1, emoji: '😢', label: 'I am very stressed' }
]

// Mood Rating State
const userMoodRating = ref<number | null>(null)
const recentMoodRatings = ref<MoodRating[]>([])
const currentUserId = ref<string>(localStorage.getItem('userId') || 'user-' + Date.now())

// Check if user has rated today
const hasRatedToday = ref(false)

// Load mood ratings from localStorage
const loadMoodRatings = () => {
  const stored = localStorage.getItem('moodRatings')
  if (stored) {
    recentMoodRatings.value = JSON.parse(stored)
  }
  
  // Check if current user has rated today
  const today = new Date().toDateString()
  const userRating = recentMoodRatings.value.find(
    r => r.userId === currentUserId.value && new Date(r.timestamp).toDateString() === today
  )
  
  if (userRating) {
    userMoodRating.value = userRating.mood
    hasRatedToday.value = true
  } else {
    hasRatedToday.value = false
  }
}

// Submit mood rating
const submitMoodRating = (mood: number) => {
  if (hasRatedToday.value) return
  
  const newRating: MoodRating = {
    id: Date.now().toString(),
    userId: currentUserId.value,
    userName: localStorage.getItem('userName') || 'Faculty Member',
    mood,
    timestamp: Date.now()
  }
  
  recentMoodRatings.value.unshift(newRating)
  localStorage.setItem('moodRatings', JSON.stringify(recentMoodRatings.value))
  
  userMoodRating.value = mood
  hasRatedToday.value = true
}

// Get count for specific mood
const getMoodCount = (moodValue: number) => {
  return recentMoodRatings.value.filter(r => r.mood === moodValue).length
}

// Format timestamp
const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
  return `${Math.floor(diff / 86400000)} days ago`
}

const activeUsersChart = ref<HTMLCanvasElement>()
const quarterlyChart = ref<HTMLCanvasElement>()
const leaveHistoryChart = ref<HTMLCanvasElement>()
const analyticsChart = ref<HTMLCanvasElement>()

// Analytics Modal State
const showAnalyticsModal = ref(false)
const analyticsTitle = ref('')
const analyticsChartTitle = ref('')
const analyticsSummary = ref({
  label1: '',
  value1: '',
  label2: '',
  value2: '',
  label3: '',
  value3: ''
})
const analyticsDetails = ref<Array<{ label: string; value: string }>>([])

// Analytics Data for Each Metric
const analyticsData = {
  faculty: {
    title: 'Total Faculty Analytics',
    chartTitle: 'Faculty Growth Over Time',
    summary: {
      label1: 'Total Faculty',
      value1: '45',
      label2: 'New Hires (This Month)',
      value2: '3',
      label3: 'Departures (This Month)',
      value3: '1'
    },
    details: [
      { label: 'Computer Science Department', value: '15 faculty' },
      { label: 'Mathematics Department', value: '12 faculty' },
      { label: 'English Department', value: '10 faculty' },
      { label: 'Science Department', value: '8 faculty' },
      { label: 'Active Faculty', value: '42 faculty' },
      { label: 'On Leave', value: '3 faculty' }
    ],
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [40, 42, 43, 44, 45, 45]
    }
  },
  applications: {
    title: 'Pending Applications Analytics',
    chartTitle: 'Applications Over Time',
    summary: {
      label1: 'Pending Applications',
      value1: '12',
      label2: 'Approved (This Month)',
      value2: '8',
      label3: 'Rejected (This Month)',
      value3: '3'
    },
    details: [
      { label: 'Vacation Leave Applications', value: '5 pending' },
      { label: 'Sick Leave Applications', value: '4 pending' },
      { label: 'Personal Leave Applications', value: '2 pending' },
      { label: 'Emergency Leave Applications', value: '1 pending' },
      { label: 'Average Processing Time', value: '2.5 days' },
      { label: 'Approval Rate', value: '73%' }
    ],
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [8, 10, 12, 9, 11, 12]
    }
  },
  leave: {
    title: 'On Leave Today Analytics',
    chartTitle: 'Leave Trends This Month',
    summary: {
      label1: 'On Leave Today',
      value1: '8',
      label2: 'Vacation Leave',
      value2: '5',
      label3: 'Sick Leave',
      value3: '3'
    },
    details: [
      { label: 'Vacation Leave', value: '5 faculty' },
      { label: 'Sick Leave', value: '3 faculty' },
      { label: 'Average Leave Duration', value: '3.2 days' },
      { label: 'Leave Requests This Month', value: '15' },
      { label: 'Approved Leaves', value: '12' },
      { label: 'Pending Leaves', value: '3' }
    ],
    chartData: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [6, 8, 5, 8]
    }
  },
  absent: {
    title: 'Absent Today Analytics',
    chartTitle: 'Absenteeism Trends This Month',
    summary: {
      label1: 'Absent Today',
      value1: '3',
      label2: 'Unexcused Absences',
      value2: '1',
      label3: 'Excused Absences',
      value3: '2'
    },
    details: [
      { label: 'Unexcused Absences', value: '1 faculty' },
      { label: 'Medical Excuses', value: '1 faculty' },
      { label: 'Family Emergency', value: '1 faculty' },
      { label: 'Absenteeism Rate', value: '6.7%' },
      { label: 'Total Absences This Month', value: '12' },
      { label: 'Average Attendance Rate', value: '93.3%' }
    ],
    chartData: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [4, 3, 2, 3]
    }
  }
}

const showAnalytics = (type: string) => {
  const data = analyticsData[type as keyof typeof analyticsData]
  analyticsTitle.value = data.title
  analyticsChartTitle.value = data.chartTitle
  analyticsSummary.value = data.summary
  analyticsDetails.value = data.details
  showAnalyticsModal.value = true
  
  // Render chart after modal is shown
  nextTick(() => {
    renderAnalyticsChart(data.chartData)
  })
}

const renderAnalyticsChart = (chartData: { labels: string[]; data: number[] }) => {
  if (analyticsChart.value) {
    // Destroy existing chart if it exists
    const existingChart = ChartJS.getChart(analyticsChart.value)
    if (existingChart) {
      existingChart.destroy()
    }
    
    new ChartJS(analyticsChart.value, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Count',
          data: chartData.data,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }
}

const navigateToLeaves = () => {
  router.push('/leaves')
}

// Admin Dashboard Properties
const totalFaculty = ref(45)
const pendingApplications = ref(12)
const onLeaveToday = ref(8)
const absentToday = ref(3)

// Faculty Dashboard Properties
const annualLeavesFiled = ref(8)
const leaveCredits = ref(15)
const annualAbsences = ref(3)
const mostCommonLeaveType = ref('Vacation')

// Leave Types Breakdown
const leaveTypesBreakdown = ref([
  { type: 'Vacation Leave', count: 4, colorClass: 'bg-blue-500' },
  { type: 'Sick Leave', count: 2, colorClass: 'bg-green-500' },
  { type: 'Personal Leave', count: 1, colorClass: 'bg-purple-500' },
  { type: 'Emergency Leave', count: 1, colorClass: 'bg-red-500' }
])

// Leave Credits Breakdown
const leaveCreditsBreakdown = ref({
  vacation: 10,
  sick: 3,
  maternity: 1,
  paternity: 1
})

// Absence History
const absenceHistory = ref([
  { date: 'May 6, 2024', reason: 'Medical Appointment', duration: '1 day', colorClass: 'bg-yellow-500' },
  { date: 'April 15, 2024', reason: 'Family Emergency', duration: '1 day', colorClass: 'bg-red-500' },
  { date: 'March 22, 2024', reason: 'Sick Leave', duration: '1 day', colorClass: 'bg-yellow-500' }
])

// Admin Dashboard Data
const recentApplications = ref([
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'Sick Leave',
    duration: '2 days',
    status: 'Approved',
    time: '2 hours ago'
  },
  {
    id: '2',
    name: 'Mike Davis',
    type: 'Personal Leave',
    duration: '1 day',
    status: 'Rejected',
    time: '6 hours ago'
  },
  {
    id: '3',
    name: 'Emily Chen',
    type: 'Vacation Leave',
    duration: '5 days',
    status: 'Pending',
    time: '1 day ago'
  }
])

const departmentStats = ref([
  { name: 'Computer Science', count: 15 },
  { name: 'Mathematics', count: 12 },
  { name: 'English', count: 10 },
  { name: 'Science', count: 8 }
])

onMounted(async () => {
  await nextTick()
  
  // Load mood ratings
  loadMoodRatings()
  
  if (userRole.value === 'ADAS') {
    // Active Users Chart
    if (activeUsersChart.value) {
      new ChartJS(activeUsersChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Active Users',
            data: [120, 135, 125, 140, 130, 145],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }

    // Quarterly Chart
    if (quarterlyChart.value) {
      new ChartJS(quarterlyChart.value, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Leave Applications',
            data: [45, 52, 38, 65],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }
  } else {
    // Faculty Leave History Chart
    if (leaveHistoryChart.value) {
      new ChartJS(leaveHistoryChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Sick Leave', 'Vacation Leave', 'Personal Leave', 'Maternity Leave'],
          datasets: [{
            data: [2, 1, 1, 1],
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(251, 191, 36, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      })
    }
  }
})
</script>
