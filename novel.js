const vn = document.querySelector('[data-vn-overlay]');
if (vn) {
  const $ = selector => vn.querySelector(selector);
  const steps = [
    {place:'Бар «Лофт»',time:'Четверг · 10:12',bg:'bar',actor:'kon',speaker:'Константин',line:'«Привет. В пятницу запускаем сезонную карту. Нужны 120 бокалов той серии, что мы смотрели. Сможете привезти к открытию?»',kind:'dialog'},
    {place:'Бар «Лофт»',time:'10:13 · ещё один вопрос',bg:'bar',actor:'kon',speaker:'Константин',line:'«И ещё неприятность: в прошлой коробке из 24 бокалов шесть с трещинами. Фото сейчас пришлю. Их тоже нужно заменить сверх новых 120. Всего к пятнице ждём 126 — на баре уже считают каждый целый».',kind:'dialog'},
    {place:'Рабочий стол',time:'10:14 · входящее сообщение',bg:'office',actor:'manager',speaker:'Сообщение от Константина',line:'Константин прислал фото. Откройте вложение: повторно просить его о снимке не придётся.',kind:'phone'},
    {place:'Рабочий стол',time:'10:15 · ответ на жалобу',bg:'office',actor:'manager',speaker:'Ваш ответ',line:'Что ответить сейчас? Причина повреждений и возможность замены ещё не проверены.',kind:'choice',choices:[
      {text:'«Константин, на фото шесть повреждённых бокалов. Проверю замену и до 16:00 дам статус. Повторно присылать ничего не нужно».',good:true,reply:'«Спасибо. Главное — напишите сегодня, даже если замена пока под вопросом».',why:'Вы приняли уже полученные данные и пообещали только проверку и время ответа.'},
      {text:'«Фото вижу. Думаю, шесть сможем заменить сегодня; сейчас поставлю задачу на склад».',good:false,reply:'«Хорошо, тогда скажу барменам, что сегодня будут новые».',why:'Слово «думаю» не отменяет обещание: Константин уже планирует замену сегодня.'},
      {text:'«Фото вижу, рекламация уже у коллег. Как только ответят, напишу».',good:false,reply:'«А до какого времени мне ждать? У нас запуск завтра».',why:'Вы не придумали срок замены, но оставили клиента без времени следующего контакта.'}
    ]},
    {place:'Бар «Лофт»',time:'10:18 · уточнение',bg:'bar',actor:'kon',speaker:'Константин',line:'«По новой партии скажите честно: все 120 реально успеют? Если нет, мне сейчас нужно менять план сервировки».',kind:'dialog'},
    {place:'Рабочий стол · 1С',time:'10:21 · проверка остатка',bg:'office',actor:'manager',speaker:'Внутренняя проверка',line:'Откройте карточку серии в 1С. Для новой партии нужны 120 бокалов, ещё шесть — по рекламации. Их проверяют отдельно.',kind:'inventory'},
    {place:'Рабочий стол · 1С',time:'10:23 · ответ о количестве',bg:'office',actor:'manager',speaker:'Ваш ответ',line:'В 1С свободны 80 для новой партии. Резерв коллеги и замена шести ещё не оформлены. Что сказать Константину?',kind:'choice',prop:'inventory',choices:[
      {text:'«Для новой партии свободны 80. Остальные 40, замену шести и рейс проверю отдельно. До 16:00 напишу, что подтвердилось. Все 120 новых нужны к открытию?»',good:true,reply:'«Да. Делить поставку можно, только если всё приедет до открытия».',why:'Вы назвали факт, отделили остаток от доставки и узнали, насколько жёсткий срок у клиента.'},
      {text:'«В 1С вижу 80, остальные 40 должны поступить. Пока ориентируйтесь на все 120».',good:false,reply:'«Понял. Тогда не буду искать другой вариант».',why:'Дата поступления не подтверждена, а клиент уже отказался от запасного плана.'},
      {text:'«Пока вижу только 80. Когда появятся ещё 40, сразу сообщу».',good:false,reply:'«А мне что делать сегодня? Я должен утвердить сервировку».',why:'Вы назвали остаток честно, но не договорились о следующем контакте и проверке вариантов.'}
    ]},
    {place:'Бар «Лофт»',time:'10:25 · задача клиента',bg:'bar',actor:'kon',speaker:'Константин',line:'«Мне не обязательно получать всё одной машиной. Важно, чтобы к пятнице в 16:00 все бокалы были здесь и без сюрпризов по цене».',kind:'dialog'},
    {place:'Склад',time:'10:46 · проверка у коллег',bg:'warehouse',actor:'none',speaker:'Коллега со склада',line:'«Для новой партии 80 свободны, но резерв на них ещё не оформлен. Ещё 40 зарезервированы за клиентом другого менеджера. Поговорю с ним: может быть, его заказу они нужны позже. Шесть на замену ищем отдельно, решение по рекламации пока не согласовано».',kind:'dialog'},
    {place:'Рабочий стол',time:'10:51 · расчёт',bg:'office',actor:'manager',speaker:'Расчёт для клиента',line:'В прайсе 1С — 320 ₽ за новый бокал. Посчитайте 120 новых отдельно от шести по рекламации. Введите свободный остаток и резерв коллеги; не выдавайте резерв за подтверждённую поставку.',kind:'calculator'},
    {place:'Бар «Лофт»',time:'15:42 · показываете расчёт',bg:'bar',actor:'both',speaker:'Константин',line:'«Так, 25 600 ₽ за свободные 80, а 120 новых — 38 400 ₽ по прайсу. Шесть на замену идут отдельно? И по оставшимся сорока вы ещё договариваетесь?»',kind:'share'},
    {place:'Бар «Лофт»',time:'15:44 · следующий шаг',bg:'bar',actor:'both',speaker:'Ваш ответ',line:'Константин увидел расчёт. Как ответить на его вопрос о сроке и не потерять тему повреждённых бокалов?',kind:'choice',choices:[
      {text:'«Да. 38 400 ₽ — расчёт только для 120 новых. Шесть на замену проходят отдельно по рекламации. Сорок ещё в резерве другого клиента; до 16:00 сообщу статус по обеим частям и рейсу».',good:true,reply:'«Хорошо. Мне важнее понять план, чем услышать сейчас “всё будет”».',why:'Вы отделили расчёт от доступности товара и дали конкретное время обновления.'},
      {text:'«80 можно оформить сейчас, а по остальным 40 решим после запуска. Так хотя бы часть будет у вас».',good:false,reply:'«Но в пятницу мне нужны все. И что делать с шестью повреждёнными?»',why:'Частичная отгрузка не решает задачу клиента, о которой он только что сказал прямо.'},
      {text:'«Цена укладывается в бюджет. Найдём похожую серию вместо сорока — по виду она почти такая же».',good:false,reply:'«“Почти” меня не устроит. Будут разные бокалы на одном столе».',why:'Расчёт цены не доказывает совместимость альтернативы и не заменяет согласие клиента.'}
    ]},
    {place:'Рабочий стол',time:'15:51 · разговор с коллегой',bg:'office',actor:'none',speaker:'Другой менеджер',line:'«Моему клиенту сорок бокалов нужны только на следующей неделе. Новая партия к нему успеет: срок поставки я проверил. Я согласен снять резерв, если сейчас оформим перевод и сразу поставим замену в мой заказ».',kind:'status'},
    {place:'Рабочий стол',time:'15:58 · обещанное обновление',bg:'office',actor:'manager',speaker:'Ваше сообщение Константину',line:'«Пишу, как договорились, до 16:00. Коллега согласился освободить сорок бокалов: его клиенту они нужны позже, новая партия к тому сроку успевает. Перевод резерва и доставку ещё оформляем. По шести повреждённым жду согласование. До 18:00 вернусь с подтверждённым планом».',kind:'update'},
    {place:'Бар «Лофт»',time:'16:02 · ответ клиента',bg:'bar',actor:'kon',speaker:'Константин',line:'«Принял. Спасибо, что предупредили. До 18:00 я ещё могу поправить план с командой. Жду конкретику».',kind:'dialog'},
    {place:'Склад',time:'17:26 · подтверждение',bg:'warehouse',actor:'none',speaker:'Коллега со склада',line:'«Перевод резерва оформлен: 80 свободных и 40, которые освободил коллега, закреплены за “Лофтом” как новая партия. Для клиента коллеги оформлена поставка к его сроку. Ещё шесть на замену согласованы и добавлены в рейс отдельной строкой. Всего 126. Машина записана на пятницу, окно 10:00–11:00».',kind:'verified'},
    {place:'Рабочий стол',time:'17:31 · клиенту нужен план',bg:'office',actor:'manager',speaker:'Ваш ответ',line:'Факты уже подтверждены. Как сообщить их Константину так, чтобы он мог готовить открытие?',kind:'choice',choices:[
      {text:'«В рейсе 126 бокалов той же серии: 120 новых и шесть на замену по рекламации. Окно пятницы 10:00–11:00 подтверждено. Сегодня пришлю план, утром проверю рейс и сообщу статус».',good:true,reply:'«Отлично. Перешлю команде окно доставки и буду ждать утреннее сообщение».',why:'Теперь можно назвать количество и окно: они подтверждены. Вы ещё договорились о проверке рейса.'},
      {text:'«Всё решили: завтра к десяти точно будут все 126. Можете закрывать вопрос».',good:false,reply:'«Тогда к десяти соберу людей на приёмку».',why:'Рейс назначен на интервал 10:00–11:00; точное время и результат приёмки пока неизвестны.'},
      {text:'«Склад всё подтвердил. Подробности пришлю после доставки».',good:false,reply:'«Мне нужен хотя бы интервал, чтобы встретить машину и подготовить бар».',why:'Данные уже есть, но клиенту не передали их вовремя и заставили спрашивать повторно.'}
    ]},
    {place:'Бар «Лофт»',time:'17:34 · сезонная карта',bg:'bar',actor:'kon',speaker:'Константин',line:'«С бокалами ясно. Ещё для новой карты смотрим сироп “Крем-брюле”. Нам нужно около 12 бутылок. Что можете предложить по цене и сроку? И сначала дайте попробовать — бармену важно понять, подходит ли вкус».',kind:'dialog'},
    {place:'Рабочий стол · прайс',time:'17:36 · проверка продукта',bg:'office',actor:'manager',speaker:'Карточка товара',line:'В прайсе: Pinch&Drop «Крем-брюле», 1 л, 520 ₽ за бутылку. Константин просит цену, срок и образец. Срок и наличие образца ещё нужно уточнить.',kind:'syrupcard'},
    {place:'Бар «Лофт»',time:'17:38 · первый ответ',bg:'bar',actor:'both',speaker:'Ваш ответ',line:'Как начать разговор о сиропе?',kind:'choice',choices:[
      {text:'«По прайсу 520 ₽ за литровую бутылку, 12 бутылок — 6 240 ₽. Наличие и дату поставки проверю и напишу до 18:00. Образец тоже уточню. В каком напитке будете пробовать?»',good:true,reply:'«В латте и холодном кофе. Пришлите ещё состав — бармен посмотрит перед пробой».',why:'Вы ответили на цену и объём, не придумали срок или наличие образца и спросили только то, что поможет с пробой.'},
      {text:'«Сироп очень универсальный и вам точно понравится. Двенадцать бутылок к пятнице сделаем, состав потом пришлю».',good:false,reply:'«Точно к пятнице? Тогда внесу его в карту».',why:'Вкус субъективен, а поставка и состав не проверены. Клиент уже планирует запуск по вашему обещанию.'},
      {text:'«Сначала скажите, какая у вас карта и сколько напитков в день, тогда смогу назвать цену».',good:false,reply:'«Цену по прайсу вы можете сказать сейчас. Мне нужно решить, есть ли смысл пробовать».',why:'Данные о карте полезны, но они не мешают ответить на прямой вопрос о цене.'}
    ]},
    {place:'Бар «Лофт»',time:'17:40 · вопрос о составе',bg:'bar',actor:'kon',speaker:'Константин',line:'«Состав и документы пришлите, пожалуйста. И 520 ₽ за бутылку — всё равно немало. Сейчас мы покупаем сироп за 560 ₽/л и льём примерно 25 мл на напиток. Покажите, что получится по себестоимости».',kind:'dialog'},
    {place:'Бар «Лофт»',time:'17:41 · возражение',bg:'bar',actor:'both',speaker:'Ваш ответ',line:'Что ответить на «дороговато», не споря и не обещая окупаемость?',kind:'choice',choices:[
      {text:'«Понимаю. Давайте сравним стоимость порции с учётом дозировки каждого сиропа. По вашему есть цена 560 ₽ за литр и 25 мл; по нашему — 520 ₽ и 1 л. Его дозировку проверим на пробе, состав и документы отправлю после проверки».',good:true,reply:'«Да, так понятнее. Посчитайте, пожалуйста. А новую дозировку сначала проверим с барменом».',why:'Вы признали сомнение, опираетесь на известные цифры и не выдаёте дозировку нового сиропа за проверенный факт.'},
      {text:'«У нас вкус насыщеннее, поэтому хватит 15 мл. Получится сильно дешевле вашего».',good:false,reply:'«Откуда цифра 15 мл? Мы ещё даже не пробовали».',why:'Дозировка и сравнительный вкус не проверены. Такой расчёт выглядит убедительно, но держится на выдуманном допущении.'},
      {text:'«Разница всего 40 ₽ за бутылку. Это несерьёзно для бара».',good:false,reply:'«Мы считаем себестоимость каждой позиции. Покажите цифры на порцию».',why:'Оценивать значимость расходов за клиента нельзя. Его вопрос — о себестоимости напитка.'}
    ]},
    {place:'Рабочий стол',time:'17:43 · расчёт на порцию',bg:'office',actor:'manager',speaker:'Расчёт для Константина',line:'Введите цену и объём из прайса и слов Константина. Дозировку задайте отдельно для каждого сиропа: у Pinch&Drop она может отличаться. Сравните стоимость порции и 12 бутылок.',kind:'syrupcalc'},
    {place:'Бар «Лофт»',time:'17:46 · показываете расчёт',bg:'bar',actor:'both',speaker:'Константин',line:'',kind:'syrupshare'},
    {place:'Бар «Лофт»',time:'17:48 · следующий шаг',bg:'bar',actor:'both',speaker:'Ваш ответ',line:'Как закончить разговор о сиропе?',kind:'choice',choices:[
      {text:'«Сейчас проверю наличие образца, срок и документы; до 18:00 пришлю ответ. На пробе бармен сравнит вкус и фактическую дозировку в латте и холодном кофе. После этого решим по 12 бутылкам».',good:true,reply:'«Договорились. До пробы в карту его не ставим. Пришлите состав и подтвердите образец».',why:'Вы согласовали проверяемый тест и следующий контакт, не превратив расчёт в обещание, что сироп подойдёт.'},
      {text:'«Раз расчёт готов, давайте сразу оформим 12 бутылок на пятницу. Бармен потом подстроит рецепт».',good:false,reply:'«Нет, без пробы и состава мы не можем ставить новый вкус».',why:'Расчёт одной порции не доказывает, что продукт подходит рецепту. Клиент прямо просил пробу.'},
      {text:'«Документы и образец уточню. Как что-то узнаю, напишу».',good:false,reply:'«Хорошо, но мне нужен ответ сегодня, чтобы распланировать завтрашнюю пробу».',why:'Вы не придумали гарантий, но не назвали время следующего контакта.'}
    ]},
    {place:'Рабочий стол',time:'17:52 · проверка',bg:'office',actor:'none',speaker:'Коллега по ассортименту',line:'«Состав и документы по этой партии нашла, отправила тебе. Один образец есть, его добавили в завтрашний рейс с бокалами. По 12 бутылкам заказ оформим только после решения клиента».',kind:'dialog'},
    {place:'Рабочий стол',time:'17:55 · обещанное сообщение',bg:'office',actor:'manager',speaker:'Ваше сообщение Константину',line:'«Состав и документы уже у вас. Образец зарезервирован для пробы завтра; его привезут с бокалами. По 12 бутылкам наличие и срок уточню после решения бармена. Проверим вкус и дозировку, потом согласуем заказ».',kind:'dialog'},
    {place:'Бар «Лофт»',time:'Пятница · 10:43',bg:'bar',actor:'kon',speaker:'Константин',line:'«Машина приехала в заявленное окно. Ребята пересчитали все 126: 120 новых бокалов и шесть на замену. Всё целое, документы совпали. Спасибо, что утром прислали статус».',kind:'delivery'},
    {place:'Бар «Лофт» · проба',time:'Пятница · 15:30',bg:'bar',actor:'both',speaker:'Константин',line:'«Бармен попробовал сироп в двух напитках. Для латте оставим его как вариант после настройки рецепта; по холодному кофе пока берём паузу. Спасибо, что не заставили заказать все 12 до пробы».',kind:'dialog'},
    {place:'Бар «Лофт» · запуск',time:'Пятница · 19:10',bg:'bar-friday',actor:'both',speaker:'Константин',line:'«Заходите. Вот как эта серия смотрится на столах. Мы успели выставить всё до первого гостя».',kind:'friday'},
    {place:'Бар «Лофт» · первый вечер',time:'19:12 · полный зал',bg:'bar-friday',actor:'both',speaker:'Константин',line:'«Слушайте, вчера я уже собирался менять сервировку. Но вы были на связи, и к утру я точно знал, что приедет. Спасибо. В следующий раз начну с вас».',kind:'fridaythanks'},
    {place:'Запуск состоялся',time:'Пятница · 19:15',bg:'bar-friday',actor:'both',speaker:'Пятница у «Лофта»',line:'Меню запущено. За баром выдают первые напитки в новых бокалах. Константин наконец занимается гостями, а не ищет, где его заказ.',kind:'final'}
  ];
  const state = {index:0,score:0,answers:[],photoSeen:false,inventorySeen:false,calculated:false,syrupCalculated:false,price:320,freeQty:80,otherQty:40,needQty:120,syrupPortion:13,currentPortion:14,syrupDose:25,currentDose:25,syrupQty:12,avatar:'female',answered:false};
  let returnFocus;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rub = amount => new Intl.NumberFormat('ru-RU').format(amount)+' ₽';
  const money = amount => new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(amount)+' ₽';
  const syrupDifference = () => {
    const difference = Math.abs(state.currentPortion-state.syrupPortion);
    if(difference<0.005)return 'Стоимость сиропа на порцию одинакова';
    return 'Pinch&Drop '+(state.syrupPortion<state.currentPortion?'дешевле':'дороже')+' на '+money(difference)+' за порцию';
  };
  function renderProp(step) {
    const prop = $('[data-vn-prop]'); prop.innerHTML=''; prop.className='vn-prop';
    if (step.kind==='phone') {
      prop.classList.add('is-phone');
      prop.innerHTML='<div class="vn-phone"><div class="vn-phone-notch"></div><div class="vn-phone-header"><span class="vn-phone-avatar">К</span><div><strong>Константин</strong><small>Бар «Лофт» · 10:14</small></div></div><div class="vn-message">Шесть бокалов с трещинами. Фото приложил. Успеете заменить к запуску?</div><button type="button" class="vn-photo" data-vn-photo aria-label="Увеличить фото повреждённых бокалов"><img src="assets/novel-broken-glasses.webp" alt="Открытая коробка с треснувшими бокалами"><span>Фото поставки ↗</span></button><div class="vn-phone-bottom"></div></div>';
      prop.querySelector('[data-vn-photo]').addEventListener('click',()=>{state.photoSeen=true;$('[data-vn-lightbox]').hidden=false;$('[data-vn-lightbox-close]').focus()});
    }
    if(step.kind==='update'){
      prop.classList.add('is-phone','is-update');
      prop.innerHTML='<div class="vn-phone"><div class="vn-phone-notch"></div><div class="vn-phone-header"><span class="vn-phone-avatar">К</span><div><strong>Константин</strong><small>Бар «Лофт» · 15:58</small></div></div><div class="vn-message vn-message-out">Пишу, как договорились. Коллега согласился освободить 40 бокалов: его клиенту они нужны позже, новая партия успевает. Перевод резерва и доставку ещё оформляем. По шести повреждённым жду согласование. Вернусь до 18:00 с планом.</div><div class="vn-phone-bottom"></div></div>';
    }
    if (step.kind==='inventory'||step.prop==='inventory') {
      prop.classList.add('is-inventory');
      prop.innerHTML=`<div class="vn-inventory">
        <div class="vn-inv-appbar"><span class="vn-inv-logo">1С</span><b>Управление торговлей</b><span>Остатки и цены</span></div>
        <div class="vn-inv-breadcrumb">Главная › Склад › Остатки товаров</div>
        <div class="vn-inv-title">Остатки товаров <small>Основной склад · четверг, 10:21</small></div>
        <div class="vn-inv-tabs"><span class="active">Остатки</span><span>Прайс</span></div>
        <div class="vn-inv-table-wrap"><table class="vn-inv-table"><thead><tr><th>Позиция</th><th>Свободно</th><th>Нужно</th><th>Дефицит</th></tr></thead><tbody><tr><td>Новая партия · бокалы</td><td>80 шт.</td><td>120 шт.</td><td class="short">40 шт.</td></tr><tr><td>Замена по рекламации</td><td>Проверяется</td><td>6 шт.</td><td class="short">Не согласована</td></tr></tbody></table></div>
        <div class="vn-inv-meta"><span>У коллеги в резерве: <b>40 шт.</b></span><span>Перевод резерва: <b>не согласован</b></span></div>
        <button type="button" class="vn-inv-inspect" data-vn-inspect>Открыть карточку позиции ↗</button>
        <div class="vn-inv-detail"><strong>Карточка позиции · бокалы выбранной серии</strong><span>Свободно: <b>80 шт.</b></span><span>Прайс: <b>320 ₽/шт.</b></span><span>У коллеги в резерве: <b>40 шт.</b></span><span>Новая партия: <b>120 шт.</b></span><span>Отдельно по рекламации: <b>6 шт.</b></span><span>Всего к пятнице: <b>126 шт.</b></span></div>
        <p class="vn-inv-foot">80 + 40 относятся только к новой партии. Шесть на замену проверяются отдельно; всего клиент ждёт 126.</p>
      </div>`;
      prop.querySelector('[data-vn-inspect]').addEventListener('click',()=>{state.inventorySeen=true;prop.classList.toggle('is-expanded');prop.querySelector('[data-vn-inspect]').textContent=prop.classList.contains('is-expanded')?'Свернуть карточку ↙':'Открыть карточку позиции ↗';updateContinue()});
    }
    if(step.kind==='calculator'){
      prop.classList.add('is-calculator');
      prop.innerHTML=`<div class="vn-calc">
        <div class="vn-calc-head"><span>РАСЧЁТ ДЛЯ КЛИЕНТА</span><strong>Сколько стоит заказ?</strong></div>
        <p class="vn-calc-hint">Подсказка из 1С: <b>320 ₽/шт.</b> · свободно <b>80</b> · резерв коллеги <b>40</b> · новых <b>120</b>. Шесть на замену — отдельная рекламация; всего нужно 126.</p>
        <div class="vn-calc-fields"><label>Цена за бокал, ₽<input data-vn-price type="number" inputmode="numeric" min="1" max="100000" step="1" placeholder="Цена из прайса"></label><label>Свободно, шт.<input data-vn-free type="number" inputmode="numeric" min="0" max="10000" step="1" placeholder="Количество"></label><label>Резерв коллеги, шт.<input data-vn-other type="number" inputmode="numeric" min="0" max="10000" step="1" placeholder="Количество"></label><label>Новая партия, шт.<input data-vn-need type="number" inputmode="numeric" min="1" max="10000" step="1" placeholder="Количество"></label></div>
        <button type="button" class="vn-calc-run" data-vn-calc-run>Рассчитать</button><div class="vn-calc-results" data-vn-calc-results hidden></div>
        <p>38 400 ₽ — стоимость только 120 новых бокалов по прайсу. Шесть на замену проходят отдельной рекламацией; их наличие и условия подтвердит склад.</p>
      </div>`;
      prop.querySelector('[data-vn-calc-run]').addEventListener('click',calculate);
      prop.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{state.calculated=false;prop.classList.remove('has-result');prop.querySelector('[data-vn-calc-results]').hidden=true;updateContinue()}));
    }
    if(step.kind==='share'){
      prop.classList.add('is-share');
      prop.innerHTML=`<div class="vn-share-sheet"><span>РАСЧЁТ ДЛЯ «ЛОФТА»</span><strong>${rub(state.price)} за бокал</strong><div>${state.freeQty} свободны <b>${rub(state.freeQty*state.price)}</b></div><div>${state.otherQty} в резерве коллеги <b>${rub(state.otherQty*state.price)}*</b></div><div class="vn-share-total">${state.needQty} новых по этой цене <b>${rub(state.needQty*state.price)}*</b></div><small>* Стоимость рассчитана только для новой партии. Ещё 6 бокалов на замену — отдельная рекламация. Всего клиент ждёт 126; перевод резерва и доставка пока не подтверждены.</small></div>`;
    }
    if(step.kind==='status'||step.kind==='verified'){
      prop.classList.add('is-worknote');
      prop.innerHTML=step.kind==='status'
        ?'<div class="vn-worknote"><span>РАЗГОВОР С КОЛЛЕГОЙ · 15:51</span><strong>Коллега готов освободить резерв</strong><div><b>40</b> бокалов зарезервированы за его клиентом</div><div>Его клиенту бокалы нужны <b>на следующей неделе</b></div><div>Новая поставка успеет <b>к его сроку</b></div><p>Согласие есть. Перевод резерва ещё нужно оформить; доставка «Лофту» пока не подтверждена.</p></div>'
        :'<div class="vn-worknote verified"><span>ПОДТВЕРЖДЕНИЕ · 17:26</span><strong>План поставки собран</strong><div><b>80 + 40 = 120</b> новых закреплены за «Лофтом»</div><div><b>6</b> на замену добавлены в рейс отдельной строкой</div><div><b>126</b> бокалов всего к доставке</div><div><b>Пятница 10:00–11:00</b> окно доставки</div><p>Клиенту коллеги оформлена новая поставка к его сроку. Утром проверьте рейс.</p></div>';
    }
    if(step.kind==='delivery'){
      prop.classList.add('is-delivery');
      prop.innerHTML='<div class="vn-worknote delivery"><span>ПРИЁМКА · ПЯТНИЦА 10:43</span><strong>Поставка принята</strong><div><b>120</b> новых бокалов пересчитаны</div><div><b>6</b> заменены по обращению</div><div><b>126</b> бокалов всего принято</div><div><b>0</b> повреждений при приёмке</div><p>Количество и состояние сверены с Константином.</p></div>';
    }
    if(step.kind==='syrupcard'){
      prop.classList.add('is-worknote');
      prop.innerHTML='<div class="vn-worknote"><span>ПРАЙС · СИРОПЫ</span><strong>Pinch&Drop «Крем-брюле»</strong><div>Цена <b>520 ₽</b> за бутылку</div><div>Объём <b>1000 мл</b></div><div>Запрос «Лофта» <b>12 бутылок</b></div><p>Цена известна. Наличие, срок, образец и документы нужно подтвердить отдельно.</p></div>';
    }
    if(step.kind==='syrupcalc'){
      prop.classList.add('is-calculator','is-syrupcalc');
      prop.innerHTML=`<div class="vn-calc"><div class="vn-calc-head"><span>СИРОПЫ · СРАВНЕНИЕ</span><strong>Сколько стоит порция?</strong></div>
        <p class="vn-calc-hint">Прайс: Pinch&Drop — <b>520 ₽ / 1000 мл</b>. Со слов Константина: нынешний сироп — <b>560 ₽ / 1000 мл</b> при <b>25 мл</b> на напиток. Для Pinch&Drop дозировка пока не проверена. Запрос — <b>12 бутылок</b>.</p>
        <div class="vn-calc-fields"><label>Pinch&Drop, ₽/бут.<input data-syrup-new-price type="number" min="1" step="1" inputmode="numeric" placeholder="Цена"></label><label>Нынешний, ₽/бут.<input data-syrup-old-price type="number" min="1" step="1" inputmode="numeric" placeholder="Цена"></label><label>Объём бутылки, мл<input data-syrup-volume type="number" min="1" step="1" inputmode="numeric" placeholder="Объём"></label><label>Бутылок в запросе<input data-syrup-qty type="number" min="1" step="1" inputmode="numeric" placeholder="Количество"></label><label>Pinch&Drop · на порцию, мл<input data-syrup-new-dose type="number" min="0.1" step="any" inputmode="decimal" placeholder="Дозировка"></label><label>Нынешний · на порцию, мл<input data-syrup-old-dose type="number" min="0.1" step="any" inputmode="decimal" value="25"></label></div>
        <button type="button" class="vn-calc-run" data-syrup-run>Сравнить</button><div class="vn-calc-results" data-vn-calc-results hidden></div><p>Это стоимость только сиропа. Фактическую дозировку и вкус проверят на пробе; молоко, кофе, труд и потери не учтены.</p></div>`;
      prop.querySelector('[data-syrup-run]').addEventListener('click',calculateSyrup);
      prop.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{state.syrupCalculated=false;prop.classList.remove('has-result');prop.querySelector('[data-vn-calc-results]').hidden=true;updateContinue()}));
    }
    if(step.kind==='syrupshare'){
      prop.classList.add('is-share');
      prop.innerHTML=`<div class="vn-share-sheet"><span>СРАВНЕНИЕ ДЛЯ «ЛОФТА»</span><strong>${money(state.syrupPortion)} за порцию</strong><div>Pinch&Drop · ${state.syrupDose} мл <b>${money(state.syrupPortion)}</b></div><div>Нынешний · ${state.currentDose} мл <b>${money(state.currentPortion)}</b></div><div class="vn-share-total">${syrupDifference()}</div><small>Дозировка Pinch&Drop пока предположительная. Решение о ${state.syrupQty} бутылках — после пробы, проверки состава и срока.</small></div>`;
    }
  }
  function calculate(){
    const fields=[['[data-vn-price]',320],['[data-vn-free]',80],['[data-vn-other]',40],['[data-vn-need]',120]];
    const values=fields.map(([sel])=>Number($(sel).value));
    const invalid=fields.find(([sel],i)=>!$(sel).value||!Number.isInteger(values[i])||values[i]<1||values[i]>100000);
    if(invalid){const input=$(invalid[0]);input.setCustomValidity('Введите целое положительное число');input.reportValidity();input.setCustomValidity('');return}
    const [price,free,other,need]=values;state.price=price;state.freeQty=free;state.otherQty=other;state.needQty=need;
    state.calculated=values.every((value,i)=>value===fields[i][1]);
    const result=$('[data-vn-calc-results]');
    result.innerHTML=`<div><span>${free} свободных</span><strong>${rub(free*price)}</strong></div><div><span>${other} в резерве коллеги · оценка</span><strong>${rub(other*price)}</strong></div><div class="total"><span>${need} по прайсу · оценка</span><strong>${rub(need*price)}</strong></div>${state.calculated?'':'<p class="vn-calc-warning">Сверьте все четыре значения с карточкой 1С и запросом клиента.</p>'}`;
    result.hidden=false;$('[data-vn-prop]').classList.add('has-result');$('[data-vn-prop] .vn-calc').scrollTop=$('[data-vn-prop] .vn-calc').scrollHeight;
    $('[data-vn-line]').textContent=state.calculated?steps[state.index].line:'В расчёте есть расхождение. Сверьте цену и количества с карточкой 1С.';
    updateContinue();
  }
  function calculateSyrup(){
    const selectors=['[data-syrup-new-price]','[data-syrup-old-price]','[data-syrup-volume]','[data-syrup-qty]','[data-syrup-new-dose]','[data-syrup-old-dose]'];
    const values=selectors.map(sel=>Number($(sel).value));
    const bad=selectors.find((sel,i)=>!$(sel).value||!Number.isFinite(values[i])||values[i]<=0||values[i]>100000);
    if(bad){const input=$(bad);input.setCustomValidity('Введите положительное число');input.reportValidity();input.setCustomValidity('');return}
    const [newPrice,oldPrice,volume,qty,newDose,oldDose]=values;
    const valid=newPrice===520&&oldPrice===560&&volume===1000&&qty===12&&newDose<=volume&&oldDose<=volume;
    state.syrupCalculated=valid;
    state.syrupDose=newDose;state.currentDose=oldDose;state.syrupQty=qty;
    state.syrupPortion=newPrice/(volume/newDose);state.currentPortion=oldPrice/(volume/oldDose);
    const result=$('[data-vn-calc-results]');
    result.innerHTML=`<div><span>Pinch&Drop · ${newDose} мл</span><strong>${money(state.syrupPortion)}</strong></div><div><span>Нынешний · ${oldDose} мл</span><strong>${money(state.currentPortion)}</strong></div><div><span>Pinch&Drop · ${qty} бутылок</span><strong>${money(newPrice*qty)}</strong></div><div class="total"><span>${syrupDifference()}</span></div>${valid?'':'<p class="vn-calc-warning">Сверьте цены, объём и число бутылок с исходными данными. Дозировки можно менять для сравнения, но они не должны превышать объём бутылки.</p>'}`;
    result.hidden=false;$('[data-vn-prop]').classList.add('has-result');$('[data-vn-prop] .vn-calc').scrollTop=$('[data-vn-prop] .vn-calc').scrollHeight;
    $('[data-vn-line]').textContent=valid?steps[state.index].line:'В расчёте есть расхождение с данными кейса. Проверьте исходные цифры.';
    updateContinue();
  }
  function render() {
    const s=steps[state.index], stage=$('[data-vn-stage]');
    stage.className='vn-stage scene-'+s.bg+' kind-'+s.kind+' avatar-'+state.avatar;
    $('[data-vn-place]').textContent=s.place; $('[data-vn-time]').textContent=s.time;
    $('[data-vn-step-label]').textContent=(state.index+1)+' / '+steps.length;
    $('[data-vn-scene-count]').textContent='Сцена '+(state.index+1);
    $('[data-vn-speaker]').textContent=s.speaker;
    $('[data-vn-line]').textContent=s.kind==='syrupshare'
      ? `«При ${state.syrupDose} мл Pinch&Drop выходит ${money(state.syrupPortion)} на порцию, нынешний сироп — ${money(state.currentPortion)} при ${state.currentDose} мл. ${syrupDifference()}. Новую дозировку и вкус проверим на пробе».`
      :s.kind==='fridaythanks'&&state.score<5
      ?'«Спасибо, что в итоге всё приехало. Но вчера мне пришлось несколько раз уточнять сроки. В следующий раз давайте сразу договоримся, когда вы вернётесь с ответом».'
      :s.kind==='final'&&state.score<5
        ?'Бар открылся, гости заняли места. Поставка спасла запуск, но в разговоре были лишние обещания или паузы. В следующий раз клиенту нужен точный статус раньше.'
        :s.line;
    $('[data-vn-kon]').hidden=!(s.actor==='kon'||s.actor==='both');
    $('[data-vn-manager]').hidden=!(s.actor==='manager'||s.actor==='both');
    $('[data-vn-feedback]').hidden=true; $('[data-vn-feedback]').innerHTML='';
    const choices=$('[data-vn-choices]');choices.replaceChildren();state.answered=false;
    if(s.kind==='choice')s.choices.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.textContent=c.text.replace('{confirmedCost}',rub(80*state.price));b.addEventListener('click',()=>choose(i));choices.append(b)});
    renderProp(s); updateStars();updateContinue();$('[data-vn-dialogue]').scrollTop=0;
  }
  function updateContinue(){
    const s=steps[state.index],b=$('[data-vn-continue]');
    b.hidden=s.kind==='choice'&&!state.answered;
    b.disabled=(s.kind==='phone'&&!state.photoSeen)||(s.kind==='inventory'&&!state.inventorySeen)||(s.kind==='calculator'&&!state.calculated)||(s.kind==='syrupcalc'&&!state.syrupCalculated);
    b.textContent=s.kind==='final'?'Завершить':s.kind==='phone'&&!state.photoSeen?'Сначала откройте фото':s.kind==='inventory'&&!state.inventorySeen?'Сначала откройте карточку':s.kind==='calculator'?(state.calculated?'Показать клиенту →':'Сначала рассчитайте'):s.kind==='syrupcalc'?(state.syrupCalculated?'Показать сравнение →':'Сначала сравните'):'Дальше →';
  }
  function updateStars(){[...vn.querySelectorAll('.vn-stars i')].forEach((x,i)=>x.classList.toggle('earned',i<state.score))}
  function choose(i){if(state.answered)return;const c=steps[state.index].choices[i];state.answered=true;state.answers.push({step:state.index,choice:i,good:c.good});if(c.good)state.score++;
    $('[data-vn-line]').textContent=c.reply;$('[data-vn-speaker]').textContent='Константин';
    const feedback=$('[data-vn-feedback]');feedback.innerHTML='<strong>'+(c.good?'★ Решение помогло':'Что изменилось')+'</strong><p>'+escape(c.why)+'</p>';feedback.hidden=false;
    $('[data-vn-choices]').replaceChildren();updateStars();updateContinue();$('[data-vn-dialogue]').scrollTop=$('[data-vn-dialogue]').scrollHeight;
  }
  function next(){if(state.index===steps.length-1){close();return}state.index++;render()}
  function open(){returnFocus=document.activeElement;Object.assign(state,{index:0,score:0,answers:[],photoSeen:false,inventorySeen:false,calculated:false,syrupCalculated:false,price:320,freeQty:80,otherQty:40,needQty:120,syrupPortion:13,currentPortion:14,syrupDose:25,currentDose:25,syrupQty:12,answered:false});vn.hidden=false;document.body.classList.add('vn-open');$('[data-vn-stage]').hidden=true;$('[data-vn-setup]').hidden=false;$('[data-vn-step-label]').textContent='Выбор персонажа';$('[data-vn-avatar]').focus()}
  function chooseAvatar(avatar){state.avatar=avatar;$('[data-vn-setup]').hidden=true;$('[data-vn-stage]').hidden=false;render();$('[data-vn-continue]').focus()}
  function close(){vn.hidden=true;document.body.classList.remove('vn-open');$('[data-vn-lightbox]').hidden=true;if(returnFocus?.focus)returnFocus.focus()}
  document.querySelectorAll('[data-vn-open]').forEach(b=>b.addEventListener('click',open));
  vn.querySelectorAll('[data-vn-avatar]').forEach(b=>b.addEventListener('click',()=>chooseAvatar(b.dataset.vnAvatar)));
  $('[data-vn-close]').addEventListener('click',close);
  $('[data-vn-continue]').addEventListener('click',next);
  $('[data-vn-lightbox-close]').addEventListener('click',()=>{$('[data-vn-lightbox]').hidden=true;updateContinue();$('[data-vn-continue]').focus()});
  window.addEventListener('keydown',e=>{if(vn.hidden)return;if(e.key==='Escape'){if(!$('[data-vn-lightbox]').hidden){$('[data-vn-lightbox]').hidden=true;updateContinue()}else close()}});
  window.render_game_to_text=()=>JSON.stringify({setup:!$('[data-vn-setup]').hidden,avatar:state.avatar,scene:state.index+1,total:steps.length,place:steps[state.index].place,kind:steps[state.index].kind,score:state.score,photoSeen:state.photoSeen,inventorySeen:state.inventorySeen,calculated:state.calculated,syrupCalculated:state.syrupCalculated,syrupDose:state.syrupDose,currentDose:state.currentDose,syrupPortion:state.syrupPortion,currentPortion:state.currentPortion,price:state.price,freeQty:state.freeQty,otherQty:state.otherQty,needQty:state.needQty,answered:state.answered});
}
