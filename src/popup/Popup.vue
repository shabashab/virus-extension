<script setup lang="ts">
import { onMounted, ref } from 'vue'

const crx = ref('create-chrome-ext')

const counter = ref(Number.isNaN(parseInt(localStorage.counter)) ? 0 : parseInt(localStorage.counter));
const disabled = ref(localStorage.disabled === "true");

onMounted(() => {
  if (!disabled.value) {
    counter.value += (Math.random() * 10);
    localStorage.counter = counter.value;
  }
});

const onDisableButtonClick = () => {
  disabled.value = !disabled.value;
  localStorage.disabled = disabled.value;
}
</script>

<template>
  <main>
    <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Adblock_logo.png?20170914173748">
    <h2>ADBlock by Inc-Dev</h2>
    <div class="container">
      <div class="counter" :class="{ 'couter-disabled': disabled }">
        <div>
          <h3 :class="{ 'text-disabled': disabled }">
            {{ counter.toFixed(0) }}<br>
          </h3>
          Ads blocked
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <button @click.stop="onDisableButtonClick" class="button" :class="{ 'button-disabled': disabled }">
        {{ disabled ? 'Enable' : 'Disable' }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.button {
  background-color: #ff0000;
  border: 1px solid #ff0000;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: not-allowed;
}

.button-disabled {
  background-color: #57625d;
  border: 1px solid #3c403e;
  color: #ffffff;
  cursor: pointer;
}

.mt-2 {
  margin-top: 30px;
}

.container {
  display: flex;
  justify-content: center;
}

.text-disabled {
  color: gray;
}

.counter {
  border: 20px solid green;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  padding: 15px;
}

.couter-disabled {
  border: 20px solid rgb(58, 56, 56);
  color: gray !important;
}

.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: block;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #42b983;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2rem;
  margin-bottom: 5px;
}

h6 {
  font-size: 0.5rem;
  color: #999999;
  margin: 0.5rem;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

@media (min-width: 480px) {
  h3 {
    max-width: none;
  }
}

@media (prefers-color-scheme: light) {
  a:hover {
    color: #747bff;
  }

  h6 {
    color: #333333;
  }
}
</style>
