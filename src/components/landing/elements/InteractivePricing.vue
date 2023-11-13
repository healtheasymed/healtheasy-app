<template>
  <div class="interactive-pricing" v-show="plans">
    <span class="flag-discount" v-show="discount > 0">{{ discount * 100 }}% OFF</span>

    <header class="section-top">
    <h5>
    <template v-if="accessQty === 1">
      1 acesso
    </template>
    <template v-if="accessQty === 2">
      2 a 5 acessos
    </template>
    <template v-if="accessQty === 3">
      6 a 10 acessos
    </template>
  </h5>

      <div class="custom-select">
  <select v-model="accessQty" @change="calculatePriceAndDiscount">
    <option value="1">1 acesso</option>
    <option value="5">2 a 5 acessos</option>
    <option value="10">6 a 10 acessos</option>
  </select>
</div>
    
     <p>
      Preço: {{ finalPrice }}
      <span v-if="selectedPlan && selectedPlan.discount > 0" class="discount-indicator">
        ({{ selectedPlan.discount * 100 }}% de desconto)
      </span>
    </p>
   
      <div class="plan-value">
        <p>{{ finalPrice }} *</p>
        <span>/ mês </span>
      </div>
    </header>

    <footer class="description-plan">
      <h6>o que está incluso</h6>
      <ul>
        <li class="plan-item" v-for="service in plans.services" :key="service.id">
          <p>
            {{ service.name }}
            <q-icon
              size="25px"
              :name="service.icon"
              :color="service.icon === 'mdi-check' ? 'positive' : 'negative'"
            />
          </p>
        </li>
      </ul>

      <CustomButton text="Aderir ao plano" :width="180" @click="goToStripeCheckout" />

      <sub><b>*</b> R$ 79,90 por quantidade de acesso</sub>
      <sub><b>*</b> Caso deseje adquirir mais de 10 acessos, entre em contato conosco</sub>
    </footer>
  </div>
</template>

<script>
import {
  computed, defineComponent, ref, onMounted, watch,
} from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import useNotify from '@/composables/useNotify';
import { plans } from '@/static/landing-page';
import CustomButton from '@/components/landing/elements/CustomButton';

