<template>
  <q-page class="column">
    <q-icon name="mdi-email-fast" size="10em" color="primary" />
    <h2 class="q-my-md">Agradecemos por se registrar!</h2>
    <q-separator spaced color="primary" size="4px" />

    <template v-if="$route.query.email">
      <p class="text-h6">
        Por favor, confirme o e-mail à seguir para efetivar o cadastro:
      </p>
      <q-chip square color="primary" size="lg" outline>
        {{ $route.query.email }}
      </q-chip>
      <q-btn
        label="Pronto"
        color="positive"
        class="q-mt-md"
        to="/login"
      />
    </template>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailConfirmationPage',
});
</script>

<style scoped>
hr {
  width: 100%;
}

i {
  border: 8px solid var(--dark-blue);
  border-radius: 50%;
  padding: 20px;
}
</style>
