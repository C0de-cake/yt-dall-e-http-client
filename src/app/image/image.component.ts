import {Component, OnInit} from '@angular/core';
import {ImageService} from "./image.service";
import {Image} from "./image";
import {RequestImage} from "./request-image";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  public generatedImage = '';

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    const requestImage: RequestImage = {
      prompt: "A cute cat",
      n: 1,
      size: '256x256'
    }

    this.imageService.fetchImageByPrompt(requestImage)
      .pipe(
        map(res => res.body),
        map(image => image!.data),
        filter(images => images.length != 0)
      )
      .subscribe(images => {
        this.generatedImage = images[0].url;
      });
  }
}
