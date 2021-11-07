Для запуска вводить:<br>
`docker-compose up`<br>
Приложение работае на порту `8080`, база данных на `5432`<br>
Данные от бд:<br>
логин dev<br>
пароль password<br>
база данных app_db<br>
<br>
Список маршрутов:<br>
`/api/registration` принимает `email`, `password`, служит для регистрации пользователя, 
возвращает данные пользователя, без пароля, и refresh, access токены<br>
`/api/login` принимает `email`, `password` служит для логина пользователя, устанавливает 
refresh токен в куках, и возвращает access токен<br>
`/api/logout` служит для логаута пользователя(в постмане вызывать из той же 
вкладки где был логин, тк в куках сохраняются рефреш токены)<br>
