import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PushNotificationComponent } from '../push/notificacion';

@Component({
  selector: 'pomodoro-app',
  templateUrl: 'app/pomodoro/cuadro.html',
  directives: [ PushNotificationComponent ],
  providers: [ PushNotificationComponent ]
})

export class AppComponent {
	segundos: number       = 0;
	minutos: number        = 25;
	limite_minutos: number = 25;
	isPaused: boolean      = true;
	buttonLabel: string    = "Iniciar";
	icono: string          = "fa-play";
	temp_titulo: string    = "";
	historial: string      = "";

	constructor( public titulo: Title, public notificacion: PushNotificationComponent ){
		setInterval(() => this.tick(), 1000);

		//permiso para la notificación
		this.notificacion.requestPermission();

	}

	private tick(): void {
		if (!this.isPaused) {

			this.buttonLabel = 'Parar';
			this.icono       = "fa-stop";

			if ( --this.segundos < 0 ) {
				this.segundos = 59;
				if ( --this.minutos < 0 ) {
					this.resetTimer();
				}
			}

			if( this.minutos == 0 && this.segundos == 0 ) {
				this.notificacion.title = "¡Se termino el tiempo!";
				this.notificacion.body  = "El tiempo fue de " + this.limite_minutos + " minutos";
				this.notificacion.icon  = "http://icon-icons.com/icons2/37/PNG/128/alarmclock_alarm_3338.png";
				this.notificacion.show();

				//audio al finalizar los minutos
				var audio = new Audio();
				audio.src = "http://soundbible.com/mp3/Ship_Bell-Mike_Koenig-1911209136.mp3";
				audio.load();
				audio.play();

				this.setHistorial( "Fin: limite " + this.limite_minutos + " minuto" );
				console.log("Finalice");
			}

			this.temp_titulo = this.cerosIzq( this.minutos ) + ":" + this.cerosIzq( this.segundos ) + " Pomodoro";
			this.setTitulo( this.temp_titulo );

		}
	}

	public setTitulo( nuevo_titulo: string) {
		this.titulo.setTitle( nuevo_titulo );
	}

	resetTimer(): void {
		this.isPaused    = true;
		this.minutos     = this.limite_minutos;
		this.segundos    = 0;
		this.buttonLabel = 'Iniciar';
		this.icono       = 'fa-play';

		this.temp_titulo = this.cerosIzq( this.minutos ) + ":" + this.cerosIzq( this.segundos ) + " Pomodoro";
		this.setTitulo( this.temp_titulo );

	}


	togglePause(): void {
		this.isPaused = !this.isPaused;

		if( this.buttonLabel == 'Iniciar' ) {
			this.setHistorial( "Iniciar: limite " + this.limite_minutos + " minuto" );
		}

		if (this.minutos < 24 || this.segundos < 59) {
			this.buttonLabel = this.isPaused ? 'Reanudar' : 'Parar';
			this.icono       = this.isPaused ? 'fa-undo' : 'fa-stop';
		}
	}

	setLimite( minutos ){
		this.limite_minutos = minutos;
		this.resetTimer();
	}

	cerosIzq( numero ){
		let cadena:string = "";

		if(numero <= 9) {
			cadena = "0" + String( numero );
		}else{
			cadena = String( numero );
		}

		return cadena;
	}

	setHistorial( mensaje ){
		console.log("mensaje", mensaje);
		this.historial += mensaje + '<br />';
	}

}
