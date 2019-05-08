export const filterEditableAttributes = (unchangedRequestObject, editableAttributes) => {
    Object.keys(unchangedRequestObject).forEach((key) => {
      if (!editableAttributes.includes(key)) {
        delete unchangedRequestObject[key];
      }
    });
  };
