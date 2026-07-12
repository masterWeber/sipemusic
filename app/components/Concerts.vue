<template>
  <section class="section concerts" id="concerts">
    <div class="container">
      <h2 class="section-title concerts__title">Концерты</h2>
      <div v-if="loading" class="concerts__loading">Загрузка...</div>
      <div v-else class="concerts__list">
        <div
          v-for="(concert, index) in concerts"
          :key="concert.id || index"
          class="concert-item"
        >
          <span class="concert-item__date">{{ formatDate(concert.date) }}<template v-if="concert.showTime && concert.time">, {{ concert.time }}</template></span>
          <span class="concert-item__city">{{ concert.city }}</span>
          <span class="concert-item__venue">{{ concert.venue }}</span>
          <a
            v-if="concert.ticketUrl"
            :href="concert.ticketUrl"
            target="_blank"
            class="concert-item__btn"
          >Билеты</a>
          <button v-else class="concert-item__btn">Билеты</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: concerts, pending: loading } = await useFetch('/api/concerts')

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDate()
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  return `${day} ${months[date.getMonth()]}`
}
</script>

<style lang="scss" scoped>
$text-muted: #999999;

.concerts {
  &__loading {
    text-align: center;
    color: $text-muted;
    padding: 40px 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .concert-item {
    display: grid;
    grid-template-columns: 15% 25% 1fr 120px;
    align-items: center;
    padding: 25px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 10px 20px;
      align-items: start;

      &__date {
        grid-area: 1 / 1 / 2 / 2;
      }
      &__city {
        grid-area: 1 / 2 / 2 / 3;
        text-align: right;
      }
      &__venue {
        grid-area: 2 / 1 / 3 / 3;
        color: $text-muted;
        font-size: 14px;
      }
      &__btn {
        grid-area: 3 / 1 / 4 / 3;
        width: 100%;
      }
    }

    &__date, &__city, &__venue {
      text-transform: uppercase;
      font-size: 13px;
      letter-spacing: 1px;
    }

    &__venue {
      color: $text-muted;
      font-weight: 300;
    }

    &__btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      padding: 10px 20px;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 1px;
      cursor: pointer;
      justify-self: end;
      transition: all 0.3s;
      text-decoration: none;
      text-align: center;

      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
