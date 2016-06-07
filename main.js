//Transclude - это возможность использовать первоначальное содержимое директивы в любом месте нашего шаблона
//Это можно делать как с помощью тега ng-transclude, так и с помощью функции transclude
//Создадим директиву fooBar c текстом <foo-bar>FooBar</foo-bar>
// опишем ее
 //restrict : 'E',//Это значит что директива будет работать как элемент
 //опишем link : function (scope, element, attrs){
            // console.log('this is my super directive');
//       
       // }  
    // };
    
    
// Посмотрим на консоль в браузере чтобы убедиться что у нас все работает
//да... видим строку this is my super directive

// Теперь мы хотим добавить шаблон
//template : "This is my super directive ",
// Смотрим в браузер и видим что текст шаблона появился в элементе <foo-bar>FooBar</foo-bar> при этом строка This is my super directive заменила строку FooBar
// Возникает вопрос. Как сделать чтобы текст шаблона не пропадал и мы его могли использовать?
//ДЛЯ ЭТОГО И БЫЛ СОЗДАН transclude!!!!!!!!!!
// transclude  - это еще одно проперти директивы которое мы укажем в true
//  transclude : true, и в шаблоне надо написать <ng-transclude></ng-transclude> в этом месте будет выводиться FooBar
// template : "<ng-transclude></ng-transclude>This is my super directive ",

// в template : "" мы можем писать как <ng-transclude></ng-transclude> так и <div ng-transclude></div>

// Теперь давайте немножечко усложним
// Обернем нашу директиву в ng-controller и передадим текст This is c переменной {{name}}
 // <div ng-controller = "mainCtrl">   
// <foo-bar>This is {{name}}</foo-bar>
// </div>
//  опишем контроллер mainCtrl
 // app.controller('mainCtrl', function ($scope) {
  // $scope.name = 'Bob';
// });

//Теперь давайте попробуем убрать ng-transclude в template
// и посмотрим на функцию transclude в link : function
// Как это сделать?
// У нас есть три параметра функции link : function (scope, element, attrs)
// четвертым параметром напишем ctrl а пятым trunsclude
// как раз пятый параметр нам и будет наиболее интересен
// что это такое?
//transclude это функция которая принимает первым параметром scope и вторым параметром функцию 
// первым аргументом этой функции будет clone и второй scope
  // transclude(scope, function(clone, scope) {
        // console.log(clone, scope);//посмотрим что там выводится
        // первым параметром идет span - это тот span который будет аппендится к нашему шаблону 
        // вторым параметром идет scope и это scope который был у этого элемента. т.е. это scope клонируемого элемента
      // });
//Теперь давайте напишем  element.append(clone);
// T.e. что мы делаем. Мы берем наш элемент Это будет наш шаблон template : "This is my super directive ", и аппендим в конец его clone - это будет как раз тот span в котором будет содержимое This is {{name}}

var app = angular.module('app', []);

app.controller('mainCtrl', function ($scope) {
  $scope.name = 'Bob';
});

app.directive('fooBar', function(){
    
    
    return {
        restrict : 'E',
        transclude : true,
        template : "This is my super directive ",
        link : function (scope, element, attrs, ctrl, transclude){
                    transclude(scope, function(clone, scope) {
                        element.append(clone);
                        });
      
       }  
    };
    
});