export default defineComponent({
  name: 'InteractivePricing',

  components: {
    CustomButton,
  },

  setup() {
    const publishableKey = process.env.STRIPE_PUBLIC_KEY;
    const loading = ref(false);
    const lineItems = ref([]);
    const successUrl = process.env.BASE_URL;
    const cancelUrl = process.env.BASE_URL;
    const token = null;

    const accessQty = ref(10);
    const sliderLeft = ref(50);
    const selectedPlan = ref(plans.options[1]);
    const discount = ref(selectedPlan.value.discount);

    const { notifyError } = useNotify();

    const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

    const goToStripeCheckout = async () => {
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        lineItems: lineItems.value,
        mode: 'subscription',
        successUrl: `${window.location.href}?status=success`,
        cancelUrl: `${window.location.href}?status=error`,
      });

      if (error) {
        notifyError(error);
      }
    };

    const setStripeLineItems = () => {
      lineItems.value = Array({
        price: selectedPlan.value.id,
        quantity: Number(accessQty.value),
      });
    };

    const getSelectedPlanInfos = () => {
      plans.options.forEach((plan) => {
        const range = [...Array(plan.final - plan.initial + 1).keys()]
          .map((item) => item + plan.initial);

        const hasAcessQtyInRange = range.find((item) => item === Number(accessQty.value));

        if (hasAcessQtyInRange) {
          selectedPlan.value = plan;
          discount.value = plan.discount;
          setStripeLineItems();
        }
      });
    };

    const finalPrice = computed(() => {
      const totalPrice = accessQty.value > 10
        ? selectedPlan.value.price * accessQty.value
        : plans.defaultPrice * accessQty.value;

      return (totalPrice - (totalPrice * discount.value)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    watch(accessQty, (value) => {
      if (value) {
        sliderLeft.value = value * 5;
        getSelectedPlanInfos();
      }
    });

    onMounted(() => {
      setStripeLineItems();
    });

    return {
      plans,
      accessQty,
      sliderLeft,
      selectedPlan,
      discount,
      finalPrice,
      publishableKey,
      loading,
      lineItems,
      successUrl,
      cancelUrl,
      token,
      goToStripeCheckout,
    };
  },
});
</script>

<style scoped>
.interactive-pricing {
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 20px 30px -5px rgba(127, 137, 185, 0.15);
  text-align: center;

  margin: 0 auto;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease-in-out;
  width: 360px;
}

.flag-discount {
  background: var(--dark-purple);
  border-radius: 6px 6px 0 0;
  color: var(--white);
  font-size: 15px;
  font-weight: 400;
  text-align: center;

  display: block;
  max-width: 50px;
  padding: 5px;
  position: absolute;
  right: 0px;
  top: -2px;
}

.flag-discount::before,
.flag-discount::after {
  border-style: solid;
  content: "";
  display: block;
  height: 0;
  position: absolute;
  width: 0;
}

.flag-discount::before {
  border-color: var(--dark-purple) transparent transparent transparent;
  border-width: 35px 30px 0 0;
  bottom: -30px;
  left: 0;
}

.flag-discount::after {
  border-color: transparent var(--dark-purple) transparent transparent;
  border-width: 0 30px 35px 0;
  bottom: -30px;
  right: 0;
}

header {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

header p {
  font-size: 1.4rem;
  font-weight: bold;
}

input[type="range"] {
  --slider-left: v-bind(sliderLeft);
}

input[type="range"] {
  appearance: none;
  background-color: transparent;
  width: 100%;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
}

input[type="range"]::-moz-range-thumb {
  border: none;
}

input[type="range"]::-webkit-slider-thumb {
  background: url('@/assets/icons/range-slider-icon.svg') center no-repeat, var(--dark-green);
  border-radius: 50%;
  box-shadow: 0px 10px 20px rgba(0, 255, 231, 0.6);
  cursor: ew-resize;

  height: 40px;
  margin-top: -15px;
  width: 40px;
  transition: background 350ms;
}

input[type="range"]:hover::-webkit-slider-thumb {
  filter: contrast(0.8);
}

input[type="range"]:active::-webkit-slider-thumb {
  filter: contrast(0.8);
}

/* Firefox - thumb */

input[type="range"]::-moz-range-thumb {
  background: url('@/assets/icons/range-slider-icon.svg') center no-repeat, var(--dark-green);
  border-radius: 50%;
  box-shadow: 0px 10px 20px rgba(0, 255, 231, 0.6);
  cursor: pointer;

  height: 40px;
  margin-top: -15px;
  width: 40px;
  transition: background 350ms;
}

input[type="range"]:hover::-moz-range-thumb {
  filter: contrast(0.8);
}

input[type="range"]:active::-moz-range-thumb {
  filter: contrast(0.8);
}

input[type="range"]::-webkit-slider-runnable-track {
  background: var(--light-gray);
  background-image: linear-gradient(
    to right,
    rgb(165, 243, 235) calc(var(--slider-left) * 1%),
    transparent 0%
  );
  border-radius: 10px;
  cursor: ew-resize;

  height: 10px;
  width: 100%;
}

input[type="range"]::-moz-range-track {
  background: var(--light-gray);
  background-image: linear-gradient(
    to right,
    rgb(165, 243, 235) calc(var(--slider-left) * 1%),
    transparent 0%
  );
  border-radius: 10px;
  cursor: pointer;

  height: 10px;
  width: 100%;
}

.description-plan {
  text-align: center;
  width: 100%;
}

.description-plan h6 {
  border-bottom: 1px solid var(--dark-blue);
  border-top: 1px solid var(--dark-blue);
  color: var(--dark-blue);
  font-size: 1.6rem;

  margin-top: 20px;
  padding: 10px 0;
  width: 100%;
}

.description-plan ul {
  margin-bottom: 20px;
  padding-left: 0px !important;
  width: 100%;
}

.plan-item {
  border-bottom: 1px solid var(--dark-blue);
  padding: 10px 0;
}

.plan-item:hover {
  transform: scale(1.02);
}

.plan-item p {
  color: var(--dark-gray);

  align-items: center;
  display: flex;
  justify-content: space-between;
}

footer {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 375px) {
  .interactive-pricing {
    max-width: 300px;
  }
}
</style>
