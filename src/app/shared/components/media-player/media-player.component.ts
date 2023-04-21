import { Element } from '@angular/compiler';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //PROGRAMACION REACTIVA

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  @ViewChild('progressBar') progressBar:ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  constructor(public asMultimediaService: MultimediaService) {}

  ngOnInit(): void {
    
    const Observer1$ = this.asMultimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [Observer1$]
  }


  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('SE DESTRUYE EL MEDIAPLAYER - FIN DEL CICLO DE VIDA DEL COMPONENTE');
    
  }


  // AQUI ESTA LA BARRA DE PROGRESO
  handlePosition(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar.nativeElement
    const {clientX} = event
    const {x, width} = elNative.getBoundingClientRect()
    const clickX = clientX - x
    const percentageFromX = clickX*100 / width

    console.log(`(CLICK % eje x):${percentageFromX}, WIDTH , ${width}, Width Inicial, ${x}`);
    this.asMultimediaService.seekAudio(percentageFromX)
  }
}
