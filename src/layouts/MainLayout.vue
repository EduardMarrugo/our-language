<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-light-blue-4">
        <q-avatar>
          <q-icon name="developer_mode" />
        </q-avatar>

        <q-toolbar-title> {{$t('lenguaje')}} </q-toolbar-title>
       
        <q-btn-toggle
          flat
          color="white"
          toggle-color="lime-13"
          v-model="locale"
          @input="setLocale"
          :options="[
            { label: 'EN', value: 'en-us' },
            { label: 'ES', value: 'es' },
            { label: 'FR', value: 'fr' },
            { label: 'JA', value: 'ja' },
          ]"
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view style="margin-top: -50px" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data: function() {
    return {
      locale: this.$q.lang.isoName,
    };
  },
  methods: {
    setLocale(locale) {
      // cambiamos Vue-i18n locale
      this.$i18n.locale = locale
      // Cargar el pack de idioma de Quasar de forma dinámica
      import(`quasar/lang/${locale}`).then(({ default: messages }) => {
        this.$q.lang.set(messages);
      });  
    },
  },

};
</script>
