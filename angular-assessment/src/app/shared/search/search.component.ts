import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Store} from "@ngrx/store";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {debounce} from "rxjs/operators";
import {interval} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(public store:Store<{store:any}>, private form: UntypedFormBuilder) {}
  searchForm!: UntypedFormGroup;
  searchValue:any;
  @Output() dataFromChild = new EventEmitter<string>();
  ngOnInit(): void {
    this.searchForm = this.form.group({
      search: [null]
    });
    this.searchForm.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe((data:any) => this.dataFromChild.emit(data.search));
  }
}
