const trash = document.querySelector(".trash");

// trash.addEventListener("click", deleteData);

// function deleteData(e) {
//     console.log(e)
//   const date = this.parentNode.parentNode.childNodes[3].innerText;
//   const name = this.parentNode.parentNode.childNodes[5].innerText;
//   const weight = this.parentNode.parentNode.childNodes[7].innerText;
//   const eyeColor = this.parentNode.parentNode.childNodes[9].innerText;
//   const furColor = this.parentNode.parentNode.childNodes[11].innerText;
//   const breed = this.parentNode.parentNode.childNodes[13].innerText;
//   const dailyNote = this.parentNode.parentNode.childNodes[15].innerText;
//   fetch("ratRecord-delete", {
//     method: "delete",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       'date': date,
//       'name': name,
//       'weight': weight,
//       'eyeColor': eyeColor,
//       'furColor': furColor,
//       'breed': breed,
//       'note': dailyNote,
//     }).then(function (response) {
//       window.location.reload();
//     }),
//   });
// }

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.childNodes[3].innerText;
        const name = this.parentNode.parentNode.childNodes[5].innerText;
        const weight = this.parentNode.parentNode.childNodes[7].innerText;
        const eyeColor = this.parentNode.parentNode.childNodes[9].innerText;
        const furColor = this.parentNode.parentNode.childNodes[11].innerText;
        const breed = this.parentNode.parentNode.childNodes[13].innerText;
        const dailyNote = this.parentNode.parentNode.childNodes[15].innerText;

      fetch('ratRecord-delete', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'date': date,
            'name': name,
            'weight': weight,
            'eyeColor': eyeColor,
            'furColor': furColor,
            'breed': breed,
            'note': dailyNote
        })
      }).then(function (response) {
        window.location.reload()
        console.log(fetch.method)
      })
    });
});

