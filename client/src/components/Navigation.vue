<template>
  <v-treeview v-model="selection" hoverable dark activatable transition open-on-click :open="initiallyOpen" :items="links" :active="active">
    <template v-slot:label="{ item }">
      <div class="white--text" @click="navigateTo(item.link)">
        {{ (item.name) }}
      </div>
    </template>
  </v-treeview>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      initiallyOpen: [1],
      selection: [],
      active: [],
      links: [
        {
          id: 1,
          name: 'Game',
          link: 'game',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['navigationId']),
  },
  mounted() {
    this.active = [this.navigationId];
  },
  methods: {

    navigateTo(link) {
      if (link !== undefined) {
        this.$router.push(link).catch(() => { });
      }

    },
  },
};
</script>
