<script setup lang="ts">
import { ref, computed } from 'vue'

const rows = 30
const cols = rows

// State
const board = ref<number[][]>(Array.from({ length: rows }, () => Array(cols).fill(0)))
const generation = ref(0)
const isPlaying = ref(false)
let playInterval: ReturnType<typeof setInterval> | null = null

// RF08: contando as celuas vivas 
const aliveCells = computed(() => {
  return board.value.reduce((acc, row) => acc + row.filter(cell => cell === 1).length, 0)
})

// RF02: config inicial por clique
const toggleCell = (rowIndex: number, colIndex: number) => {
  if (isPlaying.value) return // Bloqueia edições manuais enquanto roda
  const currentState = board.value[rowIndex][colIndex]
  board.value[rowIndex][colIndex] = currentState === 0 ? 1 : 0
}

// RF06: reiniciar a gradee
const resetBoard = () => {
  board.value = Array.from({ length: rows }, () => Array(cols).fill(0))
  generation.value = 0
  stopSimulation()
}

// Integracao com o backend express
const fetchNextGeneration = async () => {
  try {
    let body = JSON.stringify(board.value)
    // Bate no proxy do Vite, que redireciona silenciosamente para o backend no Docker
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: body
    });
    
    if (!response.ok) throw new Error('Falha na resposta da rede',)
    
    const data = await response.json()
    board.value = JSON.parse(data)
    generation.value++
  } catch (error) {
    console.error('Erro ao buscar a próxima geração:', error)
  }
}



// RF03 e RF04: iniciar e pausar a simulacao
const toggleSimulation = () => {
  if (isPlaying.value) {
    stopSimulation()
  } else {
    isPlaying.value = true
    playInterval = setInterval(() => {
      fetchNextGeneration()
    }, 150) // Avança a cada 500ms
  }
}

const stopSimulation = () => {
  isPlaying.value = false
  if (playInterval) clearInterval(playInterval)
}
</script>

<template>
  <div class="game-wrapper">
    <!-- RF07 e RF08: Status do jogo -->
    <div class="stats">
      <span>Geração Atual: <strong>{{ generation }}</strong></span>
      <span>Células Vivas: <strong>{{ aliveCells }}</strong></span>
    </div>

    <!-- RF01: Grade bidimensional -->
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="'row-' + rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="'col-' + colIndex"
          class="cell"
          :class="{ 'is-alive': cell === 1 }"
          @click="toggleCell(rowIndex, colIndex)"
        ></div>
      </div>
    </div>

    <!-- RF03, RF04, RF05 e RF06: Controles -->
    <div class="controls">
      <button @click="toggleSimulation">{{ isPlaying ? 'Pausar' : 'Iniciar' }}</button>
      <button @click="fetchNextGeneration" :disabled="isPlaying">Avançar 1 Geração</button>
      <button @click="resetBoard">Reiniciar</button>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.stats {
  display: flex;
  gap: 30px;
  font-size: 18px;
  color: var(--text-h);
}

.board {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  background-color: var(--bg);
}

.row {
  display: flex;
}

.cell {
  width: 25px;
  height: 25px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background-color 0.15s;
}

.cell.is-alive {
  background-color: var(--accent);
}

.cell:hover:not(.is-alive) {
  background-color: var(--accent-bg);
}

.controls {
  display: flex;
  gap: 15px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  font-family: var(--sans);
  background-color: var(--social-bg);
  border: 1px solid var(--border);
  color: var(--text-h);
  border-radius: 6px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

button:hover:not(:disabled) {
  box-shadow: var(--shadow);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>