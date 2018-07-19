import { TestBed, inject } from '@angular/core/testing';
import { MyNewServiceService } from './my-new-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

describe('MyNewServiceService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MyNewServiceService ]
    }).compileComponents();
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([MyNewServiceService], (service: MyNewServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('can test HttpClient.get', () => {
    const testData: string[] =  ['http://cdn.shibe.online/shibes/478bc7eb16eca2d9d74739087d56dbb8fdfbfeb0.jpg'];
    const shibeUrl: string = '/api/shibes?count=1&urls=true&httpsUrls=false';
    httpClient.get(shibeUrl)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne('/api/shibes?count=1&urls=true&httpsUrls=false');
  
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
    httpTestingController.verify();
  });
  
});
