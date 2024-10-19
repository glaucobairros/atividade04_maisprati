//Inicializando AOS para animações
AOS.init();

//Menu Hamburguer
function clickMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active'); 
}


//Carrossel Swiper
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      speed: 1000,
  });
});


//Usando RandomUser Generator API


function carregarTestemunhos() {

  const url = 'https://randomuser.me/api/?results=4';

  fetch(url)
    .then(response => response.json()) 
    .then(data => {

      const container = document.getElementById('testemunhos-container');


      container.innerHTML = '';

      const AOSeffects= ['fade-down-right','fade-down-left','fade-up-right', 'fade-up-left']


      data.results.forEach((user, index) => {

        const testemunhoDiv = document.createElement('div');
        testemunhoDiv.classList.add('testemunho', 'bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'items-center');
        testemunhoDiv.setAttribute('data-aos', AOSeffects[index]);


        // Inserindo a imagem do usuário
        const img = document.createElement('img');
        img.src = user.picture.large;
        img.alt = `${user.name.first} ${user.name.last}`;
        testemunhoDiv.appendChild(img);

        // Insere o nome do usuário
        const nome = document.createElement('h3');
        nome.innerText = `${user.name.first} ${user.name.last}`;
        testemunhoDiv.appendChild(nome);


        const comentarios = [
          "Serviço excelente, recomendo!",
          "Experiência incrível, voltarei em breve!",
          "Recomendo a AventurAr a todos que querem uma experiência inesquecível!",
          "Viagem impecável, tudo organizado perfeitamente! Recomendo muito a AventurAr."
        ];

        const comentario = document.createElement('p');
        comentario.innerText = comentarios[index]; 
        testemunhoDiv.appendChild(comentario);


        container.appendChild(testemunhoDiv);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar testemunhos:', error);
    });
}


window.onload = carregarTestemunhos;



//EmailJS

  document.addEventListener('DOMContentLoaded', function() {
   
    emailjs.init("QpPh60enUNtQYsxib");

    document.getElementById('contactForm').addEventListener('submit', function (event) {
      event.preventDefault();


      let name = document.getElementById('name').value
      let email = document.getElementById('email').value
      let tel = document.getElementById('tel').value
      let departureDate = document.getElementById('departure-date').value
      let returnDate = document.getElementById('return-date').value
      let origin = document.getElementById('origin').value
      let destination = document.getElementById('destination').value
      let adults = document.getElementById('adults').value
      let children = document.getElementById('children').value
      let message = document.getElementById('message').value

      if (!name || !email || !tel || !departureDate || !returnDate || !origin || !destination || !adults || !children || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (!email.includes('@')) {
        console.error('O campo Email não foi preenchido corretamente.');
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
      }


      let template = {
        from_name: 'Equipe AventurAr',
        user_name: name,
        user_email: email,
        user_tel: tel,
        user_departure_date: departureDate,
        user_return_date: returnDate,
        user_origin: origin,
        user_destination: destination,
        user_adults: adults,
        user_children: children,
        user_message: message,
      }

      emailjs
        .send('service_2lvkagm', 'template_yrdd2aq', template)
        .then((response) => {
          alert('Mensagem enviada com sucesso!')

          document.getElementById('contactForm').reset()
        })

        .catch((error) => {
          console.error('Erro ao enviar mensagem: ', error)
          alert('Erro ao enviar mensagem. Tente novamente.')
        })

    })
  })
