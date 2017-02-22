$(function() {

    "use strict";

    var $modalWin = $('#win');
    var reseter = true;
    // Создаем объект генератор страницы.
    var testGenerator = {
        // Вопросы для теста.
        questionList: {
            titles: ['1. Что будет, если объявить переменную внутри функции без использования var?', '2. Выберите правильно созданный объект:', '3. С помощью какого цикла мы сможем обойти все поля объекта?'],
            answers: ['a. Можно случайно перезаписать глобальную переменную с таким же именем', 'b. Программа выдаст ошибку', 'c. Ошибки не будет, но переменная не будет создана', 'a. var obj = {prop1: 1; prop2: 2};', 'b. var obj = {prop1: 1, prop2: 2};', 'c. var obj = {prop1 = 1, prop2 = 2};', 'a. for', 'b. do while', 'c. for in']
        },
        // Записываем вопросы и ответы в localStorage.
        toLocalStorage: function() {
            // Конвертируем объект в JSON и отправляем в localStorage.
            localStorage.setItem('questions', JSON.stringify(this.questionList));
        },
        // Генерируем HTML разметку теста на странице.
        insertElements: function() {

            var inputValue = 1;

            $('body').append('<div class="wrapper"><h1>Тест по программированию JavaScript</h1></div>');
            $('.wrapper').append('<form class="form-holder" method="get">');

            for (var i = 0; i < 9; i++) {

                if (i === 0 || i === 3 || i === 6) {
                    $('.form-holder').append('<h2>');
                }

                if (i < 3) {
                    $('.form-holder').append('<label><input type="radio" name="question-1">');
                } else if (i < 6) {
                    $('.form-holder').append('<label><input type="radio" name="question-2">');
                } else $('.form-holder').append('<label><input type="radio" name="question-3">');

                if (i <= $('input').length) {
                    $('input').eq(i).attr("value", inputValue);
                    inputValue++;
                    if (inputValue === 4) {
                        inputValue = 1;
                    }
                }
                // Добавляем классы для label и input.
                $('label').eq(i).addClass('label_' + i);
                $('input').eq(i).addClass('input_' + i);

            }

            $('.form-holder').append('<input class="submit-button" type="submit" value="Проверить мои результаты">');
        },
        // Парсим из localStorage данные с вопросами и ответами к тесту, и вставляем их в разметку.
        insertFromLocalStorage: function() {

            var $allLabels = $('label');
            var $allHeaders = $('h2');
            // Конвертируем JSON (из localStorage) в объект.
            var storage = localStorage.getItem('questions');
            storage = JSON.parse(storage);

            for (var j = 0; j < $allLabels.length; j++) {
                $allHeaders.eq(j).append(storage.titles[j]);
                $allLabels.eq(j).append(storage.answers[j]);
            }
        }
    };
    // Инициализируем создание страницы с тестом.
    testGenerator.toLocalStorage();
    testGenerator.insertElements();
    testGenerator.insertFromLocalStorage();
    // Создаем функцию-валидатор для теста.
    function validator() {
        if ($("input:radio:checked").length < 3) {
            reseter = false;
            $('.visible>h3').text("Внимание.");
            $('.content>p').text("Вы ответили не на все вопросы!");
            $modalWin.fadeToggle();
        } else {
            if ($('.input_0').is(":checked") && $('.input_4').is(":checked") && $('.input_8').is(":checked")) {
                reseter = true;
                $('.visible>h3').text("Поздравляем!");
                $('.content>p').text("Вы успешно прошли тест.");
                $modalWin.fadeToggle();
            } else {
                reseter = true;
                $('.visible>h3').text("У Вас не получилось.");
                $('.content>p').text("Попробуйте еще раз!");
                $modalWin.fadeToggle();
            }
        }
    }
    // Вешаем обработчики на кнопки.
    $('.submit-button').on('click', function(e) {
        e.preventDefault();
        validator();
    });

    $('#modalButton').on('click', function() {
        $modalWin.fadeToggle();
        if (reseter) {
            $('form').trigger('reset');
        }
    });
});
