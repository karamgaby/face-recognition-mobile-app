import {Component} from '@angular/core';

import {AlertController, NavController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {SupportPage} from '../support/support';
import {UserData} from '../../providers/user-data';


@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    username: any;

    constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

    }

    ngAfterViewInit() {
        this.getUsername();
    }


    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    changeUsername() {
        let alert = this.alertCtrl.create({
            title: 'Change Username',
            buttons: [
                'Cancel'
            ]
        });
        alert.addInput({
            name: 'username',
            value: this.username,
            placeholder: 'username'
        });
        alert.addButton({
            text: 'Ok',
            handler: (data: any) => {
                this.userData.setUsernames(data.username).then(()=>{
                    this.getUsername();

                });

            }
        });

        alert.present();
    }

    getUsername() {
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
    }

    changePassword() {
        console.log('Clicked to change password');
    }

    logout() {
        this.userData.logout();
        this.nav.setRoot(LoginPage);
    }

    support() {
        this.nav.push(SupportPage);
    }
}
