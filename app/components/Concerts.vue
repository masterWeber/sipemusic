<template>
  <section class="section concerts" id="concerts">
    <div class="container">
      <h2 class="section-title concerts__title">Концерты</h2>
      <div class="concerts__list">
        <div
            v-for="(concert, index) in concerts"
            :key="index"
            class="concert-item"
        >
          <span class="concert-item__date">{{ concert.date }}</span>
          <span class="concert-item__city">{{ concert.city }}</span>
          <span class="concert-item__venue">{{ concert.venue }}</span>
          <button class="concert-item__btn">Билеты</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const concerts = ref([
  {date: '15 июн', city: 'Москва', venue: 'Powerhouse'},
  {date: '28 июн', city: 'Санкт-Петербург', venue: 'Aurora Concert Hall'},
  {date: '06 июл', city: 'Екатеринбург', venue: 'Tele-Club'},
  {date: '13 июл', city: 'Нижний Новгород', venue: 'Milk Concert Hall'},
  {date: '20 июл', city: 'Казань', venue: 'Urban'},
  {date: '27 июл', city: 'Новосибирск', venue: 'Подземка'},
  {date: '03 авг', city: 'Ростов-на-Дону', venue: 'More Music Club'},
])
</script>

<style lang="scss" scoped>
$text-muted: #999999;

.concerts {
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

      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>