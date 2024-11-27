document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        
        // Esconde todos os blocos de conteúdo
        document.querySelectorAll('.content-block').forEach(block => {
            block.classList.remove('active');
        });

        // Exibe o bloco de conteúdo correspondente
        document.getElementById(target).classList.add('active');
    });
});
