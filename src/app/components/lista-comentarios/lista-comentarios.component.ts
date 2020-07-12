import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AlertController } from '@ionic/angular';
import { ComentarioService } from 'src/app/services/comentario.service';


@Component({
  selector: 'app-lista-comentarios',
  templateUrl: './lista-comentarios.component.html',
  styleUrls: ['./lista-comentarios.component.scss'],
})
export class ListaComentariosComponent implements OnInit {

  @Input() comentarios: Comentario[] = [];
  @Input() usuario: Usuario;
  @Input() sitioId: string;
  @Output() enviarComentarios = new EventEmitter<Comentario[]>()

  constructor(private alertController: AlertController, private comentarioService: ComentarioService) { }

  ngOnInit() {}

  async mostrarFormaBorrarComentario(comentarioId: string, sitioId: string, index: number) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      // header: '',
      message: '¿Está seguro de eliminar el comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.borrarComentario(comentarioId, sitioId);

          }
        }
      ]
    });

    await alert.present();
  }

  borrarComentario(comentarioId: string, sitioId: string) {
    this.comentarioService.borrarComentario(comentarioId, sitioId).subscribe(resp => {
      if (resp['ok']) {
        this.comentarios = resp['sitio'].comentarios;
        this.enviarComentarios.emit(this.comentarios);
      }
    })
  }

}
