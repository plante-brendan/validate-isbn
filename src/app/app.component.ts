import { Component, OnInit } from '@angular/core';
import { ValidationResult } from './validationResult';
import { ValidationService } from './validateISBN.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tenDigitISBN: string = "";
  thirteenDigitISBN: string = "";
  tenDigitSuccessAlert: boolean = false;
  tenDigitFailureAlert: boolean = false;
  thirteenDigitSuccessAlert: boolean = false;
  thirteenDigitFailureAlert: boolean = false;
  tenDigitFailureReason: string = "";
  thirteenDigitFailureReason: string = "";
  title: string = "validate-isbn";

  constructor(private validateISBNService: ValidationService){}

  ngOnInit() {}

  /**
   * This method takes in the form after submission and uses its input
   * The input is used to set the new tenDigitISBN that will be displayed to the user.
   * It also clears out the form for the user's convenience.
   * Lastly it passes input in string form on to be used to call the service
   * @param tenForm 
   */
  public onSubmitTenDigitISBN(tenForm: NgForm) {
    this.tenDigitISBN = tenForm.value.rawISBN;
    tenForm.reset();
    this.validateTenDigitISBN(this.tenDigitISBN);
  }

  /**
   * This method takes in a string and uses it to call the service.
   * Additionally, the previous response is cleared from the screen to make way for the new one
   * The service gets the response from the backend.
   * The response from the service is used to display the appropriate outcome for the user
   * @param rawISBN
   */
  public validateTenDigitISBN(rawISBN: string) : void {
    this.closeTenDigitFailureAlert();
    this.closeTenDigitSuccessAlert();
    this.validateISBNService.validateTenDigitISBN(rawISBN).subscribe({
      next: (response: ValidationResult) => {
        console.log(response);
        if(response.valid === true) {
          this.tenDigitSuccessAlert = true;
        }
        else {
          this.tenDigitFailureReason = response.message;
          this.tenDigitFailureAlert = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message);
      }
    });
  }

   /**
   * This method takes in the form after submission and uses its input
   * The input is used to set the new thirteenDigitISBN that will be displayed to the user.
   * It also clears out the form for the user's convenience.
   * Lastly it passes input in string form on to be used to call the service
   * @param thirteenForm 
   */
  public onSubmitThirteenDigitISBN(thirteenForm: NgForm) {
    this.thirteenDigitISBN = thirteenForm.value.rawISBN;
    thirteenForm.reset();
    this.validateThirteenDigitISBN(this.thirteenDigitISBN);
  }

    /**
   * This method takes in a string and uses it to call the service.
   * Additionally, the previous response is cleared from the screen to make way for the new one
   * The service gets the response from the backend.
   * The response from the service is used to display the appropriate outcome for the user
   * @param rawISBN
   */
  public validateThirteenDigitISBN(rawISBN: string) : void {
    this.closeThirteenDigitFailureAlert();
    this.closeThirteenDigitSuccessAlert();
    this.validateISBNService.validateThirteenDigitISBN(rawISBN).subscribe({
      next: (response: ValidationResult) => {
        console.log(response);
        if(response.valid === true) {
          this.thirteenDigitSuccessAlert = true;
        }
        else {
          this.thirteenDigitFailureReason = response.message;
          this.thirteenDigitFailureAlert = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message);
      }
    });
  }

  //These methods are used to close the previous results to make way for the new
  public closeTenDigitSuccessAlert(): void {
    this.tenDigitSuccessAlert = false;
  }

  public closeTenDigitFailureAlert(): void {
    this.tenDigitFailureAlert = false;
  }

  public closeThirteenDigitSuccessAlert(): void {
    this.thirteenDigitSuccessAlert = false;
  }

  public closeThirteenDigitFailureAlert(): void {
    this.thirteenDigitFailureAlert = false;
  }
}
