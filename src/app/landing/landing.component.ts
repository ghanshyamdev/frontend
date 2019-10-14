import {AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import { HttpCallsService } from '../shared/services/http-calls.service';
import {arrayify} from 'tslint/lib/utils';
declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    @ViewChild('owlnext', {static: true}) owlNext: any;

  carouselOptions = {
    margin: 25,
    nav: true,
    dots: false,
    navText: [
      "<div class='nav-btn prev-slide'></div>",
      "<div id='divLastCarousel' class='nav-btn next-slide'></div>"
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      768: {
        items: 2,
        nav: true
      },
      1025: {
        items: 3,
        nav: true,
        loop: false
      },
      1200: {
        items: 4,
        loop: false
      }
    }
  };

  articles  = [];
  isRecordAvailable: any = true;
  currentPage: any  = -1;
  numberOfRecordsForEachPage: any = 15;
  isAPICallInProgress: any = false;
  constructor(private service: HttpCallsService) { }

  ngOnInit() {
    setTimeout(this.myJquery, 500);
    this.callAPI();

  }
  callAPI =  () => {
    if (!this.isAPICallInProgress && this.isRecordAvailable){
      this.isAPICallInProgress = true;
       this.service.loadArticles(++this.currentPage, this.numberOfRecordsForEachPage)
      .then((data) => {
        if (data.length === 0)
          this.isRecordAvailable = false;
        this.isAPICallInProgress = false;
         this.articles.push(...data);
      })
      .catch((error) => {
        this.isAPICallInProgress = false;
        --this.currentPage;
        console.error('LandingComponent : ngOnInit : Error : ', error);
      });
    }
  }

  myJquery = () => {
// Select the node that will be observed for mutations
    const targetNode = document.getElementsByClassName('owl-next')[0];

// Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: false, subtree: false };

// Callback function to execute when mutations are observed
    const callback = async (mutationsList, observer) => {
      const mutation = mutationsList[0];
        if (mutation.type === 'attributes') {          
          if (mutation.target.classList[1] === 'disabled'){            
            this.callAPI()
          }          
        }
    };

// Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }



}
