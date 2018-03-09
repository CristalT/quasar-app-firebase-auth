<template>
	<div class="column items-center">
		<div class="success-card shadow-4 bg-white column items-center justify-center no-wrap">
        	<q-icon name="check circle" color="green-5" />

        	<p class="caption text-center">Valor asentado correctamente</p>
        	<p class="text-center group">
				
			<q-btn color="primary" @click="$router.replace('registro')" icon="arrow back">
				Cargar Otro
			</q-btn>
        </p>
      </div>
	</div>
	
</template>

<script>
import { QIcon, QBtn } from 'quasar';
export default {
	components: {
		QIcon,
		QBtn
	}
};
</script>

<style lang="stylus">
	.success-card
		border-radius 2px
		padding 25px
		margin-top 50px
		> i
			font-size 5rem
</style>
