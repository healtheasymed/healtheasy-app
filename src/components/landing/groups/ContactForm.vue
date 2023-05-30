<template>
  <div id="contact-form">
    <h4>Envie uma <span>mensagem</span></h4>

    <form class="form" ref="formRef" @submit.prevent="sendEmail">
      <CustomInput
        name="name"
        placeholder="Nome completo"
        iconName="mdi-account"
        required
      />

      <CustomInput
        name="email"
        type="email"
        placeholder="E-mail"
        iconName="mdi-at"
        required
      />

      <CustomInput
        name="phone"
        type="tel"
        placeholder="Telefone"
        iconName="mdi-phone"
        required
      />

      <CustomInput
        name="subject"
        placeholder="Assunto"
        iconName="mdi-email"
        required
      />

      <CustomInput
        name="message"
        placeholder="Mensagem"
        iconName="mdi-message"
        isTextArea
        required
      />

      <CustomButton
        type="submit"
        text="Enviar mensagem"
        bgColor="var(--dark-blue)"
        :width="300"
      />
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import emailjs from 'emailjs-com';
import CustomInput from '@/components/landing/elements/CustomInput';
import CustomButton from '@/components/landing/elements/CustomButton';

export default defineComponent({
  name: 'ContactForm',

  components: {
    CustomInput,
    CustomButton,
  },

  setup() {
    const formRef = ref(null);
    const $q = useQuasar();

    const sendEmail = () => {
      if (!formRef.value.name.value
        || !formRef.value.email.value
        || !formRef.value.subject.value
        || !formRef.value.message.value) {
        $q.notify({
          type: 'negative',
          message: 'Preencha todas as informações antes de enviar a mensagem.',
        });
        return;
      }

      emailjs.sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE,
        formRef.value,
        process.env.EMAILJS_USER_ID,
      )
        .then(() => (
          $q.notify({
            type: 'positive',
            message: 'Mensagem enviada com sucesso.',
          })
        ), (error) => (
          $q.notify({
            type: 'negative',
            message: error.text,
          })
        ));
    };

    return {
      formRef,
      sendEmail,
    };
  },
});
</script>

<style scoped>
#contact-form {
  background: var(--white);
  border: 2px solid var(--dark-green);
  border-radius: 10px;

  height: auto;
  margin-inline: auto;
  min-width: 320px;
  padding: 40px 0;
  text-align: center;
  width: 80%;
}

#contact-form h4 {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

#contact-form span {
  color: var(--dark-green);
}

form {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}
</style>
