const trash = document.querySelectorAll(".fa-trash-can");
const wrench = document.querySelectorAll(".fa-wrench");
// const update = document.querySelectorAll(".updateDoc");


Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      console.log(this.parentNode.parentNode.childNodes[5].innerText)

        const ratId = this.parentNode.parentNode.id
      console.log(ratId)

      fetch('ratRecord-delete', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            '_id': ratId
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