class Player {
    constructor() {
        this.level = 1;
        this.currentXP = 0;
        this.totalXP = 0;
        this.nextLevelXP = 100;
        this.attributePoints = 0; // Pontos de atributo ganhos a cada 4 níveis
    }

    // Função para configurar nível e XP inicial
    setInitialValues(level, xp) {
        this.level = level;
        this.currentXP = xp;
        this.totalXP = xp;
        this.nextLevelXP = this.calculateNextLevelXP();
        this.attributePoints = Math.floor(this.level / 4) * 2;
    }

    // Calcula o XP necessário para o próximo nível
    calculateNextLevelXP() {
        return this.level <= 10 ? this.level * 100 : 1000;
    }

    addXP(xp) {
        this.currentXP += xp;
        this.totalXP += xp;

        // Checa se é necessário subir de nível
        while (this.currentXP >= this.nextLevelXP) {
            this.levelUp();
        }
    }

    levelUp() {
        this.currentXP -= this.nextLevelXP;
        this.level += 1;
        this.nextLevelXP = this.calculateNextLevelXP();

        // Adiciona +2 pontos de atributo a cada 4 níveis
        if (this.level % 4 === 0) {
            this.attributePoints += 2;
        }
    }

    getStatus() {
        return {
            level: this.level,
            currentXP: this.currentXP,
            totalXP: this.totalXP,
            nextLevelXP: this.nextLevelXP,
            attributePoints: this.attributePoints,
        };
    }
}

const player = new Player();

function updateDisplay() {
    const status = player.getStatus();

    // Atualiza os elementos usando os IDs corrigidos
    document.getElementById("currentLevelDisplay").textContent = `Seu nível é: ${status.level}`;
    document.getElementById("currentXPDisplay").textContent = `XP Atual: ${status.currentXP} / ${status.nextLevelXP}`;
    document.getElementById("attributePoints").textContent = status.attributePoints;
}


function addExperience() {
    const levelInput = parseInt(document.getElementById("currentLevel").value);
    const currentXPInput = parseInt(document.getElementById("currentXP").value);
    const xpToAdd = parseInt(document.getElementById("xp").value);

    // Validação dos inputs iniciais
    if (!isNaN(levelInput) && levelInput > 0 && !isNaN(currentXPInput) && currentXPInput >= 0) {
        player.setInitialValues(levelInput, currentXPInput);
    } else {
        alert("Por favor, insira um nível e XP inicial válidos.");
        return;
    }

    // Validação do XP a ser adicionado
    if (!isNaN(xpToAdd) && xpToAdd > 0) {
        player.addXP(xpToAdd);
        updateDisplay(); // Atualiza a interface
        document.getElementById("xp").value = ""; // Limpa o campo de XP
    } else {
        alert("Por favor, insira um valor de XP válido para somar.");
    }
}
