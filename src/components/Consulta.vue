<template>
	<div>
		
		<div class="content">
			<div class="indicadores">
				<ul>
					<li><span class="indicador cobrado"></span> Acreditados</li>
					<li @click="mostrarEnFecha" class="filtro"><span class="indicador en-fecha-cobro"></span> En fecha $ {{ totalEnFecha | toFixed }}</li>
					<li @click="mostrarPorVencer" class="filtro"><span class="indicador por-vencer"></span> Por expirar / expirados</li>
					<li @click="mostrarRechazados" class="filtro"><span class="indicador rech"></span> Rechazados $ {{ totalRechazado | toFixed }}</li>
					<li @click="mostrarTodos" class="filtro"><span class="indicador a-cobrar"></span> A cobrar $ {{ totalValores | toFixed }}</li>
				</ul>
			</div>
			
			<div class="row sm-gutter filter">
				<div class="col-sm-6">
					<q-datetime-range type="date" v-model="range" float-label="Rango de fechas" format="DD/MM/YYYY" :min="min" :max="max" :month-names="monthNames" :day-names="dayNames"/>
				</div>
				<div class="col-sm-6">
					<q-search v-model="buscar" placeholder="Búsqueda..." float-label="Buscar por número o descripción" />
					
				</div>
			</div>
			<table class="q-table responsive striped full-width loose highlight">
				<thead>
					<tr>
						<th @click="ordenarPor('ci')" style="cursor: pointer;">CI</th>
						<th @click="ordenarPor('numero')" style="cursor: pointer;">Número</th>
						<th @click="ordenarPor('fecha')" style="cursor: pointer;">Fecha</th>
						<th @click="ordenarPor('descripcion')" style="cursor: pointer;">Descripcion</th>
						<th @click="ordenarPor('importe')" style="cursor: pointer;">Importe</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(valor, index) in valoresFiltrados" style="cursor: pointer" :key="index" :class="rules(valor)" @click="cambiarEstado(valor.$id)">
						<td>{{ valor.ci }}</td>
						<td>{{ valor.numero }}</td>
						<td>{{ valor.fecha | dateFormat }}</td>
						<td>{{ valor.descripcion }}</td>
						<td>$ {{ valor.importe }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		
	</div>
</template>

<script>
import { fs } from '../firebase';
import moment from 'moment';
import _ from 'lodash';

import { QSearch, QDatetimeRange, QToolbar, QToolbarTitle } from 'quasar';

export default {
	components: {
		QSearch,
		QDatetimeRange,
		QToolbar,
		QToolbarTitle
	},
	data() {
		return {
			valores: [],
			_valores: [],
			buscar: '',
			range: {
				from: moment()
					.add(-31, 'days')
					.format(),
				to: moment()
					.add(91, 'days')
					.format()
			},
			min: '',
			max: '',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			totalValores: 0,
			totalRechazado: 0,
			totalEnFecha: 0,
			hoy: new Date().getTime()
		};
	},
	methods: {
		getValores() {
			this.valores = [];
			this._valores = [];
			this.totalValores = 0;
			this.totalRechazado = 0;
			this.totalEnFecha = 0;
			fs
				.collection('valores')
				.orderBy('fecha')
				.onSnapshot(res => {
					res.forEach(valor => {
						if (valor.data().estado != 'cobrado') {
							this.totalValores += valor.data().importe;
						}
						if (valor.data().estado == 'rechazado') {
							this.totalRechazado += valor.data().importe;
						}

						const fechaLimiteCobro = moment(valor.data().fecha).add(25, 'days');
						const item = valor.data();
						item.$id = valor.id;
						item.fechaLimiteCobro = new Date(fechaLimiteCobro).getTime();

						if (!item.estado && item.fecha <= this.hoy && item.fecha <= item.fechaLimiteCobro) {
							this.totalEnFecha += item.importe;
						}

						this._valores.push(item);
						this.valores.push(item);
					});
				});
		},
		mostrarTodos() {
			this.getValores();
		},
		mostrarRechazados() {
			this.valores = this._valores;
			const rechazados = [];
			for (let x in this._valores) {
				if (this._valores[x].estado && this._valores[x].estado == 'rechazado') {
					rechazados.push(this._valores[x]);
				}
			}
			this.valores = rechazados;
		},
		mostrarPorVencer() {
			this.valores = this._valores;
			const porVencer = [];
			for (let x in this._valores) {
				const valor = this._valores[x];
				if (valor.estado != 'cobrado' && valor.fechaLimiteCobro <= this.hoy - 5 * 24 * 60 * 60 * 1000) {
					porVencer.push(valor);
				}
			}
			this.valores = porVencer;
		},
		mostrarEnFecha() {
			this.valores = this._valores;
			const enFecha = [];
			for (let x in this._valores) {
				const valor = this._valores[x];
				if (!valor.estado && valor.fecha <= this.hoy && valor.fecha <= valor.fechaLimiteCobro) {
					enFecha.push(valor);
				}
			}
			this.valores = enFecha;
		},
		ordenarPor(columna) {
			this.valores = _.sortBy(this.valores, [
				o => {
					return o[columna];
				}
			]);
		},
		rules(valor) {
			return {
				'valor-rechazado': valor.estado && valor.estado == 'rechazado',
				'valor-a-cobrar': !valor.estado && valor.fecha <= this.hoy && valor.fecha <= valor.fechaLimiteCobro,
				'valor-por-vencer': valor.estado != 'cobrado' && valor.fechaLimiteCobro <= this.hoy - 5 * 24 * 60 * 60 * 1000,
				'valor-cobrado': valor.estado && valor.estado == 'cobrado'
			};
		},
		cambiarEstado(id) {
			this.$router.push({ path: 'cambiar-estado/' + id });
		}
	},
	computed: {
		valoresFiltrados() {
			const busqueda = this.buscar;
			const from = new Date(this.range.from).getTime();
			const to = new Date(this.range.to).getTime();

			return this.valores.filter(item => {
				return (busqueda.indexOf(item.numero) !== -1 || item.descripcion.toLowerCase().search(busqueda.toLowerCase()) !== -1) && ((item.fecha >= parseInt(from) && item.fecha <= parseInt(to)) || item.estado == 'rechazado');
			});
		}
	},
	filters: {
		dateFormat(value) {
			return moment.unix(value / 1000).format('DD/MM/YYYY');
		},
		toFixed(value) {
			return parseFloat(value).toFixed(2);
		}
	},
	created() {
		this.getValores();
	}
};
</script>

<style lang="stylus" scoped>

	.consulta-topbar
		position fixed
		top 50px
		left 0

	.filter
		margin 10px 0
		padding 20px 0

	.content 
		padding-top: 30px

	.rechazado 
		cursor pointer
		margin-left 30px
		background-color red
		color #fff
		padding 0 10px

	.valor-rechazado 
		color red
	
	.valor-a-cobrar 
		color green
	
	.valor-por-vencer 
		color #ff7700
	
	.valor-cobrado
		color blue

	.indicadores
		max-width 1200px
		position fixed
		background-color #fff
		z-index 99
		padding 10px
		right 0
		top 33px
		text-right right
		ul
			list-style none
			padding 0
			li 
				min-width 190px
				display inline-table
				margin-right 5px
				float right

	.indicador {
		width 15px
		height 15px
		display inline-block
	}
	
	.cobrado 
		background-color blue
	
	.en-fecha-cobro
		background-color green
	
	.por-vencer
		background-color #ff7700

	.rech
		background-color red

	.a-cobrar
		background-color #000
		
	.filtro 
		cursor pointer
		&:hover
			text-decoration underline
	
</style>
