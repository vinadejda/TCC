import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailValidator } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

@ViewChild('name') name;
@ViewChild('email') email;
@ViewChild('password') password;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public firebaseAuth: AngularFireAuth
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public registerUser(): void{
    this.firebaseAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(() => {
      this.firebaseAuth.auth.currentUser.updateProfile({
        displayName: this.name.value,
        photoURL: ""
      });
      this.showMessage("Usuário criado com sucesso!");
      //this.navCtrl.setRoot(TabsPage);
    })
    .catch((erro: any) => {
      this.showMessage(erro);
    })
  }

  private showMessage(message: string): void{
    let toast = this.toastCtrl.create(
      {
        duration: 3000,
        position: 'botton'
      }
    );
    toast.setMessage(message);
    toast.present();
  }
}
