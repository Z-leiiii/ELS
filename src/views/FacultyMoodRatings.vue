<template>
  <div class="p-6">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Faculty Mood Ratings</h1>
        <button @click="loadMoodRatings" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Refresh
        </button>
      </div>

      <!-- Overall Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          v-for="option in moodOptions"
          :key="option.value"
          class="bg-white rounded-xl shadow-sm p-6 text-center"
        >
          <span class="text-5xl filter drop-shadow-lg saturate-200 brightness-125 hue-rotate-10">{{ option.emoji }}</span>
          <p class="text-3xl font-bold text-gray-900 mt-2">{{ getMoodCount(option.value) }}</p>
          <p class="text-sm text-gray-500">{{ option.label }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ getMoodPercentage(option.value) }}%</p>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-sm font-medium text-gray-500">Total Ratings</h3>
          <p class="text-3xl font-bold text-blue-800">{{ totalRatings }}</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-sm font-medium text-gray-500">Average Mood Score</h3>
          <p class="text-3xl font-bold text-green-800">{{ averageMoodScore }}</p>
          <p class="text-xs text-gray-400 mt-1">out of 5</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-sm font-medium text-gray-500">Most Common Mood</h3>
          <p class="text-3xl font-bold text-purple-800">{{ mostCommonMood }}</p>
        </div>
      </div>

      <!-- Mood Distribution Chart -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Mood Distribution Over Time</h3>
        <canvas ref="moodChart" class="h-80"></canvas>
      </div>

      <!-- Recent Ratings List -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">All Mood Ratings</h3>
        
        <!-- Filter Options -->
        <div class="flex gap-4 mb-4">
          <select v-model="filterMood" class="px-4 py-2 border rounded-lg text-sm">
            <option value="">All Moods</option>
            <option v-for="option in moodOptions" :key="option.value" :value="option.value">
              {{ option.emoji }} {{ option.label }}
            </option>
          </select>
          <select v-model="filterTime" class="px-4 py-2 border rounded-lg text-sm">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <!-- Ratings Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Faculty Name</th>
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Mood Rating</th>
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Date & Time</th>
                <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Relative Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="rating in filteredRatings"
                :key="rating.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {{ rating.userName.charAt(0) }}
                    </div>
                    <span class="text-sm text-gray-900">{{ rating.userName }}</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <span class="text-2xl mr-2 filter drop-shadow saturate-200 brightness-125 hue-rotate-10">
                      {{ moodOptions.find(m => m.value === rating.mood)?.emoji }}
                    </span>
                    <span class="text-sm text-gray-600">
                      {{ moodOptions.find(m => m.value === rating.mood)?.label }}
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4 text-sm text-gray-500">{{ formatDateTime(rating.timestamp) }}</td>
                <td class="py-3 px-4 text-sm text-gray-400">{{ formatTime(rating.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredRatings.length === 0" class="text-center py-8 text-gray-400">
          No ratings found for the selected filters.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

// State
const moodRatings = ref<MoodRating[]>([])
const filterMood = ref<number | ''>('')
const filterTime = ref('all')
const moodChart = ref<HTMLCanvasElement>()

// Load mood ratings from localStorage
const loadMoodRatings = () => {
  const stored = localStorage.getItem('moodRatings')
  if (stored) {
    moodRatings.value = JSON.parse(stored)
  }
}

// Get count for specific mood
const getMoodCount = (moodValue: number) => {
  return moodRatings.value.filter(r => r.mood === moodValue).length
}

// Get percentage for specific mood
const getMoodPercentage = (moodValue: number) => {
  if (moodRatings.value.length === 0) return 0
  const count = getMoodCount(moodValue)
  return Math.round((count / moodRatings.value.length) * 100)
}

// Total ratings
const totalRatings = computed(() => moodRatings.value.length)

// Average mood score
const averageMoodScore = computed(() => {
  if (moodRatings.value.length === 0) return 0
  const sum = moodRatings.value.reduce((acc, r) => acc + r.mood, 0)
  return (sum / moodRatings.value.length).toFixed(1)
})

// Most common mood
const mostCommonMood = computed(() => {
  if (moodRatings.value.length === 0) return 'N/A'
  const counts = moodOptions.map(option => ({
    mood: option.label,
    count: getMoodCount(option.value)
  }))
  const max = counts.reduce((prev, current) => (prev.count > current.count) ? prev : current)
  return max.count > 0 ? max.mood : 'N/A'
})

// Filter ratings
const filteredRatings = computed(() => {
  let filtered = [...moodRatings.value]
  
  // Filter by mood
  if (filterMood.value !== '') {
    filtered = filtered.filter(r => r.mood === filterMood.value)
  }
  
  // Filter by time
  const now = Date.now()
  const dayMs = 86400000
  const weekMs = 7 * dayMs
  const monthMs = 30 * dayMs
  
  if (filterTime.value === 'today') {
    filtered = filtered.filter(r => now - r.timestamp < dayMs)
  } else if (filterTime.value === 'week') {
    filtered = filtered.filter(r => now - r.timestamp < weekMs)
  } else if (filterTime.value === 'month') {
    filtered = filtered.filter(r => now - r.timestamp < monthMs)
  }
  
  // Sort by timestamp (newest first)
  return filtered.sort((a, b) => b.timestamp - a.timestamp)
})

// Format timestamp
const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
  return `${Math.floor(diff / 86400000)} days ago`
}

// Format date and time
const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Render mood chart
const renderMoodChart = () => {
  if (!moodChart.value) return
  
  // Destroy existing chart if it exists
  const existingChart = ChartJS.getChart(moodChart.value)
  if (existingChart) {
    existingChart.destroy()
  }
  
  // Group ratings by date
  const ratingsByDate: Record<string, number[]> = {}
  moodRatings.value.forEach(rating => {
    const date = new Date(rating.timestamp).toLocaleDateString()
    if (!ratingsByDate[date]) {
      ratingsByDate[date] = []
    }
    ratingsByDate[date].push(rating.mood)
  })
  
  // Calculate average mood per day
  const labels = Object.keys(ratingsByDate).slice(-7) // Last 7 days
  const data = labels.map(date => {
    const moods = ratingsByDate[date] || []
    if (moods.length === 0) return '0'
    const avg = moods.reduce((a, b) => a + b, 0) / moods.length
    return avg.toFixed(1)
  })
  
  new ChartJS(moodChart.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Average Mood Score',
        data,
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
          max: 5,
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

onMounted(async () => {
  loadMoodRatings()
  await nextTick()
  renderMoodChart()
})
</script>
