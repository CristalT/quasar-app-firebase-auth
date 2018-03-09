<template>
	<div>
		<div class="row lg-gutter">
			<div class="col-sm-4">
				<q-field>
					<q-input type="number" v-model="valor.numero" float-label="Número"/>
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-datetime v-model="valor.fecha" float-label="Fecha" format="DD/MM/YYYY" :month-names="monthNames" :day-names="dayNames" ok-label="Aceptar" cancel-label="Cancelar" :no-clear="true"/>
				</q-field>
			</div>
			<div class="col-md-4">
				<q-field icon="monetization on">
					<q-input type="number" v-model="valor.importe" float-label="Importe" />
				</q-field>
			</div>
		</div>
		<div class="row sm-gutter">
			<div class="col-sm-8">
				<q-field>
					<q-input v-model="valor.descripcion" float-label="Descripción"/>
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-select v-model="valor.estado" float-label="Cambiar estado" :options="estados" /> 
				</q-field>
			</div>
		</div>

		<q-btn round color="primary" big style="position: fixed; bottom: 18px; right: 18px" icon="check" @click="guardarCambios" />

		<!-- loading -->
		<q-inner-loading :visible="loading" class="bg-white">
	        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
      	</q-inner-loading>
	</div>
</template>

<script>
import { QField, QInput, QDatetime, QBtn, QInnerLoading, QSpinnerGears, QSelect } from 'quasar';
import { fs } from '../firebase';
export default {
	components: {
		QField,
		QInput,
		QDatetime,
		QBtn,
		QInnerLoading,
		QSpinnerGears,
		QSelect
	},
	data() {
		return {
			valor: {
				ci: '',
				numero: '',
				fecha: '',
				descripcion: '',
				importe: '',
				foto: '',
				estado: ''
			},
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			loading: true,
			estados: [
				{
					label: 'A cobrar',
					value: null
				},
				{
					label: 'Cobrado',
					value: 'cobrado'
				},
				{
					label: 'Rechazado',
					value: 'rechazado'
				}
			]
		};
	},
	methods: {
		openValor() {
			fs
				.collection('valores')
				.doc(this.$route.params.idValor)
				.get()
				.then(res => {
					this.valor = res.data();
					this.loading = false;
				});
		},
		guardarCambios() {
			this.loading = true;
			fs
				.collection('valores')
				.doc(this.$route.params.idValor)
				.set(this.valor)
				.then(() => (window.location = '#/consulta'));
		}
	},
	created() {
		this.openValor();
	}
};
</script>
