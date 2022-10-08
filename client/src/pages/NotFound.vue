<template>
  <v-container fluid class="fill-height align-start">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline ma-12"><span class="red--text lighten-2 title">404</span> | Page not found.</div>
        <v-list-item-title class="headline mb-1 ml-12">Wait a minute!</v-list-item-title>
        <v-list-item-subtitle class="ml-12">Something ain't right!</v-list-item-subtitle>
        <v-list-item-subtitle class="ml-12 pt-4">
          <v-btn :to="'/'" class="text-button" style="width: 20px" elevation="5" raised block color="primary">Go back!
          </v-btn>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</template>
<script>
export default {
  name: "NotFound"
}
</script>
