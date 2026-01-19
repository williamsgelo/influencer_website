<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex items-center gap-4">
          <button class="text-gray-600 hover:text-gray-900">Settings</button>
          <div
            class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
          >
            <span class="text-gray-700 font-semibold">JD</span>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Completion Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900">
                Profile Completion
              </h2>
              <span class="text-3xl font-bold text-gray-900"
                >{{ completionPercentage }}%</span
              >
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                class="bg-gray-900 h-3 rounded-full transition-all duration-300"
                :style="{ width: `${completionPercentage}%` }"
              ></div>
            </div>

            <!-- Checklist -->
            <div class="space-y-3">
              <div
                v-for="item in checklistItems"
                :key="item.label"
                class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  class="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                  :class="
                    item.status === 'complete'
                      ? 'bg-green-500'
                      : item.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                  "
                >
                  <CheckIcon
                    v-if="item.status === 'complete'"
                    class="w-4 h-4 text-white"
                  />
                  <AlertTriangle
                    v-else-if="item.status === 'warning'"
                    class="w-4 h-4 text-white"
                  />
                  <X v-else class="w-4 h-4 text-white" />
                </div>
                <span
                  class="text-gray-700"
                  :class="item.status === 'complete' ? 'font-medium' : ''"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600">
                <strong>Why this matters:</strong> Complete your profile to
                increase trust with brands and unlock more opportunities.
              </p>
            </div>
          </div>

          <!-- Social Accounts Section -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              Social Accounts
            </h2>

            <div class="space-y-4">
              <div
                v-for="platform in socialPlatforms"
                :key="platform.name"
                class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <component
                      :is="platform.icon"
                      class="w-6 h-6 text-gray-700"
                    />
                    <div>
                      <h3 class="font-semibold text-gray-900">
                        {{ platform.name }}
                      </h3>
                      <div v-if="platform.connected">
                        <p class="text-sm text-gray-600">
                          Followers: {{ platform.followers }}
                        </p>
                        <p class="text-xs text-gray-500">
                          Last synced: {{ platform.lastSynced }}
                        </p>
                      </div>
                      <p v-else class="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>

                  <button
                    v-if="platform.connected"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Re-sync
                  </button>
                  <button
                    v-else
                    class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification & Proof Section -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">
              Verification & Proof
            </h2>

            <div class="space-y-4">
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              >
                <Upload class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p class="text-gray-700 font-medium mb-1">
                  Upload Insights Screenshots
                </p>
                <p class="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>

              <div
                v-if="verificationStatus"
                class="p-4 rounded-lg"
                :class="getVerificationClass(verificationStatus)"
              >
                <div class="flex items-center gap-2">
                  <component
                    :is="getVerificationIcon(verificationStatus)"
                    class="w-5 h-5"
                  />
                  <span class="font-medium"
                    >Verification Status: {{ verificationStatus }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Trust Badge & Profile Preview -->
        <div class="space-y-6">
          <!-- Trust Status Badge -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Trust Status</h2>

            <div class="flex items-center gap-3 mb-4">
              <div
                class="px-4 py-2 rounded-full font-semibold text-sm"
                :class="getTrustBadgeClass(trustStatus)"
              >
                {{ trustStatus.replace("_", " ") }}
              </div>
            </div>

            <div class="p-4 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600">
                <ShieldCheck class="w-4 h-4 inline mr-1" />
                Based on connected socials & uploaded proof
              </p>
            </div>

            <div class="mt-4 space-y-2">
              <div class="text-sm">
                <span class="text-gray-600">To reach VERIFIED:</span>
                <ul class="mt-2 space-y-1 text-gray-700">
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    Connect all social accounts
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    Upload insights proof
                  </li>
                  <li class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    Complete profile info
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Public Profile Preview -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Public Profile</h2>

            <div class="mb-4">
              <label class="text-sm text-gray-600 mb-2 block"
                >Your public link</label
              >
              <div class="flex items-center gap-2">
                <input
                  type="text"
                  readonly
                  :value="publicProfileUrl"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                />
                <button
                  @click="copyProfileUrl"
                  class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  title="Copy link"
                >
                  <Copy class="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            <!-- Preview Card -->
            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div class="flex items-start gap-3 mb-3">
                <div class="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <h3 class="font-semibold text-gray-900">John Doe</h3>
                  <p class="text-sm text-gray-600">Lifestyle & Tech</p>
                </div>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <div>
                  <span class="font-semibold text-gray-900">12.4k</span>
                  followers
                </div>
                <div
                  class="px-2 py-1 rounded text-xs font-medium"
                  :class="getTrustBadgeClass(trustStatus)"
                >
                  {{ trustStatus.replace("_", " ") }}
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Public Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  CheckIcon,
  X,
  AlertTriangle,
  Upload,
  Copy,
  ShieldCheck,
  Instagram,
  Youtube,
} from "lucide-vue-next";

// Mock data - replace with real data from your backend
const checklistItems = ref([
  { label: "Profile info", status: "complete" },
  { label: "Social connected", status: "warning" },
  { label: "Proof uploaded", status: "incomplete" },
  { label: "Location set", status: "complete" },
]);

const socialPlatforms = ref([
  {
    name: "Instagram",
    icon: Instagram,
    connected: true,
    followers: "12.4k",
    lastSynced: "2 days ago",
  },
  {
    name: "TikTok",
    icon: "svg",
    connected: false,
    followers: null,
    lastSynced: null,
  },
  {
    name: "YouTube",
    icon: Youtube,
    connected: false,
    followers: null,
    lastSynced: null,
  },
]);

const trustStatus = ref("PARTIALLY_VERIFIED"); // UNVERIFIED, PARTIALLY_VERIFIED, VERIFIED
const verificationStatus = ref("Pending Review");
const publicProfileUrl = ref("https://platform.co.za/influencer/johndoe");

const completionPercentage = computed(() => {
  const completed = checklistItems.value.filter(
    (item) => item.status === "complete"
  ).length;
  return Math.round((completed / checklistItems.value.length) * 100);
});

const getTrustBadgeClass = (status) => {
  switch (status) {
    case "UNVERIFIED":
      return "bg-gray-200 text-gray-700";
    case "PARTIALLY_VERIFIED":
      return "bg-yellow-100 text-yellow-800";
    case "VERIFIED":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const getVerificationClass = (status) => {
  if (status.includes("Approved") || status.includes("Verified")) {
    return "bg-green-50 text-green-700";
  } else if (status.includes("Pending")) {
    return "bg-yellow-50 text-yellow-700";
  }
  return "bg-gray-50 text-gray-700";
};

const getVerificationIcon = (status) => {
  if (status.includes("Approved") || status.includes("Verified")) {
    return CheckIcon;
  }
  return AlertTriangle;
};

const copyProfileUrl = () => {
  navigator.clipboard.writeText(publicProfileUrl.value);
  // Add toast notification here
};
</script>
