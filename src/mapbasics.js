var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  myMap = new ymaps.Map(
    'map',
    {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [53.938999, 27.603774], // t&t
      zoom: 14,
    },
    {
      searchControlProvider: 'yandex#search',
    }
  );
  myMap.behaviors.disable('scrollZoom');
  myMap.behaviors.disable('drag');
  myMap.geoObjects.add(
    new ymaps.Placemark(
      [53.938999, 27.603774],
      {
        balloonContent: 'ул. Я. Коласа 73-2, офис. 25',
        iconCaption: 'T&T',
      },
      {
        preset: 'islands#redDotIconWithCaption',
        iconCaptionMaxWidth: '50',
      }
    )
  );
}
