<template>
  <!-- FAQ Section -->
  <section id="faq" class="py-20 px-4 bg-zinc-50">
    <div class="container mx-auto max-w-3xl">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-black mb-4">
        Frequently Asked Questions
      </h2>
      <p class="text-center text-zinc-600 mb-12 text-lg">
        Everything you need to know about the platform
      </p>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-xl border-2 border-zinc-200 overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full p-6 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors"
          >
            <span class="font-bold text-lg text-black pr-4">{{
              faq.question
            }}</span>
            <span
              class="text-2xl text-black transition-transform"
              :class="{ 'rotate-45': faq.open }"
              >+</span
            >
          </button>
          <div
            v-show="faq.open"
            class="px-6 pb-6 text-zinc-600 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "How do you verify influencers?",
    answer:
      "Every influencer goes through a comprehensive vetting process including audience authenticity checks, engagement rate analysis, past campaign performance review, and brand safety screening. We verify follower quality, demographic data, and ensure all metrics are genuine.",
    open: false,
  },
  {
    question: "What makes your platform different from others?",
    answer:
      "We focus exclusively on the South African market with deep local expertise. Our verification process is more rigorous, our metrics are completely transparent, and we handle everything from matching to payment. Plus, we offer dedicated campaign managers for every partnership.",
    open: false,
  },
  {
    question: "How much do campaigns typically cost?",
    answer:
      "Campaign costs vary based on influencer reach, content type, and campaign scope. We work with budgets from R10,000 to R500,000+. Our platform provides transparent pricing upfront, and you only pay when you approve a collaboration.",
    open: false,
  },
  {
    question: "How long does it take to launch a campaign?",
    answer:
      "Most campaigns launch within 5-7 days. This includes influencer matching (1-2 days), proposal review (2-3 days), and content creation (2-3 days). Rush campaigns can be accommodated with our premium service.",
    open: false,
  },
  {
    question: "Can I manage multiple campaigns at once?",
    answer:
      "Our dashboard allows you to manage unlimited campaigns simultaneously. Track performance, approve content, and communicate with multiple influencers all in one place.",
    open: false,
  },
  {
    question: "What if I'm not satisfied with campaign results?",
    answer:
      "We offer a satisfaction guarantee. If campaign results don't meet agreed-upon KPIs due to influencer performance issues, we'll work with you to make it right, including matching you with alternative creators at no extra cost.",
    open: false,
  },
]);

function toggleFaq(index) {
  faqs.value[index].open = !faqs.value[index].open;
}
</script>

<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}
</style>
