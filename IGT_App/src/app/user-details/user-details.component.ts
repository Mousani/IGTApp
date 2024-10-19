import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { userModel } from './user.model';
import { UserDetailsService } from './user-details.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'igt-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule, MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,FormsModule ],
  providers: [UserDetailsService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  userList: any ;
  accordion = viewChild.required(MatAccordion);
  pageSizeOptions = [10, 20, 30, 40, 50, 100];
  pageEvent: PageEvent = new PageEvent;
  filterData: String = "";

  constructor(public userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.accordion().openAll();
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDetailsService.getUserDetails().subscribe((res: any) => {
      if (res?.code === 200) {
        this.userDetailsService.userListFromService = res.data;
        this.userList = [...this.userDetailsService.userListFromService];
        this.userDetailsService.paginationDetails = res?.meta?.pagination;
      } else {
        // Alerting user on error 
      }
    })
  }

  userDetailView(user: userModel) {
    // user detils Model 
  }

  filter(){
    console.log(this.filterData);
    this.userList = this.userDetailsService.userListFromService.filter(data => {
      return data.name?.toLocaleLowerCase().includes(this.filterData.toLocaleLowerCase())
    })
  }

  handlePageEvent(e: PageEvent) {
    this.filterData = '';
    this.pageEvent = e;
    this.userDetailsService.paginationDetails.pageIndex = this.pageEvent.pageIndex;
    this.userDetailsService.paginationDetails.pageSize = this.pageEvent.pageSize;
    this.getUserDetails();
  }

}
