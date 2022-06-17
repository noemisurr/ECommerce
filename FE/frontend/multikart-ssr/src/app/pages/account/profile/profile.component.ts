import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0;
  editMode: boolean = false
  meForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    telephone: ['', Validators.required],
    birth: ['', Validators.required],
    addresses: this.fb.array([])
  })

  get addresses() {
    return (this.meForm.get('addresses') as FormArray).controls;
  }

  constructor(private authService: AuthService, private fb: FormBuilder, private modal: NzModalService) { }

  ngOnInit(): void {
    this.authService.me().subscribe((res) => {
      this.meForm.patchValue(res)

      res.address.forEach((address) => {
        const addressGroup = this.meForm.get('addresses') as FormArray

        addressGroup.push(this.fb.group({
          flat: address.flat,
          address: address.address,
          city: address.city,
          cap: address.cap,
          region: address.region,
          other: address.other,
          default: address.default
        }))

        addressGroup.disable()
        
      })
    })
    // this.addressDisable()
    this.meForm.disable()
  }

  onEdit() {
    this.editMode = true;
    this.meForm.enable();
    (this.meForm.get('addresses') as FormArray).enable();
  }

  onSave() {
    this.editMode = false;
    this.meForm.disable();
    (this.meForm.get('addresses') as FormArray).disable()
    this.authService.updateUser(this.meForm.value).subscribe((res) => {
      const modal = this.modal.success({
        nzTitle: 'User Updated',
      });
  
      setTimeout(() => modal.destroy(), 2000);
    })
  }

  onCancel() {
    this.editMode = false;
    this.meForm.disable();
    (this.meForm.get('addresses') as FormArray).disable()
  }

  closeTab({ index }: { index: number }) {
    (this.meForm.get('addresses') as FormArray).removeAt(index);
  }

  newTab(): void {
    (this.meForm.get('addresses') as FormArray).push(
      this.fb.group({
        flat: [''],
          address: ['', [Validators.required]],
          city: ['', [Validators.required]],
          cap: ['', [Validators.required]],
          region: ['', [Validators.required]],
          other: [''],
          default: [false]
      })
    );

    this.selectedIndex = (
      this.meForm.get('addresses') as FormArray
    ).length;
  }

}
