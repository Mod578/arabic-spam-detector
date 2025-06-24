
export const sanitizeDOM = (htmlString: string): string => {
  if (typeof htmlString !== 'string') {
    // Keep this warning as it's important for debugging.
    console.warn('sanitizeDOM expected a string, received:', typeof htmlString);
    return '';
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  const allowedTags = ['strong', 'em', 'b', 'i', 'p', 'br', 'ul', 'ol', 'li', 'a'];
  const allowedAttributes: { [key: string]: string[] } = {
    'a': ['href', 'target', 'rel'],
  };

  const cleanNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (!allowedTags.includes(tagName)) {
        while (element.firstChild) {
          element.parentNode?.insertBefore(element.firstChild, element);
        }
        element.parentNode?.removeChild(element);
        return;
      }

      const attributes = Array.from(element.attributes);
      attributes.forEach(attr => {
        const attrName = attr.name.toLowerCase();
        const tagAllowedAttributes = allowedAttributes[tagName] || [];

        let removeAttribute = true;

        if (tagAllowedAttributes.includes(attrName)) {
          if (tagName === 'a' && attrName === 'href') {
            const hrefValue = element.getAttribute('href');
            if (hrefValue && (hrefValue.startsWith('http:') || hrefValue.startsWith('https:') || hrefValue.startsWith('mailto:'))) {
              removeAttribute = false;
            }
          } else if (tagName === 'a' && attrName === 'target' && (element.getAttribute('target') === '_blank' || element.getAttribute('target') === '_self')) {
             removeAttribute = false;
          } else if (tagName === 'a' && attrName === 'rel' && element.getAttribute('rel') === 'noopener noreferrer') {
            removeAttribute = false;
          }
           else if (! (tagName === 'a' && (attrName === 'href' || attrName === 'target' || attrName === 'rel')) ) {
             removeAttribute = false; 
           }
        }
        
        if (attrName.startsWith('on') || attrName === 'style' || attrName === 'class' || attrName === 'id') {
            removeAttribute = true;
        }

        if (removeAttribute) {
          element.removeAttribute(attr.name);
        }
      });
    }

    Array.from(node.childNodes).forEach(cleanNode);
  };

  cleanNode(tempDiv);
  return tempDiv.innerHTML;
};
