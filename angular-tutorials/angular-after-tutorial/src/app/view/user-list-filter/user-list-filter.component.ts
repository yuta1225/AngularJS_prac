import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserListFilter } from '../../state';

@Component({
  selector: 'user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.css']
})
export class UserListFilterComponent implements OnInit, OnDestroy {
  @Input() set value(value: UserListFilter) {
    this.setFormValue(value);
  }
  @Output() valueChange = new EventEmitter<UserListFilter>();

  form: FormGroup;

  private onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nameFilter: ['']
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private setFormValue(value: UserListFilter) {
    this.form.setValue(value, { emitEvent: false });
  }
}
