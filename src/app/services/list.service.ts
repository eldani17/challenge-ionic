import { Injectable } from '@angular/core';
import { MyElement } from '../interfaces/myelement.interfaces';
import { Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  list: Array<MyElement>;
  
  constructor(
    private platform:Platform,
    private storage: Storage) { 

    this.getList();
  }

  createElement(){
    this.list = [
      {name: 'Lorem Ipsum is simply'},
      {name: 'dummy text of the printin'},
      {name: 'and typesetting industry.'},
      {name: 'Lorem Ipsum has been'},
      {name: 'the industry\'s standard dummy'},
      {name: 'text ever since the 1500s'},
      {name: 'when an unknown printer '},
      {name: 'took a galley'},
      {name: 'of type and scrambled'},
      {name: 'it to make a type specimen'},
      {name: 'book. It has'},
      {name: 'ng, remaining essentially'},
      {name: 'd web page editors now use'},
      {name: 'discovered the undoubtable sou'},
      {name: 'peat predefined chunks as ne'}
    ];
  }
  
  addElement(element:MyElement){
    return new Promise((resolve, reject) => {
      
      this.list.push(element);

      if (this.platform.is('cordova')){
        // mobile
        this.storage.set('list',this.list);
      }else{
        // pc
        this.saveList();
        resolve();
      }
    });
  }

  editElement(element:MyElement, id:number){
    return new Promise((resolve, reject) => {
      
      this.list[id].name = element.name;

      if (this.platform.is('cordova')){
        // mobile
        this.storage.set('list',this.list);
      }else{
        // pc
        this.saveList();
        resolve(true);
      }
    });
  }

  saveList(){
    if (this.platform.is('cordova')){
      // mobile
      this.storage.set('list',this.list);
    }else{
      // pc
      return localStorage.setItem('list', JSON.stringify(this.list));
    }
  }

  getList(){
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')){
        // mobile
        //retornar una promesa
        this.storage.get('list').then( result => {
          if (result){
            this.list = result;
            resolve(true);
          }else{
            this.list = [];
            resolve(true);
          }
        })
      }else{
        // pc
        if (localStorage.getItem('list')){
          this.list = JSON.parse(localStorage.getItem('list'));
          resolve();
        }else{
          this.list = [];
          this.saveList();
        }
      }
    });
  }

  existElement(element:MyElement){
    let exists:boolean=false;
    for (let e of this.list) {
      if(e.name == element.name)
      {
        exists = true;
        break;
      }
    }
    return exists;
  }
}
