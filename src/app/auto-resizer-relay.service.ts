import { AutoResizerEvent } from './AutoResizerEvent';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoResizerRelayService {

  resize(...ids: string[]) {
    this.triggerResize(ids, false);
  }

  resizeAsync(...ids: string[]) {
    this.triggerResize(ids, true);
  }

  triggerResize(ids: string[], isAsync: boolean) {
    ids = ids || [];
    const resizeEvent = new CustomEvent<AutoResizerEvent>('AppAutoResizer_Resize', { detail: { ids, isAsync } });
    window.dispatchEvent(resizeEvent);
  }
}
