import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SpeakerListPage} from '../speaker-list/speaker-list';

import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {
    NavController,
    ToastController,
    MenuController,
    LoadingController,
    Loading
} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Component({
    selector: 'page-user',
    templateUrl: 'login.html'
})
export class LoginPage {
    login: { email?: string, password?: string } = {};
    submitted = false;
    test = false;

    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

    loading: Loading;
    registerCredentials = {email: '', password: ''};

    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: { email: string, password: string } = {
        email: null,
        password: null
    };

    // Our translated text strings
    private loginErrorString: string;

    constructor(public events: Events,
                public storage: Storage, public navCtrl: NavController,
                public user: UserData,
                public userData: UserData,
                public toastCtrl: ToastController,
                private menu: MenuController,
                private loadingCtrl: LoadingController) {

        this.loginErrorString = "Unable to sign in. Please check your account information and try again.";
        this.storage.get('hasLoggedIn')
            .then((hasLogin) => {
                if (hasLogin) {
                    this.navCtrl.setRoot(SpeakerListPage);
                } else {

                }

            });
    }

    onLogin(form: NgForm) {
        this.showLoading();
        this.submitted = true;

        this.user.login(this.login).subscribe((resp) => {
            this.loading.dismiss();
            this.menu.swipeEnable(true);

            this.navCtrl.setRoot(SpeakerListPage);
        }, (err) => {
            setTimeout(() => {
                this.loading.dismiss();
            });

            // this.navCtrl.push(MainPage);
            // Unable to log in
            let toast = this.toastCtrl.create({
                message: this.loginErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });


        if (form.valid && this.test) {
            this.userData.login(this.login.email);
            this.navCtrl.push(TabsPage);
        }
    }

    setUsername(username: string): void {
        this.storage.set('username', username);
    };

    getUsername(): Promise<string> {
        return this.storage.get('username').then((value) => {
            return value;
        });
    };

    showLoading() {

        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

}
