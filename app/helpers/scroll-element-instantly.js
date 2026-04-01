import { helper } from '@ember/component/helper';

export function scrollElementToBottomInstantly(elementName) {
  try {
    setTimeout(function() {
      let elementRef = document.getElementById(elementName);
      if (!elementRef) return;
      
      elementRef.scrollTo({ top: elementRef.scrollHeight, behavior: 'instant' })      
    }, 100);            
  }
  catch(error) {
    // This happens sometimes when transitioning away from screen.
  }
}

export default helper(scrollElementToBottomInstantly);
