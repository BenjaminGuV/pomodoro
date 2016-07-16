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

	public notification: any = {
		show: false,
		title: 'New Angular 2 Library!',
		body: 'ng2-notifications',
		icon: 'https://goo.gl/3eqeiE',
		action: function () {
	  		window.open('https://github.com/alexcastillo/ng2-notifications');
		}
	};

	constructor( public titulo: Title, public notificacion: PushNotificationComponent ){
		setInterval(() => this.tick(), 1000);
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
				console.log("termine");
			}

			this.temp_titulo = String( this.minutos ) + ":" + String( this.segundos ) + " Pomodoro";
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

		this.temp_titulo = String( this.minutos ) + ":" + String( this.segundos ) + " Pomodoro";
		this.setTitulo( this.temp_titulo );

	}


	togglePause(): void {
		this.isPaused = !this.isPaused;
		if (this.minutos < 24 || this.segundos < 59) {
			this.buttonLabel = this.isPaused ? 'Reanudar' : 'Parar';
			this.icono       = this.isPaused ? 'fa-undo' : 'fa-stop';
		}
	}

	setLimite( minutos ){
		this.limite_minutos = minutos;
		this.resetTimer();
	}

}
