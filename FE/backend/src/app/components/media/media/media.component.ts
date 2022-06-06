import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { mediaDB } from 'src/app/shared/tables/media';
import { MediaHomeService } from '../services/media-home.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  public media = [];

  constructor(private mediaService: MediaHomeService) {}

  public settings = {
    // hideSubHeader: true,
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    },
    columns: {
      img: {
        title: 'Image',
        type: 'html',
        filter: false,
      },
      name: {
        title: 'File Name',
      },
      url: {
        title: 'Url',
        filter: false,
      },
      alt: {
        title: 'Alt',
        filter: false,
      },
      size: {
        title: 'Size',
        filter: false,
      },
    },
  };

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  ngOnInit() {
    this.mediaService.getHomeMedia().subscribe((res) => {
      this.media = res;
    });
  }

  editConfirm(event) {
    this.mediaService.updateHomeMedia(event.newData).subscribe((res) => {
      this.media = this.media.map((obj) => {
        return obj.id === res.id ? res : obj;
      });
    });
  }

  delete(event) {
    console.log('delete', event.data);
    if (window.confirm('Are you sure you want to delete?')) {
      //event.confirm.resolve();
      //this.mediaService.deleteHomeMedia(event.data.id).subscribe((res) => {
      //   this.media = this.media.filter((obj) => {
      //     return obj.id !== res.id
      //   })
      // })
    } else {
      event.confirm.reject();
    }
  }

  create(event) {
    //TODO: capire come si fa
    console.log('create', event);
  }
}
