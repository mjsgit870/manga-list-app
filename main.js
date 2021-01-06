// $.ajax({
//     url: 'https://mangamint.kaedenoki.net/api/manga/page/1',
//     success: result => {
//         const mangas = result.manga_list;
//         let cards = ""
//         mangas.forEach(m => {
//             cards += listManga(m);
//         })
//         $(".manga-container").html(cards)

//         $('.detail-btn').on('click', function() {
//             const url = 'https://mangamint.kaedenoki.net/api/manga/detail/' + $(this).data("endpoint");
//             $.ajax({
//                 url: (url),
//                 success: m => {
//                     const mangaDetail = Details(m);
//                     $('.modal-body').html(mangaDetail)
//                 }
//             })
//         })
//     },
//     error: (e) => {
//         console.log(e.responseText);
//     }
// });


// DAFTAR MANGA 
fetch('https://mangamint.kaedenoki.net/api/manga/page/1')
    .then(response => response.json())
    .then(response => {
        const mangaList = response.manga_list
        let cards = ''
        mangaList.forEach(m => cards += listManga(m))
        const container = document.querySelector('.manga-container')
        container.innerHTML = cards

        // detail manga
        const detailbtn = document.querySelectorAll('.detail-btn')
        detailbtn.forEach(btn => {
            btn.addEventListener('click', function() {
                const endpoint = this.dataset.endpoint
                fetch('https://mangamint.kaedenoki.net/api/manga/detail/' + endpoint)
                    .then(response => response.json())
                    .then(m => {
                        const mangaDetail = Details(m)
                        const body = document.querySelector('.modal-body')
                        body.innerHTML = mangaDetail
                    })
            })
        })
    })




function listManga(m) {
    return `<ion-item>
            <ion-thumbnail slot="start">
              <img
                src="${m.thumb}"
              />
            </ion-thumbnail>
            <ion-label>
              <h3>Judul : ${m.title}</h3>
              <p>Update : <strong>${m.updated_on} lalu</strong></p>
              <p>Chapter : <strong>${m.chapter}</strong></p>
            </ion-label>
            <ion-button data-toggle="modal" data-target="#mangaDetail" class="detail-btn" data-endpoint="${m.endpoint}" size="block" color="secondary">
              <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </ion-button>
            </ion-item>`
}

function Details(m) {
    return `<img src="${m.thumb}" class='img-thumbnail rounded mx-auto d-block'>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong><h3>Judul :</strong><br>${m.title}</h3></li>
                <li class="list-group-item"><strong>Sinopsis :</strong><br>${m.synopsis}</li>
                <li class="list-group-item"><strong>Tipe :</strong><br>${m.type}</li>
                <li class="list-group-item"><strong>Status :</strong><br>${m.status}</li>
              </ul>`
}