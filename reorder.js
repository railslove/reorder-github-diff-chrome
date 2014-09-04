// jquery hacking... omg :)
// iterationg over all files, searching for the spec file and inserting that dom element after the actual file
reorderInterval = setInterval(function() {
  if($('#files_bucket.is-visible').length == 0 || $('#files_bucket.is-visible').data("reordered") == true) {
    return;
  }
  $.each($('#files .js-details-container'), function(i, element) {
    var path = $(element).children('.meta').data('path');
    if(!path.match(/_spec\.*$/)) {
      var extension_match = path.match(/\..*$/);
      if(extension_match) {
        var extension = extension_match[0];
        var filename_match = path.match(/.*(\/.*)\..*$/);
        if(filename_match) {
          var filename = path.match(/.*(\/.*)\..*$/)[1];
          var spec_path = filename + '_spec' + extension;
          var spec_dom = $('.meta[data-path$="' + spec_path + '"]').parent();
          if(spec_dom.length > 0) {
            spec_dom.detach();
            spec_dom.insertAfter(element);
          }
        }
      }
    }
  })
  $('#files_bucket.is-visible').data("reordered", true);
  clearInterval(reorderInterval);
}, 500);
