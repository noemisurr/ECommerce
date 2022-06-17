import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IMediaHome } from "../interfaces/home.interface";

@Injectable()
export class HomeService {
  background: SafeStyle
  sliders = [];
  collections = [];
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getAllMedia(): Observable<void> {
    return this.http
      .get<IMediaHome[]>(`${environment.apiUrl}/backoffice/settings_home`)
      .pipe(map((res) => {
        res.forEach((media) => {
          if (parseInt(media.id_position) == 1) {
            this.background = this.sanitizer.bypassSecurityTrustStyle('url(' + media.url + ')')
          }
          if (parseInt(media.id_position) == 2) {
            this.sliders.push({
              title: "furniture sofa",
              subTitle: media.name,
              image: media.url,
            });
          }
          if (parseInt(media.id_position) == 3) {
            this.collections.push({
              image: media.url,
              save: "save 50%",
              title: media.name,
              link: "/home/left-sidebar/collection/furniture",
            });
          }
        });
      }));
  }
}
