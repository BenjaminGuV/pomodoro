import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pomodoro-app',
  templateUrl: 'app/pomodoro/cuadro.html'
})

export class AppComponent {
	segundos: number       = 0;
	minutos: number        = 25;
	limite_minutos: number = 25;
	isPaused: boolean      = true;
	buttonLabel: string    = "Iniciar";
	icono: string          = "fa-play";

	constructor( public titulo: Title ){
		setInterval(() => this.tick(), 1000);
	}

	private tick(): void {
		if (!this.isPaused) {
			this.buttonLabel = 'Parar';
			this.icono       = "fa-stop";
			this.setTitulo( String( this.segundos ) );

			if ( --this.segundos < 0 ) {
				this.segundos = 59;
				if ( --this.minutos < 0 ) {
					this.resetTimer();
				}
			}
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
