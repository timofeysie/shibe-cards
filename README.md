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

Since no backend is required, have to assuem the API is the backend.  There is a bried discussion on the proxy link of how to do this in various forms on the Angular site.

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


### The cards should still display their order and turn green when clicked

### Allow users to add more cards if they choose


## Other Instructions

*You may choose any JavaScript framework you like, though the Product Owner would prefer Angular. Additionally, you may use any environment, build or UI tools you like.*

*Please try to spend no more than 2 to 3 hours on the exercise and return your work to us within several days. Push your code to git and forward the link to ed@worldnomads.com. We will use your work as a topic of conversation in your next interview.*

*Don’t hesitate to get in touch if you have any questions. Thanks for your effort and good luck.*


## Competition

https://gitlab.com/jlisada/cards
 
Jay put all the code in one card file, including the service.  Also, there is no ```proxy.conf.json``` file, although it's not certain that Jay received the same instructions as those above.


## Preparations

Get the latest Angular CLI: ```+ @angular/cli@6.0.8```

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
