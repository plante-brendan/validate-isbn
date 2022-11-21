import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ValidationService } from "./validateISBN.service";

describe('Validation Service', () => {
    let httpClientSpyObject: jasmine.SpyObj<HttpClient>;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let validationService: ValidationService;
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
    beforeEach(() => {
        httpClientSpyObject = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                ValidationService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpyObject,
                },
            ],
        });
        validationService = TestBed.inject(ValidationService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    describe('validateTenDigitISBN(rawISBN: string)', () => {
        
        it('should validate a ten digit ISBN when called', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(result));
            validationService.validateTenDigitISBN("007462542X").subscribe({
                next: (validationResult) => {
                    expect(validationResult).toEqual(result);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });

        it('should validate a thirteen digit ISBN when called', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(result));
            validationService.validateThirteenDigitISBN("ISBN 978 186197 27 1 2").subscribe({
                next: (validationResult) => {
                    expect(validationResult).toEqual(result);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });

        it('should validate a ten digit ISBN when called fail case', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(resultFail10));
            validationService.validateTenDigitISBN("007462542X4").subscribe({
                next: (validationResult) => {
                    expect(validationResult).toEqual(resultFail10);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });

        it('should validate a thirteen digit ISBN when called fail case', (done: DoneFn) => {
            httpClientSpy.get.and.returnValue(of(resultFail13));
            validationService.validateThirteenDigitISBN("ISBN 978 186197 27 1 24").subscribe({
                next: (validationResult) => {
                    expect(validationResult).toEqual(resultFail13);
                    done();
                },
                error: () => {
                    done.fail;
                }
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });        

    });

});