<template>
  <section class="container">
    <div>
      <h1 class="title">
        Estados
      </h1>
      <ul class="list">
        <li v-for="state in states" :key="state.name" class="item">
          {{ state.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import states from '~/graphql/query/states.gql'
import sub_states from '~/graphql/subscription/sub_states.gql'

export default {
  components: {
    AppLogo
  },
  apollo: {
    states: {
      prefetch: true,
      query: states,
      subscribeToMore: {
        document: sub_states,
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev)
          return{
            states: [...prev.states, subscriptionData.data.subStates]
          }
        }
      }
    },
  },

}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;

  .item {
    color: #526488;
    font-size: 24px;
    font-weight: bold;
  }

}
</style>

