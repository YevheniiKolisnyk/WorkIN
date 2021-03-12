import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.scss']
})
export class DownloadPdfComponent  {
  @Input() pdfUrl
  @Output() showPdf: EventEmitter<boolean> = new EventEmitter<boolean>()

  downloadPDF() {
    const link = document.createElement('a')
    link.href = this.pdfUrl
    link.download = 'file.pdf'
    link.click()
  }

  openPDF() {
    window.open(this.pdfUrl)
  }
  cancel() {
    this.showPdf.emit(false)
  }
}
