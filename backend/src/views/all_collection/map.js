function (doc) {
    if ( doc.links.filter(e => e.verb === 'includes').length >  0 ){
      emit(doc.dc_title, doc);
    }
  }