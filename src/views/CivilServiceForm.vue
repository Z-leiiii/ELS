<template>
  <div class="max-w-5xl mx-auto bg-white p-6 text-[11px] text-black border-2 border-black font-serif leading-tight">

    <!-- HEADER -->
    <div class="text-center mb-2">
      <div class="flex justify-between text-[10px]">
        <div>
          Civil Service Form No. 6<br>
          Revised 2020
        </div>
        <div class="italic">Republic of the Philippines</div>
      </div>

      <h1 class="text-[16px] mt-1 font-semibold">Department of Education</h1>
      <p>Region 02 - Cagayan Valley</p>
      <p>Schools Division Office of Isabela</p>

      <h2 class="mt-2 font-bold text-[14px] border-y-2 border-black py-1 tracking-wide">
        APPLICATION FOR LEAVE
      </h2>
    </div>

    <!-- SECTION 1 -->
    <table class="w-full border-collapse border border-black">
      <tr>
        <td class="border border-black p-2 w-1/2">
          <b>1. OFFICE/DEPARTMENT</b>
          <div class="border-b border-black h-5"></div>
        </td>

        <td class="border border-black p-2">
          <b>2. NAME :</b>
          <div class="grid grid-cols-3 text-center mt-1">
            <div class="border-b border-black">(Last)</div>
            <div class="border-b border-black">(First)</div>
            <div class="border-b border-black">(Middle)</div>
          </div>
        </td>
      </tr>

      <tr>
        <td class="border border-black p-2">
          <b>3. DATE OF FILING</b>
          <div class="border-b border-black h-5"></div>
        </td>

        <td class="border border-black p-2">
          <div class="flex gap-4">
            <div class="flex-1">
              <b>4. POSITION</b>
              <div class="border-b border-black h-5"></div>
            </div>

            <div class="w-1/3">
              <b>5. SALARY</b>
              <div class="border-b border-black h-5"></div>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- SECTION 6 -->
    <div class="border-2 border-black mt-1">

      <div class="text-center font-bold border-b-2 border-black py-1">
        6. DETAILS OF APPLICATION
      </div>

      <div class="grid grid-cols-2">

        <!-- LEFT -->
        <div class="border-r border-black p-2">
          <b>6.A TYPE OF LEAVE TO BE AVAILED OF</b>

          <div class="mt-1 space-y-[2px]">
            <label><input type="checkbox"> Vacation Leave</label><br>
            <label><input type="checkbox"> Mandatory/Forced Leave</label><br>
            <label><input type="checkbox"> Sick Leave</label><br>
            <label><input type="checkbox"> Maternity Leave</label><br>
            <label><input type="checkbox"> Paternity Leave</label><br>
            <label><input type="checkbox"> Special Privilege Leave</label><br>
            <label><input type="checkbox"> Solo Parent Leave</label><br>
            <label><input type="checkbox"> Study Leave</label><br>
            <label><input type="checkbox"> 10-Day VAWC Leave</label><br>
            <label><input type="checkbox"> Rehabilitation Privilege</label><br>
            <label><input type="checkbox"> Special Leave Benefits for Women</label><br>
            <label><input type="checkbox"> Special Emergency Leave</label><br>
            <label><input type="checkbox"> Adoption Leave</label><br>

            <div class="mt-2">
              Others:
              <span class="inline-block border-b border-black w-40"></span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="p-2">
          <b>6.B DETAILS OF LEAVE</b>

          <p class="italic mt-1">In case of Vacation/Special Privilege Leave:</p>
          <label><input type="checkbox"> Within the Philippines <span class="border-b border-black inline-block w-40"></span></label><br>
          <label><input type="checkbox"> Abroad (Specify) <span class="border-b border-black inline-block w-40"></span></label>

          <p class="italic mt-2">In case of Sick Leave:</p>
          <label><input type="checkbox"> In Hospital <span class="border-b border-black inline-block w-40"></span></label><br>
          <label><input type="checkbox"> Out Patient <span class="border-b border-black inline-block w-40"></span></label>

          <p class="italic mt-2">In case of Special Leave Benefits for Women:</p>
          <div class="border-b border-black h-5"></div>

          <p class="italic mt-2">In case of Study Leave:</p>
          <label><input type="checkbox"> Completion of Master's Degree</label><br>
          <label><input type="checkbox"> BAR/Board Examination Review</label>

          <p class="italic mt-2">Other purpose:</p>
          <label><input type="checkbox"> Monetization of Leave Credits</label><br>
          <label><input type="checkbox"> Terminal Leave</label>
        </div>

      </div>

      <!-- 6C / 6D -->
      <div class="grid grid-cols-2 border-t border-black">
        <div class="p-2 border-r border-black">
          <b>6.C NUMBER OF WORKING DAYS APPLIED FOR</b>
          <div class="border-b border-black h-5"></div>

          <div class="mt-2">INCLUSIVE DATES</div>
          <div class="border-b border-black h-5"></div>
        </div>

        <div class="p-2">
          <b>6.D COMMUTATION</b><br>
          <label><input type="checkbox"> Not Requested</label><br>
          <label><input type="checkbox"> Requested</label>

          <div class="mt-6 text-center">
            ___________________________<br>
            (Signature of Applicant)
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="border-2 border-black mt-1">

      <div class="text-center font-bold border-b-2 border-black py-1">
        7. DETAILS OF ACTION ON APPLICATION
      </div>

      <div class="grid grid-cols-2">

        <!-- 7A -->
        <div class="border-r border-black p-2">
          <b>7.A CERTIFICATION OF LEAVE CREDITS</b>

          <div class="text-center text-[10px]">
            As of <span class="inline-block border-b border-black w-32"></span>
          </div>

          <table class="w-full border border-black border-collapse mt-1 text-center">
            <tr>
              <td></td>
              <td class="border border-black">Vacation Leave</td>
              <td class="border border-black">Sick Leave</td>
            </tr>
            <tr>
              <td class="border border-black">Total Earned</td>
              <td class="border border-black h-5"></td>
              <td class="border border-black h-5"></td>
            </tr>
            <tr>
              <td class="border border-black">Less this application</td>
              <td class="border border-black"></td>
              <td class="border border-black"></td>
            </tr>
            <tr>
              <td class="border border-black">Balance</td>
              <td class="border border-black"></td>
              <td class="border border-black"></td>
            </tr>
          </table>

          <div class="text-center mt-4">
            <b>Precious C. Pabon</b><br>
            <span class="border-b border-black inline-block w-48"></span><br>
            (Authorized Officer)
          </div>
        </div>

        <!-- 7B -->
        <div class="p-2">
          <b>7.B RECOMMENDATION</b><br>

          <label><input type="checkbox"> For approval</label><br>
          <label><input type="checkbox"> For disapproval due to</label>

          <div class="border-b border-black h-5 mt-1"></div>
          <div class="border-b border-black h-5"></div>
          <div class="border-b border-black h-5"></div>

          <div class="text-center mt-4">
            <b>Marcelo B. Ralutin I</b><br>
            <span class="border-b border-black inline-block w-48"></span><br>
            School Principal I
          </div>
        </div>
      </div>

      <!-- 7C / 7D -->
      <div class="grid grid-cols-2 border-t border-black">
        <div class="p-2 border-r border-black">
          <b>7.C APPROVED FOR:</b><br>
          _____ days with pay<br>
          _____ days without pay<br>
          _____ others (Specify)
        </div>

        <div class="p-2">
          <b>7.D DISAPPROVED DUE TO:</b>
          <div class="border-b border-black h-5"></div>
          <div class="border-b border-black h-5"></div>
          <div class="border-b border-black h-5"></div>
        </div>
      </div>

      <!-- FINAL SIGN -->
      <div class="text-center mt-6 pb-2">
        <b>RACHELLE R. LLANA, PHD, CESO V</b><br>
        <span class="border-b border-black inline-block w-64"></span><br>
        School Division Superintendent
      </div>

    </div>

    <!-- Supporting Documents Section -->
    <div class="text-black border border-gray-300 p-4 mt-6">
      <h6 class="text-sm font-medium mb-2">SUPPORTING DOCUMENTS:</h6>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <input
          type="file"
          ref="fileInput"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="handleFileUpload"
          class="hidden"
        />
        <button
          type="button"
          @click="fileInput?.click()"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Attach Supporting Documents
        </button>
        <p class="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG files up to 10MB</p>
      </div>
      
      <!-- Uploaded Files -->
      <div v-if="formData.attachments.length > 0" class="mt-3 space-y-2 text-black">
        <div v-for="(file, index) in formData.attachments" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
          <span>{{ file.name }} ({{ formatFileSize(file.size) }})</span>
          <button
            type="button"
            @click="removeFile(index)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Submit Buttons -->
    <div class="text-black flex justify-end space-x-4 pt-4">
      <button
        type="button"
        @click="resetForm"
        class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
      >
        Reset Form
      </button>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
      </button>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="text-black fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="text-black relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
        <div class="text-black text-center">
          <div class="text-black mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Application Submitted Successfully!</h3>
          <p class="text-sm text-gray-500 mb-4">
            Your leave application has been submitted to the admin for review. You will receive a notification once there's an update.
          </p>
          <div class="text-black flex justify-center space-x-3">
            <button
              @click="showSuccessModal = false"
              class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
            <button
              @click="downloadPDF"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download Form
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface Attachment {
  name: string
  size: number
  file: File
}

