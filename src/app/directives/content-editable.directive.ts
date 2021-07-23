import { Directive, ElementRef, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appContentEditable]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContentEditableDirective implements OnChanges {

  @Input('appContentEditable') model: any;
  @Output('appContentEditableChange') update = new EventEmitter();

  private lastViewMdel: any;

  constructor( private elRef: ElementRef) { 
    console.log('exec', elRef);
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log('changes', changes);
    if(!(changes.model.currentValue !== this.lastViewMdel)) {
      console.log('identical');
      this.lastViewMdel = changes.model.currentValue;
      this.refreshView();
    }
  }

  onBlur() {
    console.log('blur');
    var value = this.elRef.nativeElement.innerText;
    this.lastViewMdel = value;
    this.update.emit(value);
  }

  private refreshView() {
    console.log('refresh');
    this.elRef.nativeElement.innerText = this.model;
  }

}
