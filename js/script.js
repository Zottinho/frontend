// ==================== Menu Mobile ====================
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const btn = document.querySelector('.menu-toggle');
    if (!menu || !btn) return;

    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('active');
}

// Fecha o menu ao clicar em um link (melhora usabilidade mobile)
document.addEventListener('click', (e) => {
    const menu = document.getElementById('navMenu');
    const btn = document.querySelector('.menu-toggle');
    if (!menu || !btn) return;

    // usa closest para caso o alvo seja um elemento interno do link
    const link = e.target.closest('#navMenu a');
    if (link) {
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
    }
});

// ==================== Scroll Suave ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70; // altura do header fixa
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });

    // Fecha o menu mobile após clicar
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('active');
}

// ==================== Cadastro ====================
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('volunteerForm');
    if (!form) return;

    const nome = form.nome?.value.trim() || '';
    const email = form.email?.value.trim() || '';

    // Verifica campos obrigatórios
    if (!nome || !email) {
        alert('Por favor, preencha os campos Nome e Email.');
        return;
    }

    // Coleta os valores do formulário
    const formData = {
        nome,
        email,
        telefone: form.telefone?.value.trim() || '',
        idade: form.idade?.value.trim() || '',
        disponibilidade: form.disponibilidade?.value.trim() || '',
        areaInteresse: form['area-interesse']?.value.trim() || '',
        experiencia: form.experiencia?.value.trim() || '',
        motivacao: form.motivacao?.value.trim() || '',
        dataCadastro: new Date().toLocaleString()
    };

    // Recupera cadastros anteriores ou cria lista vazia
    let voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    // Mostra mensagem de sucesso (se existir)
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Esconde mensagem após 5 segundos
        setTimeout(() => successMessage.classList.remove('show'), 5000);
    }

    // Limpa formulário após 2 segundos
    setTimeout(() => form.reset(), 2000);

    // Atualiza a tabela de voluntários
    exibirVoluntarios();
}

// ==================== Exibir Voluntários ====================
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    let html = '<table border="1" cellpadding="5" cellspacing="0">';
    html += '<tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Idade</th><th>Disponibilidade</th><th>Área de Interesse</th><th>Data Cadastro</th></tr>';

    voluntarios.forEach(v => {
        html += `<tr>
            <td>${v.nome}</td>
            <td>${v.email}</td>
            <td>${v.telefone}</td>
            <td>${v.idade}</td>
            <td>${v.disponibilidade}</td>
            <td>${v.areaInteresse}</td>
            <td>${v.dataCadastro}</td>
        </tr>`;
    });

    html += '</table>';
    tabelaContainer.innerHTML = html;
}

// ==================== Animação ao Scroll ====================
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Inicializa animações e mostra voluntários ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Mostra voluntários já cadastrados
    exibirVoluntarios();
});

// ==================== Máscara de Telefone ====================
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });
}

// Listener do formulário (só adiciona se existir)
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleSubmit);
}
