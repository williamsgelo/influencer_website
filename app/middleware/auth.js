export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return;

  const { $verifyJwtToken } = useNuxtApp();

  console.log("Auth middleware triggered");
  const jwt = useCookie("InfluencerAppJWT");
  console.log(jwt.value);

  if (!jwt.value) {
    return navigateTo("/register");
  }

  try {
    await $verifyJwtToken(jwt.value, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return navigateTo("/register");
  }
});
