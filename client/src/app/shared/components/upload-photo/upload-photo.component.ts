import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent {
  @ViewChild('fileInput') fileInputRef: ElementRef

  @Input() parentFormGroup: FormGroup
  @Input() controlName: string
  @Input() className: string
  @Output() uploadedFile: EventEmitter<File> = new EventEmitter<File>()
  image: File
  imagePreview: string | ArrayBuffer = ''

  constructor() {
  }

  changeUserPic() {
    this.fileInputRef.nativeElement.click()
  }

  onFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
      this.image = file

      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }

      reader.readAsDataURL(file)
      this.uploadedFile.emit(this.image)
    } else {
      return
    }
  }

  deleteImg() {
    this.imagePreview = ''
    this.image = undefined
    this.parentFormGroup.controls[this.controlName].reset()
  }
}
