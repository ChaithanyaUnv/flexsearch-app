import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonList } from '@ionic/angular/standalone';
import { FlexService } from 'src/services/flex.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import FlexSearch from 'flexsearch';
@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonList, FormsModule, CommonModule],
  templateUrl: 'home.page.html'
})
export class HomePage {
  query = '';
  results: any[] = [];

  constructor(private flexService: FlexService) {}

  async onSearch() {
    if (this.query.trim()) {
      this.results = await this.flexService.search(this.query);
      console.log('Raw search results:', this.results);
    } else {
      this.results = [];
    }
  }
}
