import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {

    this.audio = new Audio()


    this.trackInfo$.subscribe(ResponseOk => {
      if (ResponseOk) {
        this.setAudio(ResponseOk)
      }
    })
    
    this.listenALLevents()
  }

  private listenALLevents(): void {
    
    this.audio.addEventListener('timeupdate',this.calculateTime, false)
    this.audio.addEventListener('playing',this.setPlayerStatus, false)
    this.audio.addEventListener('play',this.setPlayerStatus, false)
    this.audio.addEventListener('paused',this.setPlayerStatus, false)
    this.audio.addEventListener('pause',this.setPlayerStatus, false)
    this.audio.addEventListener('ended',this.setPlayerStatus, false)
  }

  private setPlayerStatus = (state: any) => {
    console.log("STATE", state);
    switch (state.type) { //EL ESTADO SI SE ESTA REPRODUCIENDO PLAYING; PLAYED; PAUSED; ENDED
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      case 'pause':
        this.playerStatus$.next('paused')
        break;
      default:
        this.playerStatus$.next('pause')
        break;

    }
  }

  private calculateTime = () => {
    // console.log('Disparando Evento');
    const {duration, currentTime} = this.audio
    // console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)

  }

  private setTimeElapsed (currentTime: number): void{
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60)% 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining (currentTime: number, duration: number): void{
    let timeLeft = duration - currentTime;
    
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60)% 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }


  public setAudio(track: TrackModel): void {
    const apiUrl = 'http://localhost:3001'; // reemplaza con la URL base de tu API
    const trackUrl = track.url; // asumimos que track.url contiene el path de la URL del track (ej: '/tracks/123')
    const fullUrl = `${apiUrl}${trackUrl}`; // concatenamos las dos URLs para formar la URL completa
  
    console.log('AUDIOOO', fullUrl);
    this.audio.src = fullUrl;
    this.audio.play();
  }

  public  togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }
  
  public seekAudio(percentage:number) : void{
    //ESTOY DANDO CLICK AL 5% DE LA BARRA --> lo llevamos al segundo de la cancion
    const {duration} = this.audio
    console.log(`Duration: ${duration}, Percentage: ${percentage}`);
    
    const percentageToSecond = percentage*duration / 100
    console.log('tiempo',percentageToSecond);

    this.audio.currentTime = percentageToSecond
    
  }
  
}
