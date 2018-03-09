<template>
	<div class="wrapper">
		<q-btn class="block full-width btn" color="primary" big icon="mode edit" @click="linkTo('registro')">REGISTRO</q-btn>
		<q-btn class="block full-width btn" color="tertiary" big icon="search" @click="linkTo('consulta')">CONSULTAS</q-btn>
	</div>
</template>

<script>
import { QBtn } from 'quasar';
export default {
	components: {
		QBtn
	},
	methods: {
		linkTo(value) {
			this.$router.push({ path: value });
		}
	}
};
</script>

<style lang="stylus">
	.wrapper
		width 80%
		position absolute
		top 50%
		left 50%
		transform translate(-50%, -50%)
		text-align center

		.btn
			margin 50px 30px
</style>
