import { Component, OnInit } from '@angular/core';
import { MyNewServiceService } from './my-new-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private myNewServiceService: MyNewServiceService) { }

  title = 'Shibe Cards';
  cardData: any;
  activeCard: number;
  numberOfCards: number = 4;
  cardsPopulate: boolean = false;

  /**
   * Create the default cards.
   */
  ngOnInit() {
    this.cardData = [];
    for (let i = 0; i < this.numberOfCards; i++) {
      const newCard = this.createCard(i, null);
      this.cardData.push(newCard);
    }
  }

  /**
   * Make sure only one card is active at a time.
   * @param event Number of the card chosen.
   */
  onToggleState(event: number) {
    for (let i = 0; i < this.numberOfCards; i++) {
      let card = this.cardData[i];
      if (event === card['cardNumber']) {
        card['active'] = !card['active'];
      } else {
        card['active'] = false;
      }
    }
  }

  /**
   * On click event for the populate cards button.
   */
  populateCards() {
    this.myNewServiceService.getShibePictures(this.numberOfCards).then((result) => {
      this.cardData = [];
      for (let i = 0; i < this.numberOfCards; i++) {
        const newCard = this.createCard(i, result[i]);
        this.cardData.push(newCard);
      }
    });
    this.cardsPopulate = true;
  }

  /**
   * Increment the total number of cards, and if the cards have been populated,
   * fetch a new image for the card.
   */
  addCard() {
    this.numberOfCards++;
    let newCard;
    if (this.cardsPopulate) {
      this.myNewServiceService.getShibePictures(1).then((result) => {
        newCard = this.createCard(this.numberOfCards-1, result[0]);
        this.cardData.push(newCard);
      });
    } else {
      newCard = this.createCard(this.numberOfCards-1, null);
        this.cardData.push(newCard);
    }
  }

  /**
   * Create a new card.
   * @param num The number the card will be.
   * @param image An image for the card.
   */
  createCard(num: number, image: string) {
    const newCard = {
      'cardNumber': num,
      'imageUrl': image,
      'active': false
    }
    return newCard;
  }

}
