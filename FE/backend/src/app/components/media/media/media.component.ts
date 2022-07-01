import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SettingsHome } from 'src/app/shared/interfaces/interface';
import { MediaHomeService } from '../services/media-home.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };
  newMedia = {
    name: "",
    url: "",
    alt: "",
    size: "",
    id_position: ""
  }

  settings: SettingsHome[] = [];
  edit = new Map<number, { edit: boolean; data: SettingsHome }>();

  constructor(private mediaService: MediaHomeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.mediaService.getHomeMedia().subscribe((res) => {
      this.settings = res;
      console.log(res)
      this.updateEditCache();
    });
  }

  startEdit(id: number): void {
    this.edit.get(id).edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.settings.findIndex(item => item.id === id);
    this.edit.set(id, {
      data: { ...this.settings[index] },
      edit: false
    })
  }

  saveEdit(id): void {
    this.mediaService.updateHomeMedia(this.edit.get(id).data).subscribe((res) => {
      const index = this.settings.findIndex(item => item.id === id);
      Object.assign(this.settings[index], res);
      this.edit.get(id).edit = false
    })
  }

  updateEditCache(): void {
    this.settings.forEach(item => {
      this.edit.set(item.id, {
        edit: false,
        data: {...item}
      })
    });
  }

  createMedia() {
    this.mediaService.createHomeMedia(this.newMedia).subscribe((res) => {
      this.settings = [res, ...this.settings];
    })
  }

  delete(id: number) {
    this.mediaService.deleteHomeMedia(id).subscribe((res) => {
      this.settings = this.settings.filter((setting) => setting.id !== id)
    })
  }
  
}
