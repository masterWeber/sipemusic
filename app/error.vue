<template>
  <div class="error-page">
    <div class="container error-content">
      <h1 class="error-title">404</h1>
      <p class="error-subtitle">Страница не найдена</p>
      <p class="error-text">Похоже, вы забрели не туда</p>
      <button class="error-btn" @click="handleError">На главную</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0d0d;
  color: #fff;
  padding: 20px;
  font-family: var(--font-main);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.error-title {
  margin: 0;
  font-family: var(--font-logo);
  font-size: 260px;
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
  color: #fff;

  @media (max-width: 960px) {
    font-size: 160px;
  }
}

.error-subtitle {
  margin: 30px 0 0;
  font-size: clamp(1rem, 2vw, 22px);
  font-weight: 300;
  letter-spacing: 10px;
  text-transform: uppercase;
  color: #ccc;
}

.error-text {
  margin: 20px 0 0;
  font-size: 14px;
  color: #999;
  letter-spacing: 1px;
}

.error-btn {
  margin-top: 50px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 10px 20px;
  text-transform: uppercase;
  font-family: var(--font-main);
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background: #fff;
    color: #000;
  }
}
</style>
