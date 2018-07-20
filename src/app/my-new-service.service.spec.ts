import { TestBed, inject } from '@angular/core/testing';
import { MyNewServiceService } from './my-new-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

describe('MyNewServiceService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const shibeUrl: string = '/api/shibes?count=1&urls=true&httpsUrls=false';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MyNewServiceService ]
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([MyNewServiceService], (service: MyNewServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('can test HttpClient.get', () => {
    const testData: string =  'http://cdn.shibe.online/shibes/478bc7eb16eca2d9d74739087d56dbb8fdfbfeb0.jpg';
    httpClient.get(this.shibeUrl)
      .subscribe(data => {
          // When observable resolves, result should match test data
          console.log('data',data);
          expect(data).toEqual(testData)
        }
      );
    const req = httpTestingController.expectOne('/api/shibes');
  
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
  
    httpClient.get(this.shibeUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
  
    const req = httpTestingController.expectOne(this.shibeUrl);
  
    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

});
