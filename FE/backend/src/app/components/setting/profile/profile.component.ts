import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact, User } from 'src/app/shared/interfaces/interface';
import { AuthService } from '../../auth/services/auth.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User
  buttonLabel: string = 'Modify'
  contactForm = this.fb.group({
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postal_code: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
  })

  constructor(private authService: AuthService, private settingsService: SettingsService, private fb: FormBuilder) { }

  get email() {
    return this.contactForm.get('email')
  }

  get address() {
    return this.contactForm.get('address')
  }

  get city() {
    return this.contactForm.get('city')
  }

  get postal_code() {
    return this.contactForm.get('postal_code')
  }

  get telephone() {
    return this.contactForm.get('telephone')
  }

  ngOnInit() { 
    this.authService.me().subscribe((res: User) => {
      this.user = res
    })

    this.settingsService.getSettings().subscribe((res: Contact[]) => {
      this.contactForm.patchValue(res[0])
      this.contactForm.disable()
    })
  }

  modifyContact() {
    console.log(this.buttonLabel)
    if( this.buttonLabel === 'Modify' ){
      this.contactForm.enable()
      this.buttonLabel = 'Save'
    }else{
      this.settingsService.updateSettings(this.email.value, this.address.value, this.city.value, this.postal_code.value, this.telephone.value).subscribe((res) => {
        console.log(res)
      })
      this.buttonLabel = 'Modify'
      this.contactForm.disable()
    }
  }



}
