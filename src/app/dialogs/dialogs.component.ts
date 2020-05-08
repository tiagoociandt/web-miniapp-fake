import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  messageFormControl = new FormControl('', [Validators.required]);
  matcher = new MessageMatcher();

  message: string;

  constructor(private router: Router,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  showAlert() {
    const message = this.messageFormControl.value;
    if (message) {
      alert(message);
    }
  }

  showConfirm(): void {
    const message = this.messageFormControl.value;
    if (message) {
      const result = confirm(message);
      if (result) {
        this.snack.open('👍', '', {
          duration: 2000
        });
      } else {
        this.snack.open('👎', '', {
          duration: 2000
        });
      }
    }
  }

  showPrompt(): void {
    const message = this.messageFormControl.value;
    if (message) {
      const result = prompt(message, 'Passe o valor aqui');
      if (result) {
        this.snack.open(result, '', {
          duration: 2000
        });
      } else {
        this.snack.open('🛑 no result', '', {
          duration: 2000
        });
      }
    }
  }
}

export class MessageMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
