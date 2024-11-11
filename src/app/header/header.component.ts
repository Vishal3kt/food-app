import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  userName: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    const storedData = localStorage.getItem('userInfo') || '';
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const token = parsedData?.token;
      this.userName = parsedData?.admin?.firstName + ' ' + parsedData?.admin?.lastName

      if (token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }

  }

  logout() {
    this.api.logoutAdmin().subscribe({
      next: (res: any) => {
        localStorage.clear();
      }
    })
  }

}
