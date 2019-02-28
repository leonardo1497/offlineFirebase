import { Component, OnInit } from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  jovenesFormGroup : FormGroup;
  estadoConexion = true;
  ref = firebase.database().ref();
  constructor(
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private network: Network,){
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          let tamSt = parseInt(this.storage.length()+'')
          if(tamSt>0){
            this.storage.forEach(element => {
              let insert = this.ref.push();
              insert.set(element);  
            });
            this.storage.clear();
          }
          this.estadoConexion=true;
        }
        if (this.network.type === 'none') {
          console.log('none');
          this.estadoConexion=false;
        }
      }, 3000);
    });
    console.log(connectSubscription)

    }
  ngOnInit() {
    this.jovenesFormGroup = this.formBuilder.group({
      'nombre':['',Validators.required],
      'edad':['',Validators.required],
      'sexo':['',Validators.required],
      'ocupacion':['',Validators.required],
      'ciudad':['', Validators.required]
    });
  
  }

  localToFirebase(){}
  async guardarDatos(){
    console.log(this.network.type)
    console.log(this.jovenesFormGroup.value)
    if(this.estadoConexion){
      let insert = this.ref.push();
      insert.set(this.jovenesFormGroup.value);   
      this.jovenesFormGroup = this.formBuilder.group({
        'nombre':['',Validators.required],
        'edad':['',Validators.required],
        'sexo':['',Validators.required],
        'ocupacion':['',Validators.required],
        'ciudad':['',Validators.required]
      }); 
    }else{
      this.storage.set('registro',this.jovenesFormGroup.value);
      console.log("local")
    }
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Registro exitoso',
      message: 'Datos guardados correctamente',
      buttons:['OK']
    });
    await alert.present();
  }

}
