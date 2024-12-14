import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css'],
})
export class PageEditorComponent implements AfterViewInit {
  constructor() {}
  editorData: any = {
    content: '',
  };
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#summernote').summernote({
        height: 250,
        focus: true,
        tabsize: 2,
        fontNames: [
          'Arial',
          'Comic Sans MS',
          'Courier New',
          'Georgia',
          'Impact',
          'Tahoma',
          'Times New Roman',
          'Verdana',
          'Source Sans Pro',
        ],
        fontNamesIgnoreCheck: ['Source Sans Pro'],

        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['para', ['ul', 'ol', 'paragraph']],
          [
            'alignment',
            ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
          ],
          ['insert', ['link', 'picture', 'video', 'table', 'hr']],
          ['view', ['fullscreen', 'codeview', 'help']],
          ['color', ['forecolor', 'backcolor']],
          ['table', ['table']],
          ['media', ['link', 'picture', 'video']],
          ['undo', ['undo', 'redo']],
          ['help', ['help']],
        ],
        fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
      });
    });
  }
  editContent(): void {
    const defaultText = '<p><b>This is default text.</b> You can edit it.</p>';
    $('#summernote').summernote('code', defaultText);
  }

  saveContent(): void {
    const content = $('#summernote').summernote('code');
    this.editorData.content = content;
    console.log('Saved content:', this.editorData.content);
  }
}
