/*Mobile */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

/*Scroll leve */
function scrollActive(sectionId) {
    const section = document.getElementById('sectionId');
    if (!section) return;

    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });   

    const menu = document.getElementById('navMenu');
    menu.classList.remove('active');
}    

/*Cadastro */

function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('volunteerForm');
    const formData = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        idade: form.idade.value,
        disponibilidade: form.disponibilidade.value,
        areainteresse: form.areainteres.value,
        experiencia: form.experiencia.value,
        motivacao: form.motivacao.value,
        dataCadastro: new Date().toLocaleDateString()
    
    }

let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));}
