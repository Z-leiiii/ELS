<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Submitted Leave Applications</h2>
        <p class="text-sm text-gray-600 mt-1">Review and manage faculty leave applications</p>
      </div>

      <!-- Filter Tabs -->
      <div class="px-6 py-3 border-b border-gray-200">
        <div class="flex space-x-4">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              activeTab === tab.key
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ tab.label }}
            <span :class="[
              'ml-2 px-2 py-1 text-xs rounded-full',
              tab.countClass
            ]">
              {{ getTabCount(tab.key) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Applications List -->
      <div class="p-6">
        <div v-if="filteredApplications.length === 0" class="text-center py-8">
          <div class="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p class="mt-1 text-sm text-gray-500">No leave applications have been submitted yet.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="application in filteredApplications"
            :key="application.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ application.lastName }}, {{ application.firstName }} {{ application.middleName }}
                  </h3>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusClass(application.status)
                  ]">
                    {{ application.status }}
                  </span>
                </div>
                
                <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span class="font-medium">Office:</span> {{ application.office }}
                  </div>
                  <div>
                    <span class="font-medium">Position:</span> {{ application.position }}
                  </div>
                  <div>
                    <span class="font-medium">Date Filed:</span> {{ formatDate(application.dateOfFiling) }}
                  </div>
                  <div>
                    <span class="font-medium">Leave Type:</span> {{ getLeaveType(application.leaveType) }}
                  </div>
                  <div>
                    <span class="font-medium">Days Applied:</span> {{ application.numberOfDays }}
                  </div>
                  <div>
                    <span class="font-medium">Inclusive Dates:</span> {{ application.inclusiveDates }}
                  </div>
                </div>

                <div v-if="application.attachments && application.attachments.length > 0" class="mt-3">
                  <span class="text-sm font-medium text-gray-700">Attachments:</span>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="(attachment, index) in application.attachments"
                      :key="index"
                      class="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                      </svg>
                      {{ attachment.name }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col space-y-2 ml-4">
                <button
                  @click="viewApplication(application)"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Details
                </button>
                <button
                  @click="downloadApplication(application)"
                  class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download PDF
                </button>
                <button
                  v-if="application.status === 'Pending'"
                  @click="updateStatus(application.id, 'Approved')"
                  class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  v-if="application.status === 'Pending'"
                  @click="updateStatus(application.id, 'Rejected')"
                  class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-medium text-gray-900">Leave Application Details</h3>
          <button
            @click="showDetailModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedApplication" class="space-y-6">
          <!-- Applicant Information -->
          <div class="border border-gray-300 p-4">
            <h4 class="text-sm font-bold mb-3">Applicant Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Office:</strong> {{ selectedApplication.office }}</div>
              <div><strong>Name:</strong> {{ selectedApplication.lastName }}, {{ selectedApplication.firstName }} {{ selectedApplication.middleName }}</div>
              <div><strong>Date of Filing:</strong> {{ formatDate(selectedApplication.dateOfFiling) }}</div>
              <div><strong>Position:</strong> {{ selectedApplication.position }}</div>
              <div><strong>Salary:</strong> {{ selectedApplication.salary }}</div>
              <div><strong>Status:</strong> <span :class="getStatusClass(selectedApplication.status)">{{ selectedApplication.status }}</span></div>
            </div>
          </div>

          <!-- Leave Details -->
          <div class="border border-gray-300 p-4">
            <h4 class="text-sm font-bold mb-3">Leave Details</h4>
            <div class="space-y-2 text-sm">
              <div><strong>Type of Leave:</strong> {{ getLeaveType(selectedApplication.leaveType) }}</div>
              <div><strong>Number of Days:</strong> {{ selectedApplication.numberOfDays }}</div>
              <div><strong>Inclusive Dates:</strong> {{ selectedApplication.inclusiveDates }}</div>
              <div><strong>Commutation:</strong> {{ selectedApplication.commutation.requested ? 'Requested' : 'Not Requested' }}</div>
              <div><strong>Applicant Signature:</strong> {{ selectedApplication.applicantSignature }}</div>
            </div>
          </div>

          <!-- Attachments -->
          <div v-if="selectedApplication.attachments && selectedApplication.attachments.length > 0" class="border border-gray-300 p-4">
            <h4 class="text-sm font-bold mb-3">Supporting Documents</h4>
            <div class="space-y-2">
              <div v-for="(attachment, index) in selectedApplication.attachments" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span class="text-sm">{{ attachment.name }} ({{ formatFileSize(attachment.size) }})</span>
                <button class="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button
              @click="downloadApplication(selectedApplication)"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </button>
            <button
              v-if="selectedApplication.status === 'Pending'"
              @click="updateStatus(selectedApplication.id, 'Approved')"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              v-if="selectedApplication.status === 'Pending'"
              @click="updateStatus(selectedApplication.id, 'Rejected')"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface Attachment {
  name: string
  size: number
  file?: File
}

interface LeaveApplication {
  id: string
  office: string
  lastName: string
  firstName: string
  middleName: string
  dateOfFiling: string
  position: string
  salary: string
  leaveType: any
  leaveDetails: any
  numberOfDays: string
  inclusiveDates: string
  commutation: any
  applicantSignature: string
  attachments: Attachment[]
  submittedAt: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'On PR'
}

const applications = ref<LeaveApplication[]>([])
const activeTab = ref('all')
const showDetailModal = ref(false)
const selectedApplication = ref<LeaveApplication | null>(null)

const tabs = [
  { key: 'all', label: 'All Applications', countClass: 'bg-gray-100 text-gray-800' },
  { key: 'pending', label: 'Pending', countClass: 'bg-yellow-100 text-yellow-800' },
  { key: 'approved', label: 'Approved', countClass: 'bg-green-100 text-green-800' },
  { key: 'rejected', label: 'Rejected', countClass: 'bg-red-100 text-red-800' }
]

const filteredApplications = computed(() => {
  if (activeTab.value === 'all') {
    return applications.value
  }
  return applications.value.filter(app => app.status.toLowerCase() === activeTab.value.toLowerCase())
})

const getTabCount = (tabKey: string) => {
  if (tabKey === 'all') {
    return applications.value.length
  }
  return applications.value.filter(app => app.status.toLowerCase() === tabKey.toLowerCase()).length
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Approved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'On PR': 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getLeaveType = (leaveType: any) => {
  for (const [key, value] of Object.entries(leaveType)) {
    if (key === 'others' && value) {
      return value
    }
    if (value === true) {
      return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
    }
  }
  return 'Not specified'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const viewApplication = (application: LeaveApplication) => {
  selectedApplication.value = application
  showDetailModal.value = true
}

const downloadApplication = async (application: LeaveApplication) => {
  try {
    // Create a temporary div with the application data
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.width = '210mm'
    tempDiv.style.padding = '20px'
    tempDiv.style.backgroundColor = 'white'
    tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 18px; font-weight: bold;">Civil Service Form No. 6, Revised 2020</h1>
        <h2 style="font-size: 16px; font-weight: bold;">Republic of the Philippines</h2>
        <h3 style="font-size: 14px; font-weight: bold;">Department of Education</h3>
        <p style="font-size: 12px;">Region 02 - Cagayan Valley</p>
        <p style="font-size: 12px;">Schools Division Office of Isabela</p>
        <h4 style="font-size: 16px; font-weight: bold; margin-top: 10px;">APPLICATION FOR LEAVE</h4>
      </div>
      
      <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px;">
        <div style="margin-bottom: 10px;">
          <strong>1. OFFICE/DEPARTMENT:</strong> ${application.office}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>2. NAME:</strong> ${application.lastName}, ${application.firstName} ${application.middleName}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>3. DATE OF FILING:</strong> ${formatDate(application.dateOfFiling)}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>4. POSITION:</strong> ${application.position}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>5. SALARY:</strong> ${application.salary}
        </div>
      </div>
      
      <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px;">
        <h5 style="font-weight: bold; margin-bottom: 10px;">6. DETAILS OF APPLICATION</h5>
        <div style="margin-bottom: 10px;">
          <strong>6.A TYPE OF LEAVE:</strong> ${getLeaveType(application.leaveType)}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>6.C NUMBER OF WORKING DAYS:</strong> ${application.numberOfDays}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>INCLUSIVE DATES:</strong> ${application.inclusiveDates}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>6.D COMMUTATION:</strong> ${application.commutation?.requested ? 'Requested' : 'Not Requested'}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Signature:</strong> ${application.applicantSignature}
        </div>
      </div>
      
      <div style="margin-top: 30px; text-align: right;">
        <p style="font-size: 12px; color: #666;">Status: ${application.status}</p>
        <p style="font-size: 12px; color: #666;">Submitted: ${formatDate(application.submittedAt)}</p>
      </div>
    `
    
    document.body.appendChild(tempDiv)
    
    const canvas = await html2canvas(tempDiv, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    
    const pdf = new jsPDF()
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    pdf.save(`leave-application-${application.lastName}-${application.id}.pdf`)
    
    // Clean up
    document.body.removeChild(tempDiv)
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}

const updateStatus = (applicationId: string, newStatus: 'Approved' | 'Rejected') => {
  const applicationIndex = applications.value.findIndex(app => app.id === applicationId)
  if (applicationIndex !== -1) {
    applications.value[applicationIndex]!.status = newStatus
    
    // Update localStorage
    const storedApplications = JSON.parse(localStorage.getItem('leaveApplications') || '[]')
    const storedIndex = storedApplications.findIndex((app: LeaveApplication) => app.id === applicationId)
    if (storedIndex !== -1) {
      storedApplications[storedIndex]!.status = newStatus
      localStorage.setItem('leaveApplications', JSON.stringify(storedApplications))
    }
  }
  
  showDetailModal.value = false
}

const loadApplications = () => {
  const storedApplications = JSON.parse(localStorage.getItem('leaveApplications') || '[]')
  
  // Add mock application if no applications exist
  if (storedApplications.length === 0) {
    const mockApplication = {
      id: 'mock-001',
      submittedAt: new Date().toISOString(),
      status: 'Pending' as 'Pending' | 'Approved' | 'Rejected' | 'On PR',
      office: 'Schools Division Office of Isabela',
      lastName: 'Smith',
      firstName: 'John',
      middleName: 'Doe',
      dateOfFiling: '2024-05-09',
      position: 'Teacher I',
      salary: '25000',
      leaveType: {
        vacation: true,
        mandatory: false,
        sick: false,
        maternity: false,
        paternity: false,
        specialPrivilege: false,
        soloParent: false,
        study: false,
        vawc: false,
        rehabilitation: false,
        specialWomen: false,
        emergency: false,
        adoption: false,
        others: ''
      },
      leaveDetails: {
        vacation: {
          withinPhilippines: true,
          withinPhilippinesLocation: 'Baguio City',
          abroad: false,
          abroadLocation: ''
        },
        sick: {
          inHospital: false,
          illness: '',
          outPatient: false,
          outPatientIllness: ''
        },
        specialWomenIllness: '',
        study: {
          completionMasters: false,
          barBoardReview: false
        },
        other: {
          monetization: false,
          terminal: false
        }
      },
      numberOfDays: '3',
      inclusiveDates: 'May 15-17, 2024',
      commutation: {
        notRequested: true,
        requested: false
      },
      applicantSignature: 'John Doe Smith',
      attachments: [],
      certification: {
        asOf: 'May 9, 2024',
        vacation: {
          totalEarned: '10',
          lessApplication: '3',
          balance: '7'
        },
        sick: {
          totalEarned: '5',
          lessApplication: '0',
          balance: '5'
        }
      },
      recommendation: {
        forApproval: true,
        forDisapproval: false,
        disapprovalReason: ''
      },
      approved: {
        withPay: false,
        withPayDays: '',
        withoutPay: false,
        withoutPayDays: '',
        others: false,
        othersSpecify: ''
      },
      disapprovedReason: ''
    }
    
    applications.value = [mockApplication]
  } else {
    applications.value = storedApplications
  }
}

onMounted(() => {
  loadApplications()
})
</script>
