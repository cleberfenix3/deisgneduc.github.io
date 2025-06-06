// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    setActiveNavLink();

    // Event listener para clicks em links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
            setActiveNavLink(this);

            // Fechar menu mobile se estiver aberto
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
            }
        });
    });
});

// Atualizar breadcrumb e seção ativa
function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar a seção selecionada
    document.getElementById(sectionId).classList.add('active');

    // Atualizar breadcrumb
    const sectionTitle = document.querySelector(`#${sectionId} .section-title`);
    const breadcrumbText = sectionTitle ? sectionTitle.textContent : 'Início';
    document.getElementById('breadcrumbPath').innerHTML = 
        `<a href="#inicio">Início</a> / <span>${breadcrumbText}</span>`;

    // Atualizar URL com hash
    window.location.hash = `#${sectionId}`;
}

// Definir link de navegação ativo
function setActiveNavLink(activeLink = null) {
    // Remover classe ativa de todos os links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (activeLink) {
        // Adicionar classe ativa ao link clicado
        activeLink.classList.add('active');
    } else {
        // Se não houver link ativo, verificar URL hash
        const hash = window.location.hash.substring(1) || 'inicio';
        document.querySelector(`.nav-link[href="#${hash}"]`)?.classList.add('active');
    }
}

// Toggle menu mobile
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Alternar tabs no simulador
function switchSimulator(type) {
    // Definir botão ativo
    document.querySelectorAll('.simulator-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.simulator-tabs .tab-btn[onclick*='${type}']`).classList.add('active');

    // Mostrar conteúdo correto
    document.querySelectorAll('.simulator-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`sim-${type}`).classList.add('active');
}

// Alternar tabs nas Gems
function switchTab(tabId) {
    // Definir botão ativo
    document.querySelectorAll('.tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tabs .tab-btn[onclick*='${tabId}']`).classList.add('active');

    // Mostrar conteúdo correto
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Toggle FAQ
function toggleFAQ(id) {
    const answer = document.getElementById(`faq-${id}`);
    const icon = document.querySelector(`[onclick="toggleFAQ(${id})"] .faq-icon`);

    // Toggle classe active
    answer.classList.toggle('active');

    // Mudar símbolo do ícone
    icon.textContent = answer.classList.contains('active') ? '-' : '+';
}

// Simulador de Espaço
function previewEspaco() {
    const nome = document.getElementById('espaco-nome').value || 'Meu Espaço Educacional';
    const descricao = document.getElementById('espaco-descricao').value || 'Descrição não informada';
    const instrucoes = document.getElementById('espaco-instrucoes').value || 'Instruções não definidas';

    const preview = document.getElementById('espaco-preview');

    preview.innerHTML = `
        <div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0;">${nome}</h3>
            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">${descricao}</p>
        </div>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
            <h4 style="margin: 0 0 10px 0; color: #6B46C1;">Instruções para IA:</h4>
            <p style="margin: 0; font-size: 0.9rem;">${instrucoes}</p>
        </div>
        <div style="margin-top: 15px; text-align: center; font-size: 0.8rem; color: #6B46C1;">
            ✅ Espaço configurado com sucesso!
        </div>
    `;
}

// Simulador de Gem
function previewGem() {
    const nome = document.getElementById('gem-nome').value || 'Meu Gem Especializado';
    const papel = document.getElementById('gem-papel').value || 'Especialista não definido';
    const contexto = document.getElementById('gem-contexto').value || 'Contexto não informado';
    const formato = document.getElementById('gem-formato').value || 'Lista estruturada';

    const preview = document.getElementById('gem-preview');

    preview.innerHTML = `
        <div style="background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%); color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0;">${nome}</h3>
            <div style="display: inline-block; background: rgba(253, 224, 71, 0.3); color: #FDE047; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">${papel}</div>
        </div>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #FDE047;">
            <h4 style="margin: 0 0 10px 0; color: #3B82F6;">Contexto e Diretrizes:</h4>
            <p style="margin: 0 0 15px 0; font-size: 0.9rem;">${contexto}</p>
            <div style="font-size: 0.8rem; color: #6B46C1;">
                <strong>Formato de resposta:</strong> ${formato}
            </div>
        </div>
        <div style="margin-top: 15px; text-align: center; font-size: 0.8rem; color: #3B82F6;">
            ✅ Gem configurado com sucesso!
        </div>
    `;
}

// Checar se há um hash na URL ao carregar a página
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});

// Adicionar listeners de scroll para animações
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.hero-card, .content-card, .caso-card, .recurso-card');

    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect();

        // Verificar se o card está visível na tela
        if (cardPosition.top < window.innerHeight - 100) {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }
    });
});

// Inicialização adicional
document.addEventListener('DOMContentLoaded', function() {
    // Definir visibilidade inicial dos cards
    const cards = document.querySelectorAll('.hero-card, .content-card, .caso-card, .recurso-card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Disparar animação para cards visíveis na carga inicial
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});