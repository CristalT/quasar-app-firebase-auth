<template>
	<div>
		<div class="row lg-gutter">
			<div class="col-sm-4">
				<q-field>
					<q-datetime v-model="valor.fecha" float-label="Fecha de Cobro" format="DD/MM/YYYY" :month-names="monthNames" :day-names="dayNames" ok-label="Aceptar" cancel-label="Cancelar" :no-clear="true"/>
				</q-field>
			</div>
			<div class="col-md-4">
				<q-field icon="monetization on">
					<q-input type="number" v-model="valor.monto" float-label="Monto" />
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-input type="text" v-model="valor.cliente" float-label="Cliente" />
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-input type="text" v-model="valor.viajante" float-label="Viajante o Cobrador" />
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-input type="number" v-model="valor.numero" float-label="3 Últimos Números" />
				</q-field>
			</div>
			<div class="col-sm-4">
				<q-field>
					<q-input type="text" v-model="valor.banco" float-label="Banco" />
				</q-field>
			</div>
			<div class="col-sm-12">
				<q-field>
					<q-input v-model="valor.descripcion" float-label="Observaciones" />
				</q-field>
			</div>
		</div>

		<q-btn round color="tertiary" style="position: fixed; bottom: 120px; right: 28px" icon="add a photo" />
		<q-btn round color="primary" big style="position: fixed; bottom: 18px; right: 18px" icon="check" @click="guardarValor" />

		<!-- loading -->
		<q-inner-loading :visible="loading" class="bg-white">
	        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
      	</q-inner-loading>
	</div>
</template>

<script>
import { QField, QInput, QDatetime, QBtn, QInnerLoading, QSpinnerGears } from 'quasar';
import { fs } from '../firebase';
export default {
	components: {
		QField,
		QInput,
		QDatetime,
		QBtn,
		QInnerLoading,
		QSpinnerGears
	},
	data() {
		return {
			valor: {
				ci: '',
				fecha: '',	
				monto: '',
				cliente: '',
				viajante: '',
				firmante: '',						
				numero: '',
				banco: '',
				foto: ''
			},
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			loading: false
		};
	},
	methods: {
		guardarValor() {
			this.loading = true;
			fs
				.collection('contadores')
				.doc('valores')
				.get()
				.then(res => {
					if (res.data()) {
						let contador = res.data().numero;
						contador++;
						this.valor.ci = contador;
						this.valor.fecha = new Date(this.valor.fecha).getTime();
						fs
							.collection('valores')
							.add(this.valor)
							.then(() => {
								fs
									.collection('contadores')
									.doc('valores')
									.set({ numero: contador });
								this.$router.push({ path: 'success' });
							});
					}
				});
		}
	}
};
</script>
