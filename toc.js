document.addEventListener('DOMContentLoaded', (e) => {
  // setting
  var hNums = [2, 3, 4, 5, 6];
  var contentName = "#content";
  var toc = document.getElementById('toc');
  // setting end
  
  var queries = [];
  hNums.forEach(function(value) {
    queries.push(contentName + " h" + value);
  });
  var matches = document.querySelectorAll(queries.join(', '));

  var top = document.createElement('ul');
  var parents = Array(hNums.length).fill(top);
  var lastDepth = 0;
  
  matches.forEach(function (value) {
    var id = value.id;
    if (id === '') {
      id = value.textContent;
      value.id = id;
    }
  
    hNums.forEach(function (h, i) {
      if (value.tagName == 'H' + h) {
        var a = document.createElement('a');
        var li = document.createElement('li');
        a.innerHTML = value.textContent;
        a.href = '#' + id;
        li.appendChild(a);

        if (lastDepth < i) {
          var ul = document.createElement('ul');
          parents[i - 1].appendChild(ul);
          parents[i] = ul;
        }
        parents[i].appendChild(li);
        lastDepth = i;
      }
    });
  });
  
  toc.appendChild(top);
});