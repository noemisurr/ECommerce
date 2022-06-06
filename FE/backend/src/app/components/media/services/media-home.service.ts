import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsHome } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaHomeService {

  constructor(private http: HttpClient) { }

  //TODO: mappare gli id_position dei media così da mostrarlo nel FE

  getHomeMedia() {
    return this.http.get<SettingsHome[]>(`${environment.apiUrl}/backoffice/settings_home`)
  }

  updateHomeMedia(settings: SettingsHome) {
    return this.http.put<SettingsHome>(`${environment.apiUrl}/backoffice/settings_home/${settings.id}`, settings)
  }

  createHomeMedia(settings: SettingsHome) {
    return this.http.post<SettingsHome>(`${environment.apiUrl}/backoffice/settings_home`, settings)
  }

  deleteHomeMedia(id: string) {
    return this.http.delete<SettingsHome>(`${environment.apiUrl}/backoffice/settings_home/${id}`)
  }

}
