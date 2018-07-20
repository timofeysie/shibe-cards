# ShibeCards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# WNG – JavaScript Exercise

World Nomad Group JavaScript Excercise 1.


# Instructions

## *You have been asked by your Product Owner to write a single page JavaScript app. with the following requirements*

### The app displays four "cards" numbered 1 - 4. Cards should be 150px * 250px in size

### All the cards are initially “inactive”; inactive cards are red with no text

### Clicking on an inactive card makes it “active” - active cards are green and display the card's order (1-4) inside the card

### Clicking on an active card returns it to the inactive state

### A maximum of one card can be active at any given time


## *Your product owner asks you to add an additional feature to the app*

### When the user presses a button, populate each of the cards with images of Shiba Inu dogs

1. Use the [shibe.online API](http://shibe.online/) to populate the cards: http://shibe.online/ 

2. You’ll need to use [a proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md) to the backend.


### The cards should still display their order and turn green when clicked

### Allow users to add more cards if they choose


## Other Instructions

*You may choose any JavaScript framework you like, though the Product Owner would prefer Angular. Additionally, you may use any environment, build or UI tools you like.*

*Please try to spend no more than 2 to 3 hours on the exercise and return your work to us within several days. Push your code to git and forward the link to ed@worldnomads.com. We will use your work as a topic of conversation in your next interview.*

*Don’t hesitate to get in touch if you have any questions. Thanks for your effort and good luck.*


## Competition

A quick search turned up this repo by [Jay Isada](https://gitlab.com/jlisada/cards).  From a month ago it's a good bet it's from a similar test.  The service returns cats, and there are a few things missing.
 
Jay put all the code in one card file, including the service.  Also, there is no ```proxy.conf.json``` file, although it's not certain that Jay received the same instructions as those above.


## Getting Started

Getting started with the latest Angular CLI: ```+ @angular/cli@6.0.8```

Create the project ```ng new shibe-cards```

Create a service ```ng g s my-new-service```
```
Error compiling schema, function code: var customRule0 = customRules[0];var customRule1 = customRules[1]; 
...
 return data;            else throw new ValidationError(vErrors);  }; return validate;
Unexpected token function
```

Every time a new tab is opened in the terminal, it reverts back to node 6.

Next register the service as a provider.

The [Angular http page](https://angular.io/guide/http) has a load of steps after this that starts with 
```app/config/config.service.ts```:
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

    configUrl = 'assets/config.json';

    getConfig() {
        return this.http.get(this.configUrl);         // v1
        return this.http.get<Config>(this.configUrl); // v2
    }
}
```

There is a ```assets/config.json``` file:
```
{
  "heroesUrl": "api/heroes",
  "textfile": "assets/textfile.txt"
}
```

```app/config/config.component.ts```
```
showConfig() {
  this.configService.getConfig()
    .subscribe((data: Config) => this.config = {
        heroesUrl: data['heroesUrl'],
        textfile:  data['textfile']
    });
}

config: Config;

showConfig() {
  this.configService.getConfig()
    // v1
    .subscribe((data: Config) => this.config = {
        heroesUrl: data['heroesUrl'],
        textfile:  data['textfile']
    });
    // v2: clone the data object, using its known Config shape
    .subscribe((data: Config) => this.config = { ...data });
}
```

There is type-checking the response
```
.subscribe((data: Config) => this.config = {
    heroesUrl: data['heroesUrl'],
    textfile:  data['textfile']
});
```

And more.  But before getting too far ahead of ourselves, start from a working http call with the basics.  Then, we have our first picture the response url:
```
http://cdn.shibe.online/shibes/478bc7eb16eca2d9d74739087d56dbb8fdfbfeb0.jpg
```

The response just looks like an array, so type-checking would be an overkill here.  Let's just get on with the proxy for now.

### The Proxy

Since no backend is required, have to assume the API is the backend.  There is a brief discussion on the proxy link of how to do this in various forms on the Angular site.

There is a [tutorial on the subject here](https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/).  It states the reasons for doing this well: *Unless you’re creating some publicly consumable API and you inject the required CORS headers, you’ll most probably get some CORS exceptions.*

So instead of adding the proper CORS headers, take the browser request at the same domain+port where the frontend application runs and then forward that request to the API server. CORS is a browser issue and does not apply when doing backend to backend calls.

So we will be turning a call like this:
```http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false```

Into this:

```/api/shibes?count=1&urls=true&httpsUrls=false```

The ```proxy.conf.json``` file should look something like this:
```
{
  "/api/*": {
    "target": "http://shibe.online",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```

The Angular docs say:
*add the proxyConfig option to the serve target:*
```
"architect": {
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "your-application-name:build",
      "proxyConfig": "src/proxy.conf.json"
    },
```

The link provided in the instructions says *We do this by passing a file to --proxy-config*
So add that to the start script call in the package.json file.

However, the calls fail when running ```ng serve``` again.  Looked at [this StackOverlfow](https://stackoverflow.com/questions/39809008/angular-cli-proxy-to-backend-doesnt-work) answer and added this in the config:
```
"pathRewrite": {"^/api" : ""}
```

But then re-reading the Angular docs it also shows that we had to add the ```"proxyConfig": "proxy.conf.json"``` line in the angular.json file, although that file was not specified in the docs.  If you search for browserTarget, you will find that file.

Then however, this comes out in the startup log:
```
[HPM] Proxy rewrite rule created: "^/api" ~> ""
[HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
```

Forgot to remove the line from the StackOverflow answer.  Then the proxy works.


### Testing the service

Creating the first new test for this service, all the other tests are broken:
```
Chrome 67.0.3396 (Mac OS X 10.10.5) AppComponent should create the app FAILED
	  StaticInjectorError(Platform: core)[HttpClient]: 
	    NullInjectorError: No provider for HttpClient!
	Error: StaticInjectorError(DynamicTestModule)[HttpClient]: 
	    at NullInjector.push../node_modules/@angular/core/fesm5/core.js.NullInjector.get node_modules/@angular/core/fesm5/core.js:1034:1)
```

Just following [the http service testing documentation](https://angular.io/guide/http#testing-http-requests) wasn't enough.
Turns out this has to be imported in the component test class as well:
```
import { HttpClientTestingModule } from '@angular/common/http/testing';
```

It also has to be added to the ```TestBed.configureTestingModule``` imports array:
```
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]  
```

Then, after adding error handling and returning the result of the API call, the last two tests are failing:
```
Chrome 67.0.3396 (Mac OS X 10.10.5): Executed 4 of 6 SUCCESS (0 secs / 0.165 secs)
Chrome 67.0.3396 (Mac OS X 10.10.5) MyNewServiceService can test HttpClient.get FAILED
	Error: Expected one matching request for criteria "Match URL: /api/shibes?count=1&urls=true&httpsUrls=false", found none.
  ...
Chrome 67.0.3396 (Mac OS X 10.10.5) MyNewServiceService can test for 404 error FAILED
	Expected undefined to equal 404.  
```

We are getting the result as expected in the component.  But because we are returning a promise now, we have these problems.
 
However, as half the time allocated to this exercise has already passed, this will have to wait.  Once we have the core functionality down this will be a fun one to fix up.


#

### Notes

Aren't the dogs called 'shiba', not 'shebe'?

What else could be done?

A real world backend would most likely include more that just an image url in the response.  A data model with an interface should be used for the result of the API calls.  The service could do type checking like this ```return this.http.get<DataInterface>(```.

When it's clear what the app will be used for and how it can be organized, a directory structure could be created that suits the purpose and uses of the files.  If it's feature directories or grouped by type, that depends on if we are building a game, a tool, or whatever.


# 

# Original Readme 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
