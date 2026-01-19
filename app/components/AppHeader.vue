<template>
  <header
    class="fixed top-0 w-full bg-zinc-900 text-white z-50 border-b border-zinc-800"
  >
    <div
      class="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl"
    >
      <div class="text-2xl font-bold tracking-tight">INFLUENCE.ZA</div>
      <nav class="hidden md:flex gap-8 items-center">
        <a
          href="#about"
          class="text-zinc-300 hover:text-white transition-colors"
          >About</a
        >
        <a
          href="/influencers"
          class="text-zinc-300 hover:text-white transition-colors"
          >Influencers</a
        >
        <a
          href="#how-it-works"
          class="text-zinc-300 hover:text-white transition-colors"
          >How It Works</a
        >
        <a href="#faq" class="text-zinc-300 hover:text-white transition-colors"
          >FAQ</a
        >
        <NuxtLink
          to="/register"
          class="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors"
        >
          Get Started
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
