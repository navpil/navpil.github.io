function I18n(params) {
    var lang = params && params.lang ? params.lang : "en";

    var map = {
        "ua": {
            "Select piece": "Обери фішку",
            "Select move": "Обери хід",
            "Continue capturing": "Продовжуй побиття",
            "Select huff": "Обери фук",
            "Geese won!": "Гуси перемогли",
            "Foxes won!": "Лисиці перемогли",
            "Please finish your capture": "Будь-ласка заверши побиття",
            "Computer moves the fox, please wait": "Комп'ютер ходить лисицею, почекай будь-ласка",
            "Computer moves the goose, please wait": "Комп'ютер ходить гусаком, почекай будь-ласка",
            "You've missed the huff": "Ти профукав фішку",

            "show-config": "Налаштування",
            "restart-game": "Розпочати заново",
            "stop-game": "Зупинити",
            "continue-game": "Продовжити"
        },
        "en": {
            "You've missed the huff": "You've missed the capture, your piece is huffed",
        }

    }

    var viewMap = {
        "ua": {
            "show-config": "Налаштування",
            "restart-game": "Розпочати заново",
            "stop-game": "Зупинити",
            "continue-game": "Продовжити",
            "rule-preset": "Варіант правил",
            "preset-sepoys-label": "Офіцери та сипаї",
            "preset-asalto-label": "Облога",
            "preset-sheep-label": "Вовки та вівці",
            "preset-geese-label": "Лисиця та гуси",
            "preset-rhombus-label": "Лисиця та гуси (велике поле)",
            "preset-config": "Налаштування правил",
            "freeGeeseMovementAllowed-label": "Гусям дозволено довільно рухатися",
            "horizontalMovementAllowed-label": "Гусям дозволено рухатися убік",
            "backwardFortressMovementAllowed-label": "У фортеці (при наявності) гусям дозволено рухатися назад",
            "horizontal-movement-config": "У фортеці (при наявності) гуси можуть рухатися горизонтально:",
            "horizontal0FortressMovementAllowed-label": "на останній лінії",
            "horizontal1FortressMovementAllowed-label": "на середній лінії",
            "horizontal2FortressMovementAllowed-label": "на першій лінії",
            "foxMovesFirst-label": "Лисиці ходять першими",
            "captureMandatory-label": "Бити обов'язково (правило фука)",
            "modify-board-position": "Змініть положення на дошці, обравши фішку нижче і потім натиснувши на дошці",
            "global-settings": "Загальні налаштування",
            "repetitionIsGeeseLoss-label": "Повтор позиції тричі - програш гусей",
            "fortress-win": "Умови заповнення фортеці для перемоги (при наявності)",
            "winning-fortress-geese-label": "її заповнюють лише гуси",
            "winning-fortress-trapped-label": "її можуть заповнити також знерухомлені лисиці",
            "winning-fortress-both-label": "її можуть заповнити як гуси так і лисиці (навіть не знерухомлені)",
            "ai-settings": "Налаштування комп'ютерного гравця",
            "pcForFox-label": "Комп'ютер грає за лисиць",
            "pcForGeese-label": "Комп'ютер грає за гусей",
            "ai-depth-label": "Глибина - скільки ходів комп'ютер прораховує наперед (3-5 - це оптимально)",
            "ai-breadth-label": "Ширина - скільки ходів комп'ютер аналізує (25-100 - це оптимально)",
            "movement-speed-label": "Швидкість руху (в мілісекундах) - впливає на промальовку ходів комп'ютера",
            "save-button": "Зберегти",
            "cancel-button": "Відміна",
        }

    }

    this.text = function(t) {
        return map[lang] && map[lang][t] ? map[lang][t] : t;
    }

    this.initView = function() {
        if (viewMap[lang]) {
            for (var id in viewMap[lang]) {
                document.getElementById(id).innerHTML = viewMap[lang][id];
            }
        }


    }


}