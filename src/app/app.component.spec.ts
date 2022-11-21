import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { delay, of } from 'rxjs';
import { AppComponent } from './app.component';
import { ValidationService } from './validateISBN.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let result = 
  {
        valid: true,
        message: "Valid ISBN"
  };
  let resultFail13 = 
  {
      valid: false,
      message: "This ISBN violates one of the formatting rules of the 13 digit ISBN"
  };
  let resultFail10 = 
  {
      valid: false,
      message: "This ISBN violates one of the formatting rules of the 10 digit ISBN"
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        ValidationService,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  /*beforeEach(async () => {
    await 
  });*/

  it('should create the app', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    //const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'validate-isbn'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('validate-isbn');
  });

  it('should check that tenForm input exists', () => {
    expect(de.query(By.css('#rawISBNTen'))).toBeTruthy();
  });

  it('should check that thirteenForm input exists', () => {
    expect(de.query(By.css('#rawISBNThirteen'))).toBeTruthy();
  });

  it('should have the validate button on tenForm', () => {
    expect(de.query(By.css('#tenFormSubmit'))).toBeTruthy();
  });

  it('should have the validate button on thirteenForm', () => {
    expect(de.query(By.css('#thirteenFormSubmit'))).toBeTruthy();
  });

  it('Set Input to TenForm value', async () => {
    const input = de.query(By.css('#rawISBNTen'));
    input.nativeElement.value = '007462542X';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput : ', input.nativeElement.value);
      expect(input.nativeElement.value).toContain('007462542X');
    });
  });

  it('Set Input to ThirteenForm value', async () => {
    const input = de.query(By.css('#rawISBNThirteen'));
    input.nativeElement.value = 'ISBN 978 186197 27 1 2';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      console.log('sendInput : ', input.nativeElement.value);
      expect(input.nativeElement.value).toContain('ISBN 978 186197 27 1 2');
    });
  });

  it('calls onSubmitTenDigitISBN and returns correctly', fakeAsync (() => {
    let validationService = de.injector.get(ValidationService);
    let rawISBN: string = "007462542X";
    let stub = spyOn(validationService, "validateTenDigitISBN").and.callFake((rawISBN) => {
      return of(result).pipe(delay(300));
    })
    component.validateTenDigitISBN(rawISBN);
    expect(component.tenDigitSuccessAlert).toEqual(false);
    tick(300);
    expect(component.tenDigitSuccessAlert).toEqual(true);
    component.tenDigitISBN = rawISBN;
    fixture.detectChanges();
    expect(de.query(By.css('#tenSuccess'))).toBeTruthy();
  }));

  it('calls onSubmitThirteenDigitISBN and returns correctly', fakeAsync (() => {
    let validationService = de.injector.get(ValidationService);
    let rawISBN: string = "ISBN 978 1 861 97271 2";
    let stub = spyOn(validationService, "validateThirteenDigitISBN").and.callFake((rawISBN) => {
      return of(result).pipe(delay(300));
    })
    component.validateThirteenDigitISBN(rawISBN);
    expect(component.thirteenDigitSuccessAlert).toEqual(false);
    tick(300);
    expect(component.thirteenDigitSuccessAlert).toEqual(true);
    fixture.detectChanges();
    expect(de.query(By.css('#thirteenSuccess'))).toBeTruthy();
  }));

  it('calls onSubmitTenDigitISBN and returns correctly', fakeAsync (() => {
    let validationService = de.injector.get(ValidationService);
    let rawISBN: string = "007462542X4";
    let stub = spyOn(validationService, "validateTenDigitISBN").and.callFake((rawISBN) => {
      return of(resultFail10).pipe(delay(300));
    })
    component.validateTenDigitISBN(rawISBN);
    expect(component.tenDigitFailureAlert).toEqual(false);
    tick(300);
    expect(component.tenDigitFailureAlert).toEqual(true);
    fixture.detectChanges();
    expect(de.query(By.css('#tenFailure'))).toBeTruthy();
  }));

  it('calls onSubmitThirteenDigitISBN and returns correctly', fakeAsync (() => {
    let validationService = de.injector.get(ValidationService);
    let rawISBN: string = "ISBN 978 1 861 97271 2";
    let stub = spyOn(validationService, "validateThirteenDigitISBN").and.callFake((rawISBN) => {
      return of(resultFail13).pipe(delay(300));
    })
    component.validateThirteenDigitISBN(rawISBN);
    expect(component.thirteenDigitFailureAlert).toEqual(false);
    tick(300);
    expect(component.thirteenDigitFailureAlert).toEqual(true);
    fixture.detectChanges();
    expect(de.query(By.css('#thirteenFailure'))).toBeTruthy();
  }));









});
