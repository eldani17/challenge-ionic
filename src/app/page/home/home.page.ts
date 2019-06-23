import { Component, ViewChild } from '@angular/core';
import { MyElement } from '../../interfaces/myelement.interfaces';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list : Array<MyElement>=[];
  textSearch='';
  newElement:MyElement={name:undefined};
  editFlag:boolean=false;
  indexEdit:number=-1;
  constructor(
    private listService: ListService,
    private toastCtrl:ToastController) {
    this.list = this.listService.list;
  }
  
  addElement(){
    if(this.newElement.name == undefined){
      this.presentToast('Required element.');
      return;
    }

    if (!this.listService.existElement(this.newElement)){
      if (this.editFlag){
        this.listService.editElement({name:this.newElement.name},this.indexEdit);
        this.clearInputElement();
        this.presentToast('Edited item');
      }else{
        this.listService.addElement({name:this.newElement.name}).then( () => {
          this.presentToast('Created item');
          this.newElement.name = undefined;
        });
      }
    }
    else{
      this.presentToast('Existing item');
    }
  }

  clearInputElement(){
    this.editFlag = false;
    this.indexEdit = -1;
    this.newElement.name = undefined;
  }

  // se pasa por referencia el argumento
  editElement( id:number){
    this.editFlag = true;
    this.newElement.name = this.list[id].name;
    this.indexEdit = id;
    this.presentToast('Modify the item');
  }

  closeElement(){
    this.clearInputElement();
  }
  
  deleteElement(id:number){
    //borro en mi array desde el elemento id 1 elemento
    this.list.splice(id,1);
    this.listService.saveList();
    this.presentToast('Item removed');
  }

  deleteAll(){
    this.list.splice(0,this.list.length);
    this.listService.saveList();
    this.presentToast('Item all removed');
  }

  reorder(event){
    //agarro el elemento que estoy moviendo, como devuelve un array, solo tomo el primer
    //elemento, por eso el [0]
    const itemMove = this.list.splice(event.detail.from, 1)[0];
    
    //reubico el elemento que movi
    this.list.splice(event.detail.to, 0, itemMove);
    event.detail.complete();

    //guardo en localStorage el movimiento de manera automatica
    this.listService.saveList();
  }

  printList(){
    console.log(this.list);
  }
  
  search(event){
    console.log(event);
    this.textSearch = event.detail.value;
  }

  async presentToast( message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

}
