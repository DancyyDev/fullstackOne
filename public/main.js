const trash = document.querySelectorAll(".fa-trash-can");
const wrench = document.querySelectorAll(".fa-wrench");
const update = document.querySelectorAll(".updateDoc");


Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      console.log(this.parentNode.parentNode.childNodes[5].innerText)

        const date = this.parentNode.parentNode.childNodes[2].innerText
        const name = this.parentNode.parentNode.childNodes[5].innerText
        const note = this.parentNode.parentNode.childNodes[8].innerText
      

      fetch('ratRecord', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'date': date,
            'name': name,
            'note': note
        })
      }) .then(data => {
        console.log(data)
        window.location.reload(true)
      })
    });
});

Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode)

      const date = this.parentNode.parentNode.childNodes[2].innerText
      const name = this.parentNode.parentNode.childNodes[5].innerText
      const note = this.parentNode.parentNode.childNodes[8].innerText
    

    fetch('ratRecord', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'date': date,
          'name': name,
          'note': note
      })
    }) .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});


Array.from(wrench).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode.parentNode.childNodes[5].innerText)

    console.log(this.parentNode.parentNode.childNodes[14])
    const editForm = this.parentNode.parentNode.childNodes[14]

    editForm.classList.toggle('popUp')
  });
});