const formData = ref({
  office: '',
  lastName: '',
  firstName: '',
  middleName: '',
  dateOfFiling: '',
  position: '',
  salary: '',
  leaveType: {
    vacation: false,
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
      withinPhilippines: false,
      withinPhilippinesLocation: '',
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
  numberOfDays: '',
  inclusiveDates: '',
  commutation: {
    notRequested: false,
    requested: false
  },
  applicantSignature: '',
  attachments: [] as Attachment[],
  certification: {
    asOf: '',
    vacation: {
      totalEarned: '',
      lessApplication: '',
      balance: ''
    },
    sick: {
      totalEarned: '',
      lessApplication: '',
      balance: ''
    }
  },
  recommendation: {
    forApproval: false,
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
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const clearOtherLeaveTypes = (selectedType: string) => {
  if (selectedType !== 'others') {
    formData.value.leaveType.others = ''
  }
  
  const types = ['vacation', 'mandatory', 'sick', 'maternity', 'paternity', 'specialPrivilege', 'soloParent', 'study', 'vawc', 'rehabilitation', 'specialWomen', 'emergency', 'adoption']
  types.forEach(type => {
    if (type !== selectedType) {
      (formData.value.leaveType as any)[type] = false
    }
  })
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
        formData.value.attachments.push({
          name: file.name,
          size: file.size,
          file: file
        })
      }
    }
  }
}

const removeFile = (index: number) => {
  formData.value.attachments.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const resetForm = () => {
  formData.value = {
    office: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfFiling: '',
    position: '',
    salary: '',
    leaveType: {
      vacation: false,
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
        withinPhilippines: false,
        withinPhilippinesLocation: '',
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
    numberOfDays: '',
    inclusiveDates: '',
    commutation: {
      notRequested: false,
      requested: false
    },
    applicantSignature: '',
    attachments: [],
    certification: {
      asOf: '',
      vacation: {
        totalEarned: '',
        lessApplication: '',
        balance: ''
      },
      sick: {
        totalEarned: '',
        lessApplication: '',
        balance: ''
      }
    },
    recommendation: {
      forApproval: false,
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
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call to submit form
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Store form data for admin access
    const applicationData = {
      ...formData.value,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    }
    
    // Save to localStorage for demo (in real app, this would be sent to backend)
    const existingApplications = JSON.parse(localStorage.getItem('leaveApplications') || '[]')
    existingApplications.push(applicationData)
    localStorage.setItem('leaveApplications', JSON.stringify(existingApplications))
    
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error submitting application:', error)
  } finally {
    isSubmitting.value = false
  }
}

const downloadPDF = async () => {
  try {
    const element = document.querySelector('.max-w-4xl') as HTMLElement
    if (element) {
      const canvas = await html2canvas(element)
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
      
      pdf.save(`leave-application-${formData.value.lastName}-${Date.now()}.pdf`)
    }
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}
</script>
