import { HttpClient } from '@angular/common/http';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/models/app.state';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AddProductAction, GetProductAction } from '../product.actions';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.page.html',
  styleUrls: ['./product-creation.page.scss'],
})
export class ProductCreationPage implements OnInit {
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader = new FileUploader({url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`});;
  private title: string;

  categories:any = [];
  private readonly subsc = new Subscription();
  itemToBeAdded:any = {};
  constructor(private productService:ProductService,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private categoryService:CategoryService,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private cloudImg:Cloudinary) {
      this.responses = [];
      this.title = '';
    this.subsc = this.actionsSubj.pipe(
      ofType('[PRODUCT] Add product successfully!')
   ).subscribe(data => {
      console.log("Added item!!");

   });

  }

  upload(){
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
  }
  }
  ngOnInit() {
    this.getAllCategories();

}
fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  createProduct(form){
    console.log(form)
    this.itemToBeAdded = form.form.value;
    this.store.dispatch(new AddProductAction({title:this.itemToBeAdded.title,
    categoryId:this.itemToBeAdded.categoryId,
    price: this.itemToBeAdded.price,
    brand: this.itemToBeAdded.brand,
    size: this.itemToBeAdded.size,
    productColor: this.itemToBeAdded.productColor,
    description: this.itemToBeAdded.description}));

  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((data:any) => {
      this.categories = data;
    })

  }
}
